import axios from "axios";

export const urlEnv = import.meta.env.VITE_API_URL || "http://localhost:4000";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const getLogin = async (data) => {
  try {
    const response = await axios.post(`${urlEnv}/api/auth/login`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getProfile = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/auth/profile`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleRegister = async (data) => {
  try {
    const response = await axios.post(
      `${urlEnv}/api/auth/signup`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleSignout = async () => {
  try {
    const response = await axios.post(`${urlEnv}/api/auth/signout`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetActivities = async () => {
  try {
    const response = await axios.get(`${urlEnv}/api/activities`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetActivity = async (id) => {
  try {
    const response = await axios.get(`${urlEnv}/api/activities/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// proveedores

export const handleGetProviders = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/proveedores`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetProvider = async (id, token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/proveedores/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleCreateProvider = async (data, token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.post(
      `${urlEnv}/api/proveedores`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateProvider = async (id, data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.patch(
      `${urlEnv}/api/proveedores/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteProvider = async (id, token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.delete(
      `${urlEnv}/api/proveedores/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetProvidersByStatus = async (status, token) => {
  try {
    const response = await axios.get(
      `${urlEnv}/api/proveedores/status/${status}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImageProviders = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${urlEnv}/api/uploads/provider`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
