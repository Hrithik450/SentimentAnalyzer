function decimalToPercentage(decimalValue) {
  if (typeof decimalValue !== "number") {
    return null;
  }

  const percentage = decimalValue * 100;
  return `${percentage.toFixed(0)}%`;
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formattedDate.replace(
    /(\d+)/,
    (match) => `${match}${getOrdinalSuffix(day)}`
  );
}

function getImpact(sentiment) {
  if (sentiment.pos > sentiment.neu && sentiment.pos > sentiment.neg) {
    return "positive";
  } else if (sentiment.neg > sentiment.neu && sentiment.neg > sentiment.pos) {
    return "negative";
  } else {
    return "neutral";
  }
}

const Card = ({ image, date, title, sentiment, url, theme }) => {
  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-lg border border-blue-300`}
    >
      <div className="relative">
        <img
          src={image}
          alt="Event"
          className="w-full min-h-72 max-h-72 object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-${
            theme === "blue" ? "blue-600" : "red-600"
          }/80 to-transparent`}
        ></div>
        <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs rounded-md">
          <span className="text-gray-700 font-semibold">Impact</span>
          <span className="text-blue-500 font-bold ml-1">
            {getImpact(sentiment)}
          </span>
        </div>
        <div className="absolute bottom-4 left-3 text-white">
          <h4 className="text-sm font-medium w-full">{formatDate(date)}</h4>
        </div>
      </div>
      <div className="bg-gray-200 text-black p-2">
        <h4 className="font-medium text-sm px-2 line-clamp-2 text-gray-800">
          {title}
        </h4>
        <h4 className="font-medium text-sm px-2 my-2">Impact Analysis:</h4>
        <div className="grid grid-cols-2 grid-rows-3 gap-1 px-2 text-sm">
          <p className="text-green-500 font-semibold">Positive: </p>
          <strong className="text-green-500">
            {decimalToPercentage(sentiment.pos)}
          </strong>

          <p className="font-semibold">Neutral: </p>
          <strong>{decimalToPercentage(sentiment.neu)}</strong>

          <p className="font-semibold text-red-500">Negative: </p>
          <strong className="text-red-500">
            {decimalToPercentage(sentiment.neg)}
          </strong>
        </div>
        <a
          href={url}
          className="px-2 m-2 mt-4 bg-[linear-gradient(90deg,#ff00ff,#ff7300)] py-1 rounded-sm text-white cursor-pointer inline-block"
        >
          View More...
        </a>
      </div>
    </div>
  );
};

export default Card;
