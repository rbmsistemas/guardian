import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import { handleGetInventoryModelsWithMostStock } from "../../../api/inventory.api";

const MostModelsChart = ({ token, body }) => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetInventoryModelsWithMostStock(
          token,
          body
        );
        if (response && response?.data?.inventories) {
          const labels = response.data?.inventories.map(
            (item) => item.inventoryModel.name
          );
          const data = response.data?.inventories.map((item) => item.count);
          setInventoryData({ labels, data });
        }
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PolarArea
      data={{
        labels: inventoryData.labels,
        datasets: [
          {
            label: "Inventarios",
            data: inventoryData.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            suggestedMin: 0,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default MostModelsChart;
