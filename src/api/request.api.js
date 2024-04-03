import axios from "axios";

export const urlEnv = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

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

// start companies

export const handleGetCompanies = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/company`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetCompany = async (id, token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/company/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleCreateCompany = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(`${urlEnv}/api/company`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateCompany = async (id, data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.patch(
      `${urlEnv}/api/company/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteCompany = async (id, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";

  try {
    const response = await axios.delete(`${urlEnv}/api/company/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetCompaniesByParams = async (body, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/company/search`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImageCompany = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${urlEnv}/api/uploads/companies`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// end companies
// start actividades

export const handleGetActivities = async (token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/activities`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetActivity = async (id, token) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(`${urlEnv}/api/activities/${id}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleCreateActivity = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(`${urlEnv}/api/activities`, data, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleUpdateActivity = async (id, data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.patch(
      `${urlEnv}/api/activities/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleDeleteActivity = async (id, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.delete(
      `${urlEnv}/api/activities/${id}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const handleGetActivitiesByParams = async (body, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "application/json";
  try {
    const response = await axios.post(
      `${urlEnv}/api/activities/search`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const uploadImagesActivities = async (data, token) => {
  config.headers["x-access-token"] = token;
  config.headers["Content-Type"] = "multipart/form-data";
  try {
    const response = await axios.post(
      `${urlEnv}/api/uploads/activities`,
      data,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
