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
  GET_INVENTARY_TYPES,
  GET_INVENTARY_BRANDS,
  GET_INVENTARY_MODELS,
  DELETE_INVENTARY,
  PATCH_INVENTARY,
  POST_INVENTARY,
  GET_INVENTARY_BY_ID,
  GET_INVENTARY,
  GET_INVENTARIES_BY_SEARCH,
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
    case GET_PROVIDERS:
      return {
        ...state,
        providers: payload,
      };
    case GET_PROVIDER:
      return {
        ...state,
        provider: payload,
      };
    case POST_PROVIDER:
      return {
        ...state,
        provider: payload,
      };
    case PATCH_PROVIDER:
      return {
        ...state,
        provider: payload,
      };
    case DELETE_PROVIDER:
      return {
        ...state,
        providers: payload,
      };
    case GET_PROVIDERS_BY_SEARCH:
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
    case GET_INVENTARY:
      return {
        ...state,
        inventaries: payload,
      };
    case GET_INVENTARY_BY_ID:
      return {
        ...state,
        inventary: payload,
      };
    case GET_INVENTARIES_BY_SEARCH:
      return {
        ...state,
        inventaries: payload,
      };
    case POST_INVENTARY:
      return {
        ...state,
        inventary: payload,
      };
    case PATCH_INVENTARY:
      return {
        ...state,
        inventary: payload,
      };
    case DELETE_INVENTARY:
      return {
        ...state,
        inventaries: payload,
      };
    case GET_INVENTARY_TYPES:
      return {
        ...state,
        inventaryTypes: payload,
      };
    case GET_INVENTARY_BRANDS:
      return {
        ...state,
        inventaryBrands: payload,
      };
    case GET_INVENTARY_MODELS:
      return {
        ...state,
        inventaryModels: payload,
      };
    default:
      return state;
  }
};
