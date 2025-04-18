import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { formatDate } from "../utils/FormatDate";

const BarChart = ({ boatId, boats }) => {
  const chartRef = useRef(null);

  const selectedBoat = boats?.find(
    (b) => b.id.toString() === boatId.toString()
  );

  useEffect(() => {
    if (!selectedBoat || !selectedBoat.fuelActivity) return;

    const shipLoadedData = [];
    const shipLightData = [];
    const shipEmptyData = [];
    const shipOthersData = [];

    selectedBoat.fuelActivity.forEach((activity) => {
      const date = formatDate(activity.focusDate);
      shipLoadedData.push({
        x: date,
        y: activity.shipLoaded,
      });
      shipLightData.push({
        x: date,
        y: activity.shipLight,
      });
      shipEmptyData.push({
        x: date,
        y: activity.shipEmpty,
      });
      shipOthersData.push({
        x: date,
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
        show: false, // ❌ ปิด legend เดิม
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
  }, [selectedBoat]);

  if (!selectedBoat) {
    return <p className="text-center text-gray-500">ไม่พบข้อมูลเรือ</p>;
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        ปริมาณน้ำมันรายกิจกรรม
      </h2>

      {/* ✅ กราฟที่ scroll ได้แนวนอน */}
      <div className="overflow-x-auto pb-2">
        <div
          id="chart"
          ref={chartRef}
          style={{
            width: `${selectedBoat.fuelActivity.length * 100}px`,
            minWidth: "400px",
          }}
        />
      </div>

      {/* ✅ Legend อยู่แยกด้านล่าง ไม่ scroll ไปด้วย */}
      <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#6DE1D2" }}></span> หนัก
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFD63A" }}></span> เบา
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFA955" }}></span> ตัวเปล่า
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#F75A5A" }}></span> อื่น ๆ
        </div>
      </div>
    </div>
  );
};

export default BarChart;
