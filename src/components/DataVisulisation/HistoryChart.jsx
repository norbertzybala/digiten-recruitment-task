import { Line } from "react-chartjs-2";
import moment from "moment";
import useScreenSize from "../../hooks/useScreenSize.jsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export default function HistoryChart({ data }) {
  // History data for chart extracted
  const historyDataForChart = [...data.data.history].reverse();

  const screenSize = useScreenSize();

  // Options for chart component
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#333",
        },
        ticks: {
          display: screenSize.width > 768 ? true : false,
          maxTicksLimit: 5,
          labelOffset: 80,
        },
      },
      y: {
        grid: {
          color: "#333",
        },
        ticks: {
          display: screenSize.width > 768 ? true : false,
        },
      },
    },
  };

  // Data for chart component
  const dataChart = {
    labels: historyDataForChart.map((value) =>
      moment(value.timestamp * 1000).format("lll"),
    ),
    datasets: [
      {
        fill: true,
        label: "Price",
        data: historyDataForChart.map((value) => value.price),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointHoverRadius: 4,
        pointHoverBackgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return <Line options={options} data={dataChart} />;
}