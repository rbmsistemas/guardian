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
  DELETE_INVENTORY,
  PATCH_INVENTORY,
  POST_INVENTORY,
  GET_INVENTORY_BY_ID,
  GET_INVENTORY,
  GET_INVENTORIES_BY_SEARCH,
} from "./Types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case POST_SIGNIN:
      return {
        ...state,
        user: payload,
      };
    case POST_SIGNUP:
      return {
        ...state,
        user: payload,
      };
    case POST_SIGNOUT:
      return {
        ...state,
        user: [],
      };
    case GET_COMPANIES:
      return {
        ...state,
        providers: payload,
      };
    case GET_COMPANY:
      return {
        ...state,
        provider: payload,
      };
    case POST_COMPANY:
      return {
        ...state,
        provider: payload,
      };
    case PATCH_COMPANY:
      return {
        ...state,
        provider: payload,
      };
    case DELETE_COMPANY:
      return {
        ...state,
        providers: payload,
      };
    case GET_COMPANIES_BY_SEARCH:
      return {
        ...state,
        providers: payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
        activity: payload,
      };
    case PATCH_ACTIVITY:
      return {
        ...state,
        activity: payload,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: payload,
      };
    case GET_ACTIVITIES_BY_SEARCH:
      return {
        ...state,
        activities: payload,
      };
    case GET_INVENTORY:
      return {
        ...state,
        inventories: payload,
      };
    case GET_INVENTORY_BY_ID:
      return {
        ...state,
        inventory: payload,
      };
    case GET_INVENTORIES_BY_SEARCH:
      return {
        ...state,
        inventories: payload,
      };
    case POST_INVENTORY:
      return {
        ...state,
        inventory: payload,
      };
    case PATCH_INVENTORY:
      return {
        ...state,
        inventory: payload,
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventories: payload,
      };
    case GET_INVENTORY_TYPES:
      return {
        ...state,
        inventoryTypes: payload,
      };
    case GET_INVENTORY_BRANDS:
      return {
        ...state,
        inventoryBrands: payload,
      };
    case GET_INVENTORY_MODELS:
      return {
        ...state,
        inventoryModels: payload,
      };
    default:
      return state;
  }
};
