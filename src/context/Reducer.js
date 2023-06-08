import {
  POST_SIGNIN,
  POST_SIGNUP,
  POST_SIGNOUT,
  GET_ACTIVITIES,
  GET_PROVIDERS,
  GET_PROVIDER,
  POST_PROVIDER,
  PATCH_PROVIDER,
  DELETE_PROVIDER,
  GET_PROVIDERS_BY_STATUS,
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
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
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
        provider: payload,
      };
    case GET_PROVIDERS_BY_STATUS:
      return {
        ...state,
        providers: payload,
      };

    default:
      return state;
  }
};
