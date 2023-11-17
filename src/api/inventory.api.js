import axios from "axios";

export const urlEnv = import.meta.env.VITE_API_URL || "http://localhost:4000";
export const AppUrl = import.meta.env.VITE_APP_URL || "http://localhost:5137";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

// get inventory
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
      `${urlEnv}/api/inventories/params`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const handleGetInventoriesBySearch = async (body, token) => {
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

// get inventory
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

// create inventory
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

// update inventory
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

// delete inventory
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

// get inventoryTypes
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

// get inventoryModels
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

// get inventoryModelbyId
export const handleGetInventoryModelById = async (id, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(
      `${urlEnv}/api/inventoryModels/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventoryModelysearch
export const handleGetInventoryModelByParams = async (body, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventoryModels/search`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// get inventoryBrands
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

// get inventoryField
export const handleGetInventoryFields = async (token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(`${urlEnv}/api/inventoryFields`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetInventoryFieldById = async (id, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.get(
      `${urlEnv}/api/inventoryFields/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleCreateInventoryField = async (token, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/inventoryFields`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateInventoryField = async (token, id, data) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.patch(
      `${urlEnv}/api/inventoryFields/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteInventoryField = async (token, id) => {
  config.headers["x-access-token"] = token;
  config.headers["Access-Control-Allow-Origin"] = "*";

  try {
    const response = await axios.delete(
      `${urlEnv}/api/inventoryFields/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
