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

    default:
      return state;
  }
};
