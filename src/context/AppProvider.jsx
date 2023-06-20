import React, { useReducer, useEffect } from "react";
import {
  getLogin,
  handleRegister,
  handleSignout,
  getProfile,
  handleGetProviders,
  handleGetProvider,
  handleCreateProvider,
  handleUpdateProvider,
  handleDeleteProvider,
  handleGetProvidersByParams,
  handleGetActivities,
  handleGetActivity,
  handleCreateActivity,
  handleUpdateActivity,
  handleDeleteActivity,
  handleGetActivitiesByParams,
} from "../api/request.api";
import Context from "./Context";
import Reducer from "./Reducer";
import {
  POST_SIGNIN,
  POST_SIGNUP,
  POST_SIGNOUT,
  GET_PROVIDERS,
  GET_PROVIDER,
  POST_PROVIDER,
  PATCH_PROVIDER,
  DELETE_PROVIDER,
  GET_PROVIDERS_BY_SEARCH,
  GET_ACTIVITIES,
  GET_ACTIVITY,
  POST_ACTIVITY,
  PATCH_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_BY_SEARCH,
} from "./Types";

const AppProvider = (props) => {
  const initialState = {
    user: { token: null },
    activities: [],
    activity: {},
    providers: [],
    provider: {},
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  // auth actions
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

  const postSignout = async () => {
    const response = await handleSignout(data);

    dispatch({
      type: POST_SIGNOUT,
    });
  };

  // end auth actions
  // activities actions

  const getActivities = async (data) => {
    try {
      const response = await handleGetActivities(data);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { actividades } = await response.data;
      dispatch({
        type: GET_ACTIVITIES,
        payload: actividades,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getActivity = async (id) => {
    try {
      const response = await handleGetActivity(id, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { actividad } = await response.data;
      dispatch({
        type: GET_ACTIVITY,
        payload: actividad,
      });
      return actividad;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const createActivity = async (data) => {
    try {
      const response = await handleCreateActivity(data, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { actividad } = await response.data;
      dispatch({
        type: POST_ACTIVITY,
        payload: actividad,
      });
      return actividad;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateActivity = async (id, data, token) => {
    try {
      const response = await handleUpdateActivity(id, data, token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { actividad } = await response.data;
      dispatch({
        type: PATCH_ACTIVITY,
        payload: actividad,
      });
      return actividad;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await handleDeleteActivity(id, state.user.token);
      console.log(response);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { actividades } = await response.data;
      dispatch({
        type: DELETE_ACTIVITY,
        payload: actividades,
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getActivitiesBySearch = async (body) => {
    try {
      const response = await handleGetActivitiesByParams(
        body,
        state.user.token
      );
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { actividades } = await response.data;
      dispatch({
        type: GET_ACTIVITIES_BY_SEARCH,
        payload: actividades,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const clearActivity = () => {
    dispatch({
      type: GET_ACTIVITY,
      payload: {},
    });
  };

  useEffect(() => {
    if (state.user.token) {
      getActivities(state.user.token);
    }
  }, [state.user.token, state.activity]);

  // end activities actions

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
      return false;
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
      return false;
    }
  };

  const createProvider = async (data) => {
    try {
      const response = await handleCreateProvider(data, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { proveedor } = await response.data;
      dispatch({
        type: POST_PROVIDER,
        payload: proveedor,
      });
      return proveedor;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateProvider = async (id, data, token) => {
    try {
      const response = await handleUpdateProvider(id, data, token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { provider } = await response.data;
      dispatch({
        type: PATCH_PROVIDER,
        payload: provider,
      });
      return provider;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteProvider = async (id) => {
    try {
      const response = await handleDeleteProvider(id, state.user.token);
      console.log(response);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { proveedores } = await response.data;
      dispatch({
        type: DELETE_PROVIDER,
        payload: proveedores,
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getProvidersBySearch = async (body) => {
    try {
      const response = await handleGetProvidersByParams(body, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { proveedores } = await response.data;
      dispatch({
        type: GET_PROVIDERS_BY_SEARCH,
        payload: proveedores,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const clearProvider = () => {
    dispatch({
      type: GET_PROVIDER,
      payload: {},
    });
  };

  useEffect(() => {
    if (state.user.token) {
      getProviders(state.user.token);
    }
  }, [state.user.token, state.provider]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        activities: state.activities,
        activity: state.activity,
        handleLogin,
        postSignup,
        postSignout,
        providers: state.providers,
        provider: state.provider,
        getProviders,
        getProvider,
        createProvider,
        updateProvider,
        deleteProvider,
        getProvidersBySearch,
        clearProvider,
        getActivities,
        getActivity,
        createActivity,
        updateActivity,
        deleteActivity,
        getActivitiesBySearch,
        clearActivity,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
