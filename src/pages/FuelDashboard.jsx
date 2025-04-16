import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Layout, theme } from 'antd';
import LineChart from '../components/LineChart';
import BoatFilter from '../components/BoatFilter';
import fuelData from '../data/fuelData';
import FuelTable from '../components/FuelTable';
import BarChart from '../components/ฺBarChart';
import { ConfigProvider } from 'antd';

const { Content } = Layout;

function FuelDashboard() {
    const [selectedBoats, setSelectedBoats] = useState(['1']);
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const handleBoatSelectionChange = (newSelectedBoats) => {
        if (newSelectedBoats.length <= 2) {
            setSelectedBoats(newSelectedBoats);
        }
    };

    const selectedBoatsData = selectedBoats.map((boatId) => {
        const boat = fuelData.find(b => b.Id.toString() === boatId);

        const FocusDate = boat?.FuelVolume.map(fv => fv.FocusDate) || [];
        const inData = boat?.FuelVolume.map(fv => fv.FuelRefuel) || [];
        const remainData = boat?.FuelVolume.map(fv => fv.FuelRemaining) || [];
        const outData = boat?.FuelVolume.map(fv => fv.FuelDrain) || [];

        return {
            id: boatId,
            name: boat?.Name || '',
            FocusDate,
            inData,
            remainData,
            outData,
        };
    });

    const selectedBoatsNames = selectedBoatsData.map((boat) => boat.name).join(', ');

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#006A71',
                    colorBgContainer: '#F5F7FA',
                    colorText: '#333',
                },
                components: {
                    Layout: {
                        headerBg: '#ffffff',
                        siderBg: '#F0F4F8',
                    },
                    Menu: {
                        itemSelectedColor: '#006A71',
                        itemSelectedBg: '#D0F0F3',
                    },
                    Table: {
                        headerBg: '#e0e0e0',
                        headerColor: '#333',
                        rowHoverBg: '#fff',
                        borderColor: '#e0e0e0',
                        colorText: '#333',
                    },
                }
            }}
        >
            <Navbar>
                <Content style={{ borderRadius: borderRadiusLG }}>
                    <div className="space-y-5">
                        <div className="flex justify-between">
                            <h1 className="font-medium">TLT Dashboard</h1>
                            <BoatFilter
                                selectedBoats={selectedBoats}
                                onChange={handleBoatSelectionChange}
                                selectedBoatsNames={selectedBoatsNames}
                            />
                        </div>

                        <div>
                            {selectedBoats.length === 1 ? (
                                <div className="flex flex-col space-y-5 w-full">
                                    <h2>🚤 {selectedBoatsData[0].name}</h2>
                                    <LineChart
                                        FocusDate={selectedBoatsData[0].FocusDate}
                                        inData={selectedBoatsData[0].inData}
                                        remainData={selectedBoatsData[0].remainData}
                                        outData={selectedBoatsData[0].outData}
                                    />
                                    <FuelTable boatId={selectedBoats[0]} />
                                    <BarChart boatId={selectedBoats[0]} />
                                </div>
                            ) : (
                                <div className="overflow-x-auto w-full">
                                    <div className="flex w-full justify-between space-x-5">
                                        {selectedBoatsData.map((boat, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col w-full md:w-[calc(50%-10px)] space-y-5"
                                            >
                                                <h2 className="items-end">🚢 {boat.name}</h2>
                                                <LineChart
                                                    FocusDate={boat.FocusDate}
                                                    inData={boat.inData}
                                                    remainData={boat.remainData}
                                                    outData={boat.outData}
                                                />
                                                <FuelTable boatId={boat.id} />
                                                <BarChart boatId={boat.id} />

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Content>
            </Navbar>
        </ConfigProvider>
    );
}

export default FuelDashboard;
