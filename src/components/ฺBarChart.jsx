import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import fuelData from "../data/fuelData";
import { formatDate } from "../utils/FormatDate";

const BarChart = ({ boatId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const selectedBoat = fuelData.find(
      (b) => b.id.toString() === boatId.toString()
    );

    if (!selectedBoat || !selectedBoat.fuelActivity) return;

    const shipLoadedData = [];
    const shipLightData = [];
    const shipEmptyData = [];
    const shipOthersData = [];

    selectedBoat.fuelActivity.forEach((activity) => {
      shipLoadedData.push({
        x: formatDate(activity.focusDate),
        y: activity.shipLoaded,
        goals: [
          {
            name: "เป้าหมาย",
            value: activity.stdLoaded,
            strokeHeight: 4,
            strokeColor: "#986DE1",
          },
        ],
      });

      shipLightData.push({
        x: formatDate(activity.focusDate),
        y: activity.shipLight,
        goals: [
          {
            name: "เป้าหมาย",
            value: activity.stdLight,
            strokeHeight: 4,
            strokeColor: "#E16D7C",
          },
        ],
      });

      shipEmptyData.push({
        x: formatDate(activity.focusDate),
        y: activity.shipEmpty,
      });

      shipOthersData.push({
        x: formatDate(activity.focusDate),
        y: activity.shipOther,
      });
    });

    const seriesData = [
      { name: "หนัก", data: shipLoadedData },
      { name: "เบา", data: shipLightData },
      { name: "ตัวเปล่า", data: shipEmptyData },
      { name: "อื่น ๆ", data: shipOthersData },
    ];

    const options = {
      series: seriesData,
      chart: {
        height: 350,
        type: "bar",
        fontFamily: "Kanit, sans-serif",
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          horizontal: false,
        },
      },
      colors: ["#6DE1D2", "#FFD63A", "#FFA955", "#F75A5A"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        customLegendItems: ["หนัก", "เบา", "ตัวเปล่า", "อื่น ๆ"],
        markers: {
          shape: "circle",
          width: 14,
          height: 14,
        },
        fontSize: "14px",
      },
      xaxis: {
        categories: selectedBoat.fuelActivity.map((activity) =>
          formatDate(activity.focusDate)
        ),
      },
      yaxis: {
        title: {
          text: "ปริมาณน้ำมัน",
        },
      },
      tooltip: {
        shared: false,
        intersect: true,
        y: {
          formatter: (value) => `${value} ลิตร`,
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [boatId]);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        ปริมาณน้ำมันรายกิจกรรม
      </h2>
      <div id="chart" ref={chartRef}></div>
    </div>
  );
};

export default BarChart;
