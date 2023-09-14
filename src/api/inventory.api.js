import axios from "axios";

export const urlEnv = import.meta.env.VITE_API_URL || "http://localhost:4000";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

// get inventary
export const handleGetInventories = async (token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventories`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetInventoriesByParams = async (body, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventories/search`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventary
export const handleGetInventoryById = async (id, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventories/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// create inventary
export const handleCreateInventory = async (token, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventories`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleValidateSerialNumber = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventories/validateSerialNumber`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleValidateActivo = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventories/validateActivo`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// update inventary
export const handleUpdateInventory = async (token, id, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.patch(
      `${urlEnv}/api/inventories/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// delete inventary
export const handleDeleteInventory = async (token, id) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.delete(
      `${urlEnv}/api/inventories/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventaryTypes
export const handleGetInventoryTypes = async (token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventoryTypes`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventaryModels
export const handleGetInventoryModels = async (token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventoryModels`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventaryBrands
export const handleGetInventoryBrands = async (token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventoryBrands`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImagesInventory = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${urlEnv}/api/uploads/inventory`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
