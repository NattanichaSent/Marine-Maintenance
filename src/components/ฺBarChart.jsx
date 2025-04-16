import React, { useState, useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import fuelData from '../data/fuelData';

const BarChart = () => {
    const [selectedBoat, setSelectedBoat] = useState(fuelData[0]);
    const chartRef = useRef(null);

    useEffect(() => {

        const seriesData = [
            { name: 'ShipLoaded', data: [] },
            { name: 'ShipLight', data: [] },
            { name: 'ShipEmpty', data: [] },
            { name: 'ShipOthers', data: [] }
        ];

        selectedBoat.FuelActivity.forEach((activity) => {
            seriesData[0].data.push(activity.ShipLoaded);
            seriesData[1].data.push(activity.ShipLight);
            seriesData[2].data.push(activity.ShipEmpty);
            seriesData[3].data.push(activity.ShipOthers);
        });


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
                    columnSpacing: 12,
                },
            },
            colors: ['#006A71', '#25FFC6', '#B8B8B8', '#FF5884'],
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                customLegendItems: ['ShipLoaded', 'ShipLight', 'ShipEmpty', 'ShipOthers'],
                markers: {
                    fillColors: ['#006A71', '#25FFC6', '#B8B8B8', '#FF5884'],
                },
            },
            xaxis: {
                categories: selectedBoat.FuelActivity.map((activity) => activity.FocusDate),
            },
            yaxis: {
                title: {
                    text: 'ปริมาณน้ำมัน',
                },
            },
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [selectedBoat]);

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Bar Chart</h2>


            <div className="mb-4 text-center">
                <select
                    value={selectedBoat.Id}
                    onChange={(e) => {
                        const selected = fuelData.find(boat => boat.Id === parseInt(e.target.value));
                        setSelectedBoat(selected);
                    }}
                    className="p-2 border border-gray-300 rounded"
                >
                    {fuelData.map((boat) => (
                        <option key={boat.Id} value={boat.Id}>
                            {boat.Name}
                        </option>
                    ))}
                </select>
            </div>

            <div id="chart" ref={chartRef}></div>
        </div>
    );
};

export default BarChart;
