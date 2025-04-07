import axios from "axios";

export const getProducts = async () => {
  return await axios.get(import.meta.env.VITE_BASE_URL + `/products`);
};

export const getProduct = async (productId) => {
  return await axios.get(
    import.meta.env.VITE_BASE_URL + `/products/${productId}`
  );
};
