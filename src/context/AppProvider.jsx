import React, { useReducer, useEffect } from "react";
import Context from "./Context";
import Reducer from "./Reducer";
import {
  getLogin,
  handleRegister,
  handleSignout,
  getProfile,
  handleGetCompanies,
  handleGetCompany,
  handleCreateCompany,
  handleUpdateCompany,
  handleDeleteCompany,
  handleGetCompaniesByParams,
  handleGetActivities,
  handleGetActivity,
  handleCreateActivity,
  handleUpdateActivity,
  handleDeleteActivity,
  handleGetActivitiesByParams,
} from "../api/request.api";
import {
  handleGetInventoryTypes,
  handleGetInventoryBrands,
  handleGetInventoryModels,
  handleGetInventories,
  handleGetInventoryById,
  handleCreateInventory,
  handleUpdateInventory,
  handleDeleteInventory,
  handleGetInventoriesByParams,
  handleValidateSerialNumber,
  handleValidateActivo,
} from "../api/inventory.api";
import {
  POST_SIGNIN,
  POST_SIGNUP,
  POST_SIGNOUT,
  GET_COMPANIES,
  GET_COMPANY,
  POST_COMPANY,
  PATCH_COMPANY,
  DELETE_COMPANY,
  GET_COMPANIES_BY_SEARCH,
  GET_ACTIVITIES,
  GET_ACTIVITY,
  POST_ACTIVITY,
  PATCH_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ACTIVITIES_BY_SEARCH,
  GET_INVENTORY_TYPES,
  GET_INVENTORY_BRANDS,
  GET_INVENTORY_MODELS,
  GET_INVENTORY,
  GET_INVENTORY_BY_ID,
  POST_INVENTORY,
  PATCH_INVENTORY,
  DELETE_INVENTORY,
  GET_INVENTORIES_BY_SEARCH,
} from "./Types";
import {
  Base_Company,
  Base_Inventory,
  Base_InventoryBrand,
  Base_InventoryModel,
  Base_InventoryType,
  Base_User,
} from "./Models";

const AppProvider = (props) => {
  const initialState = {
    user: { token: null, user: Base_User },
    inventories: [Base_Inventory()],
    inventory: Base_Inventory(),
    inventoryTypes: [Base_InventoryType],
    inventoryBrands: [Base_InventoryBrand],
    inventoryModels: [Base_InventoryModel],
    activities: [],
    activity: {},
    compnanies: [Base_Company],
    company: Base_Company,
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  // auth actions
  const handleLogin = async (data) => {
    try {
      const response = await getLogin(data);
      if (response?.status !== 200) {
        return { status: false, error: response.data.message };
      }
      dispatch({
        type: POST_SIGNIN,
        payload: response.data,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      return { status: true, data: response.data };
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
      } else {
        localStorage.removeItem("user");
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
    await handleSignout();
    dispatch({
      type: POST_SIGNOUT,
    });
    localStorage.removeItem("user");
  };

  // end auth actions
  // inventary actions

  const getInventories = async () => {
    try {
      const response = await handleGetInventories(state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventories } = await response.data;

      dispatch({
        type: GET_INVENTORY,
        payload: inventories,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryById = async (id) => {
    try {
      const response = await handleGetInventoryById(id, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventory } = await response.data;

      dispatch({
        type: GET_INVENTORY_BY_ID,
        payload: inventory,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const createInventory = async (data) => {
    try {
      const response = await handleCreateInventory(state.user.token, data);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventory } = await response.data;

      dispatch({
        type: POST_INVENTORY,
        payload: inventory,
      });
      return { inventary, status: true };
    } catch (error) {
      console.log(error);
      return { status: false, error };
    }
  };

  const updateInventory = async (id, data) => {
    try {
      const response = await handleUpdateInventory(state.user.token, id, data);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventory } = await response.data;

      dispatch({
        type: PATCH_INVENTORY,
        payload: inventory,
      });
      return inventory;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteInventory = async (id) => {
    try {
      const response = await handleDeleteInventory(state.user.token, id);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      } else {
        const inventoryUpdated = state.inventaries.filter(
          (inventary) => inventary._id !== id
        );
        dispatch({
          type: DELETE_INVENTORY,
          payload: inventoryUpdated,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoriesBySearch = async (body) => {
    try {
      const response = await handleGetInventoriesByParams(
        body,
        state.user.token
      );
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventories } = await response.data;

      dispatch({
        type: GET_INVENTORIES_BY_SEARCH,
        payload: inventories,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getValidatedSerialNumber = async (body) => {
    try {
      const response = await handleValidateSerialNumber(body, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getValidatedActivo = async (body) => {
    try {
      const response = await handleValidateActivo(body, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryTypes = async (token) => {
    try {
      const response = await handleGetInventoryTypes(token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryTypes } = await response.data;
      dispatch({
        type: GET_INVENTORY_TYPES,
        payload: inventoryTypes,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryBrands = async (token) => {
    try {
      const response = await handleGetInventoryBrands(token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryBrands } = await response.data;
      dispatch({
        type: GET_INVENTORY_BRANDS,
        payload: inventoryBrands,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryModels = async (token) => {
    try {
      const response = await handleGetInventoryModels(token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryModels } = await response.data;
      dispatch({
        type: GET_INVENTORY_MODELS,
        payload: inventaryModels,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

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

  // useEffect(() => {
  //   if (state.user.token) {
  //     getActivities(state.user.token);
  //   }
  // }, [state.user.token, state.activity]);

  // end activities actions

  const getCompanies = async (token) => {
    try {
      const response = await handleGetCompanies(token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { companies } = await response.data;
      dispatch({
        type: GET_COMPANIES,
        payload: companies,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getCompany = async (id) => {
    try {
      const response = await handleGetCompany(id, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { company } = await response.data;
      dispatch({
        type: GET_COMPANY,
        payload: company,
      });
      return company;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const createCompany = async (data) => {
    try {
      const response = await handleCreateCompany(data, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { company } = await response.data;
      dispatch({
        type: POST_COMPANY,
        payload: company,
      });
      return company;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateCompany = async (id, data, token) => {
    try {
      const response = await handleUpdateCompany(id, data, token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { company } = await response.data;
      dispatch({
        type: PATCH_COMPANY,
        payload: company,
      });
      return company;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteCompany = async (id) => {
    try {
      const response = await handleDeleteCompany(id, state.user.token);
      console.log(response);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { companies } = await response.data;
      dispatch({
        type: DELETE_COMPANY,
        payload: companies,
      });
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getCompanyBySearch = async (body) => {
    try {
      const response = await handleGetCompaniesByParams(body, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { companies } = await response.data;
      dispatch({
        type: GET_COMPANIES_BY_SEARCH,
        payload: companies,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const clearCompany = () => {
    dispatch({
      type: GET_COMPANY,
      payload: {},
    });
  };

  useEffect(() => {
    if (state.user.token) {
      getCompanies(state.user.token);
      getInventories(state.user.token);
      getInventoryTypes(state.user.token);
      getInventoryBrands(state.user.token);
      getInventoryModels(state.user.token);
    }
  }, [state.user.token, state.company, state.inventory, state.inventaryModels]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        activities: state.activities,
        activity: state.activity,
        companies: state.companies,
        company: state.company,
        inventoryTypes: state.inventoryTypes,
        inventoryBrands: state.inventoryBrands,
        inventoryModels: state.inventaryModels,
        inventories: state.inventories,
        inventory: state.inventory,
        handleLogin,
        postSignup,
        postSignout,
        getCompanies,
        getCompany,
        createCompany,
        updateCompany,
        deleteCompany,
        getCompanyBySearch,
        clearCompany,
        getActivities,
        getActivity,
        createActivity,
        updateActivity,
        deleteActivity,
        getActivitiesBySearch,
        clearActivity,
        getInventoryTypes,
        getInventoryBrands,
        getInventoryModels,
        getInventories,
        getInventoryById,
        createInventory,
        updateInventory,
        deleteInventory,
        getInventoriesBySearch,
        getValidatedSerialNumber,
        getValidatedActivo,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
