import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SentimentTrendChart = ({ sentimentData }) => {
  const chartData = {
    labels: sentimentData?.map((item, index) => `News ${index + 1}`),
    datasets: [
      {
        label: "Trend Percentage",
        data: sentimentData.map((item) => {
          const compound = item.sentiment.compound;
          return compound * 50 + 50;
        }),
        fill: false,
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
        tension: 0.4,
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
      <Line data={chartData} options={options} />
      <p className="mt-2">
        The trend percentage is a metric used in analysis to represent the
        overall trend of a news article.
      </p>
    </div>
  );
};

export default SentimentTrendChart;
