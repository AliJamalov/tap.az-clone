import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
};

export const getSonElanlar = async () => {
  const response = await axios.get("http://localhost:3000/son-elanlar");
  return response.data;
};

export const getPremiumElanlar = async () => {
  const response = await axios.get("http://localhost:3000/premium-elanlar");
  return response.data;
};

export const getVipElanlar = async () => {
  const response = await axios.get("http://localhost:3000/vip-elanlar");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`http://localhost:3000/products/${id}`);
  return response.data;
};

export const getVipById = async (id) => {
  const response = await axios.get(`http://localhost:3000/vip-elanlar/${id}`);
  return response.data;
};

export const getSonById = async (id) => {
  const response = await axios.get(`http://localhost:3000/son-elanlar/${id}`);
  return response.data;
};
