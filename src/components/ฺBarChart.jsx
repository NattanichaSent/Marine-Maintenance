import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import fuelData from '../data/fuelData';

const BarChart = ({ boatId }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const selectedBoat = fuelData.find(b => b.Id.toString() === boatId.toString());

        if (!selectedBoat || !selectedBoat.FuelActivity) return;

        const shipLoadedData = [];
        const shipLightData = [];
        const shipEmptyData = [];
        const shipOthersData = [];

        selectedBoat.FuelActivity.forEach((activity) => {
            shipLoadedData.push({
                x: activity.FocusDate,
                y: activity.ShipLoaded,
                goals: [
                    {
                        name: 'เป้าหมาย',
                        value: activity.STDLoaded,
                        strokeHeight: 4,
                        strokeColor: '#986DE1'
                    }
                ]
            });

            shipLightData.push({
                x: activity.FocusDate,
                y: activity.ShipLight,
                goals: [
                    {
                        name: 'เป้าหมาย',
                        value: activity.STDLight,
                        strokeHeight: 4,
                        strokeColor: '#E16D7C'
                    }
                ]
            });

            shipEmptyData.push({
                x: activity.FocusDate,
                y: activity.ShipEmpty
            });

            shipOthersData.push({
                x: activity.FocusDate,
                y: activity.ShipOthers
            });
        });

        const seriesData = [
            { name: 'หนัก', data: shipLoadedData },
            { name: 'เบา', data: shipLightData },
            { name: 'ตัวเปล่า', data: shipEmptyData },
            { name: 'อื่น ๆ', data: shipOthersData }
        ];

        const options = {
            series: seriesData,
            chart: {
                height: 350,
                type: 'bar',
                fontFamily: 'Kanit, sans-serif',
            },
            plotOptions: {
                bar: {
                    columnWidth: '60%',
                    horizontal: false,
                },
            },
            colors: ['#6DE1D2', '#FFD63A', '#FFA955', '#F75A5A'],
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                customLegendItems: ['หนัก', 'เบา', 'ตัวเปล่า', 'อื่น ๆ'],
                markers: {
                    shape: 'circle',  // เปลี่ยนให้เป็นวงกลม
                    width: 14,  // ขนาดวงกลม
                    height: 14, // ขนาดวงกลม

                },
                fontSize: '14px',
            },
            xaxis: {
                categories: selectedBoat.FuelActivity.map((activity) => activity.FocusDate),
            },
            yaxis: {
                title: {
                    text: 'ปริมาณน้ำมัน',
                },
            },
            tooltip: {
                shared: false,  // จะใช้แสดงข้อมูลเฉพาะแท่งที่ชี้
                intersect: true, // ทำให้ tooltip แสดงข้อมูลของแท่งที่ชี้
                y: {
                    formatter: (value) => `${value} ลิตร`,  // กำหนดรูปแบบของข้อมูล
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
            <h2 className="text-xl font-semibold text-center mb-4">ปริมาณน้ำมันรายกิจกรรม</h2>
            <div id="chart" ref={chartRef}></div>
        </div>
    );
};

export default BarChart;
