import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const SentimentDistributionChart = ({ sentimentData }) => {
  const sentimentSummary = sentimentData.reduce(
    (acc, item) => {
      acc.pos += item.sentiment.pos;
      acc.neu += item.sentiment.neu;
      acc.neg += item.sentiment.neg;
      return acc;
    },
    { pos: 0, neu: 0, neg: 0 }
  );

  const totalSentiment =
    sentimentSummary.pos + sentimentSummary.neu + sentimentSummary.neg;

  const posPercentage =
    totalSentiment > 0 ? (sentimentSummary.pos / totalSentiment) * 100 : 0;
  const neuPercentage =
    totalSentiment > 0 ? (sentimentSummary.neu / totalSentiment) * 100 : 0;
  const negPercentage =
    totalSentiment > 0 ? (sentimentSummary.neg / totalSentiment) * 100 : 0;

  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: [posPercentage, neuPercentage, negPercentage],
        backgroundColor: [
          "rgb(75, 192, 192)",
          "rgb(255, 206, 86)",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.raw;
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default SentimentDistributionChart;
