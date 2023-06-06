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
