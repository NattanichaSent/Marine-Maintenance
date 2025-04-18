import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProducts = async () => {
  return await axios.get(`${BASE_URL}/products`);
};

export const getProduct = async (productId) => {
  return await axios.get(`${BASE_URL}/products/${productId}`);
};

export const getFuelData = async (date) => {
  return await axios.get(
    `https://app.bhl.co.th/MarineApi/api/FuelMonitor/Dashboard/TugboatFuel/${date}`
  );
};
