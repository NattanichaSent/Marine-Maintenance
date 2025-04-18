import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({
  FocusDate = [],
  inData = [],
  remainData = [],
  outData = [],
  fuelConsumption = [],
}) => {
  const options = {
    chart: {
      id: "line-chart",
      toolbar: { show: false },
      fontFamily: "Kanit, sans-serif",
    },
    xaxis: {
      categories: FocusDate,
      title: { style: { fontSize: "14px" } },
    },
    stroke: { curve: "smooth" },
    markers: {
      size: 5,
      strokeWidth: 2,
    },
    colors: ["#6DE1D2", "#FFD63A", "#FFA955", "#F75A5A"],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: "yyyy-MM-dd",
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
    },
  };

  const series = [];

  if (inData.length > 0) {
    series.push({ name: "รับเข้า", data: inData });
  }

  if (outData.length > 0) {
    series.push({ name: "จ่ายออก", data: outData });
  }

  if (remainData.length > 0) {
    series.push({ name: "คงเหลือ", data: remainData });
  }

  if (fuelConsumption.length > 0) {
    if (fuelConsumption.some((f) => f.ShipLoaded !== undefined)) {
      series.push({
        name: "เรือหนัก",
        data: fuelConsumption.map((f) => f.ShipLoaded),
      });
    }

    if (fuelConsumption.some((f) => f.ShipLight !== undefined)) {
      series.push({
        name: "เรือเบา",
        data: fuelConsumption.map((f) => f.ShipLight),
      });
    }

    if (fuelConsumption.some((f) => f.ShipEmpty !== undefined)) {
      series.push({
        name: "วิ่งตัวเปล่า",
        data: fuelConsumption.map((f) => f.ShipEmpty),
      });
    }
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <div className="bg-white p-6 rounded-xl  w-full ">
        <h2 className="text-xl font-medium mb-4">ปริมาณน้ำมันของเรือ</h2>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default LineChart;
