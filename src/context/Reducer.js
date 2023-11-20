import {
  POST_SIGNIN,
  POST_SIGNUP,
  POST_SIGNOUT,
  GET_USERS,
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
  GET_INVENTORIES_BY_PARAMS,
  GET_INVENTORIES_BY_SEARCH,
  GET_INVENTORY_MODEL_BY_ID,
  GET_INVENTORY_FIELDS,
  GET_INVENTORY_FIELD_BY_ID,
  POST_INVENTORY_FIELD,
  PATCH_INVENTORY_FIELD,
  DELETE_INVENTORY_FIELD,
  GET_INVENTORY_GROUPS,
  GET_INVENTORY_GROUP,
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
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    case GET_COMPANY:
      return {
        ...state,
        company: payload,
      };
    case POST_COMPANY:
      return {
        ...state,
        company: payload,
      };
    case PATCH_COMPANY:
      return {
        ...state,
        company: payload,
      };
    case DELETE_COMPANY:
      return {
        ...state,
        companies: payload,
      };
    case GET_COMPANIES_BY_SEARCH:
      return {
        ...state,
        companies: payload,
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
    case GET_INVENTORIES_BY_PARAMS:
      return {
        ...state,
        inventories: payload,
      };
    case GET_INVENTORIES_BY_SEARCH:
      return {
        ...state,
        searchedInventories: payload,
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
    case GET_INVENTORY_MODEL_BY_ID:
      return {
        ...state,
        inventoryModel: payload,
      };

    case GET_INVENTORY_FIELDS:
      return {
        ...state,
        allInventoryFields: payload,
      };
    case GET_INVENTORY_FIELD_BY_ID:
      return {
        ...state,
        inventoryField: payload,
      };
    case POST_INVENTORY_FIELD:
      return {
        ...state,
        inventoryField: payload,
      };
    case PATCH_INVENTORY_FIELD:
      return {
        ...state,
        inventoryField: payload,
      };
    case DELETE_INVENTORY_FIELD:
      return {
        ...state,
        inventoryFields: payload,
      };
    case GET_INVENTORY_GROUPS:
      return {
        ...state,
        inventoryGroups: payload,
      };
    case GET_INVENTORY_GROUP:
      return {
        ...state,
        inventoryGroup: payload,
      };

    default:
      return state;
  }
};
