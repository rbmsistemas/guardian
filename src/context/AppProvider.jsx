import React, { useReducer, useEffect } from "react";
import {
  handleGetActivities,
  getLogin,
  handleRegister,
  handleSignout,
  getProfile,
  handleGetProviders,
  handleGetProvider,
  handleCreateProvider,
  handleUpdateProvider,
  handleDeleteProvider,
  handleGetProvidersByStatus,
  uploadImageProviders,
} from "../api/request.api";
import Context from "./Context";
import Reducer from "./Reducer";
import {
  POST_SIGNIN,
  POST_SIGNUP,
  GET_ACTIVITIES,
  POST_SIGNOUT,
  GET_PROVIDERS,
  GET_PROVIDER,
  POST_PROVIDER,
  PATCH_PROVIDER,
  DELETE_PROVIDER,
  GET_PROVIDERS_BY_STATUS,
} from "./Types";

const AppProvider = (props) => {
  const initialState = {
    user: { token: null },
    activities: [],
    providers: [],
    provider: {},
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const handleLogin = async (data) => {
    try {
      const response = await getLogin(data);
      if (response?.status !== 200) {
        return response;
      }
      dispatch({
        type: POST_SIGNIN,
        payload: response.data,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.token) {
        hanldeProfile(user.token);
      } else {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const hanldeProfile = async (token) => {
    try {
      const response = await getProfile(token);
      if (response?.status <= 299) {
        const profile = {
          user: response.data,
          token,
        };
        dispatch({
          type: POST_SIGNIN,
          payload: profile,
        });
        localStorage.setItem("user", JSON.stringify(profile));
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const postSignup = async (data) => {
    try {
      const response = await handleRegister(data);
      dispatch({
        type: POST_SIGNUP,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getActivities = async (data) => {
    try {
      const response = await handleGetActivities(data);
      const data = await response.json();
      dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const postSignout = async () => {
    const response = await handleSignout(data);

    dispatch({
      type: POST_SIGNOUT,
    });
  };

  const getProviders = async (token) => {
    try {
      const response = await handleGetProviders(token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { proveedores } = await response.data;
      dispatch({
        type: GET_PROVIDERS,
        payload: proveedores,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getProvider = async (id) => {
    try {
      const response = await handleGetProvider(id, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { proveedor } = await response.data;
      dispatch({
        type: GET_PROVIDER,
        payload: proveedor,
      });
      return proveedor;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const createProvider = async (data) => {
    try {
      const response = await handleCreateProvider(data, state.user.token);
      if (response?.status >= 299) {
        return response;
      }
      const { proveedor } = await response.data;
      dispatch({
        type: POST_PROVIDER,
        payload: proveedor,
      });
      return proveedor;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateProvider = async (id, data, token) => {
    try {
      const response = await handleUpdateProvider(id, data, token);
      const { provider } = await response.data;
      dispatch({
        type: PATCH_PROVIDER,
        payload: provider,
      });
      return provider;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deleteProvider = async (id, token) => {
    try {
      const response = await handleDeleteProvider(id, token);
      const dataResponse = await response.json();
      dispatch({
        type: DELETE_PROVIDER,
        payload: dataResponse,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getProvidersByStatus = async (status, token) => {
    try {
      const response = await handleGetProvidersByStatus(status, token);
      const dataResponse = await response.json();
      dispatch({
        type: GET_PROVIDERS_BY_STATUS,
        payload: dataResponse,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if (state.user.token) {
      getProviders(state.user.token);
    }
  }, [state.user.token]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        activities: state.activities,
        handleLogin,
        postSignup,
        getActivities,
        postSignout,
        providers: state.providers,
        provider: state.provider,
        getProvider,
        createProvider,
        updateProvider,
        deleteProvider,
        getProvidersByStatus,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
