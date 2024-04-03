import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusPieChart = ({
  data = { labels: [], data: [] },
  height = "h-96",
}) => {
  return (
    <div className={`w-full ${height}`}>
      <Pie
        data={{
          labels: data.labels,
          datasets: [
            {
              label: "Cantidad",
              data: data.data,
              backgroundColor: ["#7E3AF2", "#FF8A4C", "#EF4444"],
              borderColor: ["#7E3AF2", "#FF8A4C", "#EF4444"],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
          },
        }}
      />
    </div>
  );
};

export default StatusPieChart;
