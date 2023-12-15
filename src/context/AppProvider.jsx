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
  urlEnv,
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
  handleGetInventoryModelByParams,
  handleValidateSerialNumber,
  handleValidateActivo,
  handleGetInventoryModelById,
  handleGetInventoriesBySearch,
  handleGetInventoryFields,
  handleGetInventoryFieldById,
  handleCreateInventoryField,
  handleUpdateInventoryField,
  handleDeleteInventoryField,
  handleGetInventoryGroups,
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
  GET_INVENTORIES_BY_PARAMS,
  GET_INVENTORIES_BY_SEARCH,
  GET_USERS,
  GET_INVENTORY_MODEL_BY_ID,
  GET_INVENTORY_FIELDS,
  GET_INVENTORY_FIELD_BY_ID,
  POST_INVENTORY_FIELD,
  PATCH_INVENTORY_FIELD,
  DELETE_INVENTORY_FIELD,
  GET_INVENTORY_GROUPS,
  GET_INVENTORY_GROUP,
} from "./Types";
import {
  Base_Company,
  Base_Inventory,
  Base_InventoryBrand,
  Base_InventoryModel,
  Base_InventoryType,
  Base_User,
  Base_InventoryField,
} from "./Models";
import { handleGetAllUsers } from "../api/users.api";

const AppProvider = (props) => {
  const initialState = {
    user: { token: null, user: Base_User },
    users: [Base_User],
    inventories: [Base_Inventory()],
    inventory: Base_Inventory(),
    searchedInventories: [Base_Inventory()],
    inventoryTypes: [Base_InventoryType],
    inventoryBrands: [Base_InventoryBrand],
    inventoryModels: [Base_InventoryModel],
    inventoryModel: Base_InventoryModel,
    activities: [],
    activity: {},
    companies: [Base_Company],
    company: Base_Company,
    allInventoryFields: Base_InventoryField,
    inventoryField: {},
    inventoryGroups: [],
    inventoryGroup: {},
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  // auth actions
  const handleLogin = async (data) => {
    try {
      const response = await getLogin(data);
      // if response is NET::ERR_CERT_AUTHORITY_INVALID then open the server
      if (response?.status === undefined) {
        window.confirm(
          "No se pudo conectar con el servidor, ¿Desea abrirlo?"
        ) && window.open(urlEnv + "/api/ping", "_blank");
      }
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

  const getUsers = async (params) => {
    try {
      const response = await handleGetAllUsers(state.user.token, params);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { users } = await response.data;

      dispatch({
        type: GET_USERS,
        payload: users,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
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
      const inventoryType = inventory?.inventoryModel?.inventoryType || null;
      const inventoryBrand = inventory?.inventoryModel?.inventoryBrand || null;

      if (!state.inventoryTypes.includes(inventoryType)) {
        dispatch({
          type: GET_INVENTORY_TYPES,
          payload: [
            ...state.inventoryTypes,
            inventory.inventoryModel?.inventoryType,
          ],
        });
      }
      if (!state.inventoryBrands.includes(inventoryBrand)) {
        dispatch({
          type: GET_INVENTORY_BRANDS,
          payload: [
            ...state.inventoryBrands,
            inventory.inventoryModel?.inventoryBrand,
          ],
        });
      }
      return { inventory, status: true };
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
        const inventoryUpdated = state.inventories.filter(
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

  const getInventoriesByParams = async (body) => {
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
        type: GET_INVENTORIES_BY_PARAMS,
        payload: inventories,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoriesBySearch = async (body) => {
    try {
      const response = await handleGetInventoriesBySearch(
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
        payload: inventoryModels,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInvetoryModelById = async (id) => {
    try {
      const response = await handleGetInventoryModelById(id, state.user.token);
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const { inventoryModel, inventories } = await response.data;
      dispatch({
        type: GET_INVENTORY_MODEL_BY_ID,
        payload: inventoryModel,
      });
      dispatch({
        type: GET_INVENTORY,
        payload: inventories,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryModelByParams = async (body) => {
    try {
      const response = await handleGetInventoryModelByParams(
        body,
        state.user.token
      );
      if (response.status !== 200) {
        throw new Error("Error en la respuesta del servidor");
      }

      const { inventoryModels } = await response.data;
      dispatch({
        type: GET_INVENTORY_MODELS,
        payload: inventoryModels,
      });
      return response.data;
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
      if (company.id === state.user.user.companyId) {
        dispatch({
          type: POST_SIGNIN,
          payload: { ...state.user, user: { ...state.user.user, company } },
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state.user,
            user: { ...state.user.user, company },
          })
        );
      }
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

  const getInventoryFields = async () => {
    try {
      const response = await handleGetInventoryFields(state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryFields } = await response.data;
      dispatch({
        type: GET_INVENTORY_FIELDS,
        payload: inventoryFields,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryFieldById = async (id) => {
    try {
      const response = await handleGetInventoryFieldById(id, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryField } = await response.data;

      dispatch({
        type: GET_INVENTORY_FIELD_BY_ID,
        payload: inventoryField,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const createInventoryField = async (data) => {
    try {
      const response = await handleCreateInventoryField(data, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryField } = await response.data;

      dispatch({
        type: POST_INVENTORY_FIELD,
        payload: inventoryField,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateInventoryField = async (id, data) => {
    try {
      const response = await handleUpdateInventoryField(
        id,
        data,
        state.user.token
      );
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryField } = await response.data;

      dispatch({
        type: PATCH_INVENTORY_FIELD,
        payload: inventoryField,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteInventoryField = async (id) => {
    try {
      const response = await handleDeleteInventoryField(id, state.user.token);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryField } = await response.data;

      dispatch({
        type: DELETE_INVENTORY_FIELD,
        payload: inventoryField,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getInventoryGroups = async (body) => {
    try {
      const response = await handleGetInventoryGroups(state.user.token, body);
      if (response?.status >= 300) {
        throw new Error("Error en la respuesta del servidor");
      }
      const { inventoryGroups } = await response.data;

      dispatch({
        type: GET_INVENTORY_GROUPS,
        payload: inventoryGroups,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    if (state.user?.token) {
      getUsers();
      getCompanies(state.user.token);
      getInventories(state.user.token);
      getInventoryTypes(state.user.token);
      getInventoryBrands(state.user.token);
      getInventoryModels(state.user.token);
      getInventoryFields(state.user.token);
    }
  }, [state.company, state.inventory, state.inventaryModels, state?.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        users: state.users,
        activities: state.activities,
        activity: state.activity,
        companies: state.companies,
        company: state.company,
        inventoryTypes: state.inventoryTypes,
        inventoryBrands: state.inventoryBrands,
        inventoryModels: state.inventoryModels,
        inventoryModel: state.inventoryModel,
        inventories: state.inventories,
        inventory: state.inventory,
        searchedInventories: state.searchedInventories,
        allInventoryFields: state.allInventoryFields,
        inventoryField: state.inventoryField,
        inventoryGroups: state.inventoryGroups,
        inventoryGroup: state.inventoryGroup,
        getUsers,
        handleLogin,
        postSignup,
        postSignout,
        getCompanies,
        getCompany,
        createCompany,
        updateCompany,
        deleteCompany,
        getCompanyBySearch,
        getActivities,
        getActivity,
        createActivity,
        updateActivity,
        deleteActivity,
        getActivitiesBySearch,
        getInventoryTypes,
        getInventoryBrands,
        getInventoryModels,
        getInvetoryModelById,
        getInventoryModelByParams,
        getInventories,
        getInventoryById,
        createInventory,
        updateInventory,
        deleteInventory,
        getInventoriesByParams,
        getInventoriesBySearch,
        getValidatedSerialNumber,
        getValidatedActivo,
        getInventoryFields,
        getInventoryFieldById,
        createInventoryField,
        updateInventoryField,
        deleteInventoryField,
        getInventoryGroups,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
