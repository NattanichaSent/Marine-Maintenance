import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { DatePicker, Layout, theme } from "antd";
import LineChart from "../components/LineChart";
import BoatFilter from "../components/BoatFilter";

import FuelTable from "../components/FuelTable";
import BarChart from "../components/ฺBarChart";
import { ConfigProvider } from "antd";
import { formatDate, formatMonthYear } from "../utils/FormatDate";
import { getFuelData } from "../services/Api";

const { Content } = Layout;

function FuelDashboard() {
  const [selectedBoats, setSelectedBoats] = useState([]);
  const [fuelData, setFuelData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    const fetchFuelData = async () => {
      const formattedDate = formatMonthYear(selectedMonth);
      try {
        const response = await getFuelData(formattedDate);
        if (response.status === 200) {
          setFuelData(response.data);
          if (response.data.length > 0) {
            setSelectedBoats([response.data[0].id.toString()]);
          }
        }
      } catch (err) {
        console.error("Error fetching fuel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFuelData();
  }, [selectedMonth]);

  if (loading) return <div>Loading fuel data...</div>;

  const handleBoatSelectionChange = (newSelectedBoats) => {
    if (newSelectedBoats.length <= 2) {
      setSelectedBoats(newSelectedBoats);
    }
  };

  const selectedBoatsData = selectedBoats.map((boatId) => {
    const boat = fuelData.find((b) => b?.id?.toString() === boatId);

    const FocusDate =
      boat?.fuelVolume.map((fv) => formatDate(fv.focusDate)) || [];
    const inData = boat?.fuelVolume.map((fv) => fv.fuelRefuel) || [];
    const remainData = boat?.fuelVolume.map((fv) => fv.fuelRemaining) || [];
    const outData = boat?.fuelVolume.map((fv) => fv.fuelDrain) || [];
    const usageData = boat?.fuelVolume.map((fv) => fv.fuelUsage) || [];
    const usageScaleData = boat?.fuelVolume.map((fv) => fv.fuelUsageScale) || [];
    const fuelConsumption = boat?.fuelConsumption || [];

    return {
      id: boatId,
      name: boat?.name || "",
      FocusDate,
      inData,
      remainData,
      outData,
      usageData,
      usageScaleData,
      fuelConsumption,
    };
  });

  const selectedBoatsNames = selectedBoatsData
    .map((boat) => boat.name)
    .join(", ");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#006A71",
          colorBgContainer: "#F5F7FA",
          colorText: "#333",
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            siderBg: "#F0F4F8",
          },
          Menu: {
            itemSelectedColor: "#006A71",
            itemSelectedBg: "#D0F0F3",
          },
          Table: {
            headerBg: "#e0e0e0",
            headerColor: "#333",
            rowHoverBg: "#fff",
            borderColor: "#e0e0e0",
            colorText: "#333",
          },
          DatePicker: {
            colorBgContainer: "white",
          },
        },
      }}
    >
      <Navbar>
        <Content style={{ borderRadius: borderRadiusLG }}>
          <div className="space-y-5">
            <div className="flex justify-between">
              <h1 className="font-medium">TLT Dashboard</h1>
              <div className="flex items-center gap-5">
                <DatePicker
                  picker="month"
                  value={selectedMonth}
                  onChange={(date) => {
                    if (date) setLoading(true);
                    setSelectedMonth(date);
                  }}
                  format="MMMM YYYY"
                />

                <BoatFilter
                  boats={fuelData}
                  selectedBoats={selectedBoats}
                  onChange={handleBoatSelectionChange}
                  selectedBoatsNames={selectedBoatsNames}
                />
              </div>
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
                    usageData={selectedBoatsData[0].usageData}
                    usageScaleData={selectedBoatsData[0].usageScaleData}
                  />
                  <FuelTable boatId={selectedBoats[0]} boats={fuelData} />
                  <BarChart boatId={selectedBoats[0]} boats={fuelData} />
                  <LineChart
                    FocusDate={selectedBoatsData[0].FocusDate}
                    fuelConsumption={selectedBoatsData[0].fuelConsumption}
                  />
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
                          usageData={boat.usageData}
                          usageScaleData={boat.usageScaleData}
                        />
                        <FuelTable boatId={boat.id} />
                        <BarChart boatId={boat.id} />
                        <LineChart
                          FocusDate={boat.FocusDate}
                          fuelConsumption={boat.fuelConsumption}
                        />
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
