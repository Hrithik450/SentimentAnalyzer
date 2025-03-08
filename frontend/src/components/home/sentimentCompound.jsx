import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SentimentCompoundChart = ({ sentimentData }) => {
  const chartData = {
    labels: sentimentData.map((_, index) => `News ${index + 1}`),
    datasets: [
      {
        label: "Overall Impact Percentage",
        data: sentimentData.map((item) => {
          const compound = item.sentiment.compound;
          if (compound >= 0) {
            return compound * 50 + 50;
          } else {
            return compound * 50 + 50;
          }
        }),
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 55) {
            return "rgba(75, 192, 192, 0.6)";
          } else if (value <= 45) {
            return "rgba(255, 99, 132, 0.6)";
          } else {
            return "rgba(255, 206, 86, 0.6)";
          }
        },
        borderColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 55) {
            return "rgba(75, 192, 192, 1)";
          } else if (value <= 45) {
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
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Bar data={chartData} options={options} />
      <p className="mt-2">
        The impact percentage is a metric used analysis to represent the overall
        impact of a news article.
      </p>
    </div>
  );
};

export default SentimentCompoundChart;
