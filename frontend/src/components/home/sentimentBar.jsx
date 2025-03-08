import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PositiveSentimentDominancePercentageChart = ({ sentimentData }) => {
  const sourceSentiment = sentimentData.reduce((acc, item, index) => {
    const source = `News ${index + 1}`;
    const dominance = item.sentiment.pos - item.sentiment.neg;

    const normalizedDominance = dominance * 50 + 50;

    acc[source] = {
      dominance: normalizedDominance,
    };

    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(sourceSentiment),
    datasets: [
      {
        label: "Positive Impact Dominance Percentage",
        data: Object.values(sourceSentiment).map((s) => s.dominance),
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value > 50) {
            return "rgba(75, 192, 192, 0.6)";
          } else if (value < 50) {
            return "rgba(255, 99, 132, 0.6)";
          } else {
            return "rgba(255, 206, 86, 0.6)";
          }
        },
        borderColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value > 50) {
            return "rgba(75, 192, 192, 1)";
          } else if (value < 50) {
            return "rgba(255, 99, 132, 1)";
          } else {
            return "rgba(255, 206, 86, 1)";
          }
        },
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
        max: 100,
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Bar data={chartData} options={options} />
      <p className="mt-2">
        The chart shows the positive impact dominance percentage for each news
        article.
      </p>
    </div>
  );
};

export default PositiveSentimentDominancePercentageChart;
