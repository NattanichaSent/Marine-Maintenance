import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ FocusDate = [], inData = [], remainData = [], outData = [] }) => {
    const options = {
        chart: {
            id: 'line-chart',
            toolbar: { show: false },
            fontFamily: 'Kanit, sans-serif',
        },
        xaxis: {
            categories: FocusDate,
            title: { style: { fontSize: '14px' } }
        },
        stroke: { curve: 'smooth' },
        markers: {
            size: 5,
            strokeWidth: 2,
        },
        colors: ['#25FFC6', '#FF1654', '#006A71'],
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                format: 'yyyy-MM-dd'
            }
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
        }
    };

    const series = [
        { name: 'รับเข้า', data: inData },
        { name: 'จ่ายออก', data: outData },
        { name: 'คงเหลือ', data: remainData },
    ];

    return (
        <div className="overflow-x-auto">
            <div
                className="bg-white p-6 rounded-lg shadow w-full"

            >
                <h2 className="text-xl font-medium mb-4">ปริมาณน้ำมันของเรือ</h2>
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
        </div>
    );
};

export default LineChart;
