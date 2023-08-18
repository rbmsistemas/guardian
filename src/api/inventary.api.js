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
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventarys`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetInventariesByParams = async (body, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventarys/search`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventary
export const handleGetInventaryById = async (id, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventarys/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// create inventary
export const handleCreateInventary = async (token, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(`${urlEnv}/api/inventarys`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleValidateActivoSn = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventarys/validateActivoSn`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// update inventary
export const handleUpdateInventary = async (token, id, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.patch(
      `${urlEnv}/api/inventarys/${id}`,
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
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.delete(
      `${urlEnv}/api/inventarys/${id}`,
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
  config.headers["Access-Control-Allow-Origin"] = "*";

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
  config.headers["Access-Control-Allow-Origin"] = "*";

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
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventaryBrands`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImagesInventary = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${urlEnv}/api/uploads/inventary`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
