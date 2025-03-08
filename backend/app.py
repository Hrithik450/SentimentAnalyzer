from flask import Flask, jsonify, request
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) 
analyzer = SentimentIntensityAnalyzer()

FEED_URL = "https://rss.app/feeds/v1.1/tzNPflqasz1wCZH3.json"
ITEMS_PER_PAGE = 8

def fetch_and_analyze_data():
    try:
        response = requests.get(FEED_URL)
        response.raise_for_status()
        feed_data = response.json()
        items = feed_data.get('items', [])
        sentiment_results = []

        for item in items:
            text = item.get('content_text', '') or item.get('title', '')
            sentiment = analyzer.polarity_scores(text)
            sentiment_results.append({
                "id": item.get('id'),
                "title" : item.get('title'),
                "sentiment" : sentiment,
                "view_more" : item.get('url'),
                "image" : item.get('image'),
                "published_on" : item.get('date_published')
            })

        return sentiment_results

    except requests.exceptions.RequestException as e:
        return jsonify({"error" : f"Error fetching feed: {e}"}), 500
    except ValueError as e:
        return jsonify({"error" : f"Error parsing JSON: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"An unexoected error occurred: {e}"}), 500

@app.route('/sentiment')
def get_sentiment():
    page = request.args.get('page', 1, type=int)
    data = fetch_and_analyze_data()

    if isinstance(data, dict) and 'error' in data:
        return jsonify(data), 500
    
    if not isinstance(data, list):
        return jsonify({"error": "Invalid data format"}), 500
    
    total_items = len(data)
    start = (page - 1) * ITEMS_PER_PAGE
    end = start + ITEMS_PER_PAGE
    paginated_results = data[start:end]

    return jsonify({
        "success" : True,
        "totalItems" : total_items,
        "paginated_results" : paginated_results
    })
    
if __name__ == "__main__":
    app.run(debug=True)