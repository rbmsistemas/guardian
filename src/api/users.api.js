import axios from "axios";

import { urlEnv } from "./request.api";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
export const handleGetAllUsers = async (token, time) => {
  config.headers["x-access-token"] = token;
  try {
    const response = await axios.get(
      `${urlEnv}/api/auth/users/${time ?? 7}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
