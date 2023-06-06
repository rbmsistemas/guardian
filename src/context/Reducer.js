import { POST_SIGNIN, POST_SIGNUP, GET_ACTIVITIES } from "./Types";

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
    case CLOSE_SESION:
      return {
        ...state,
        user: [],
      };
    default:
      return state;
  }
};
