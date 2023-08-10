import axios from "axios";

export const urlEnv = import.meta.env.VITE_API_URL || "http://localhost:4000";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

// get inventary
export const handleGetInventaries = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/inventary`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventary
export const handleGetInventaryById = async (token, id) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/inventary/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// create inventary
export const handleCreateInventary = async (token, data) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.post(`${urlEnv}/api/inventary`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// update inventary
export const handleUpdateInventary = async (token, id, data) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.put(
      `${urlEnv}/api/inventary/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// delete inventary
export const handleDeleteInventary = async (token, id) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.delete(
      `${urlEnv}/api/inventary/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
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

export const handleUploadImagesInventary = async (token, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${urlEnv}/api/uploadsInventary/inventary`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
