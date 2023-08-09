import axios from "axios";

export const urlEnv = import.meta.env.VITE_API_URL || "http://localhost:4000";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

// get inventaryTypes
export const handleGetInventaryTypes = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/inventaryTypes`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventaryModels
export const handleGetInventaryModels = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/inventaryModels`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventaryBrands
export const handleGetInventaryBrands = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/inventaryBrands`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};
