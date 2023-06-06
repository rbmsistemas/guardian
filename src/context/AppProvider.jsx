import React, { useReducer, useEffect } from "react";
import {
  handleGetActivities,
  getLogin,
  handleRegister,
  handleSignout,
  urlEnv,
  getProfile,
} from "../api/request.api";
import Context from "./Context";
import Reducer from "./Reducer";
import {
  POST_SIGNIN,
  POST_SIGNUP,
  GET_ACTIVITIES,
  POST_SIGNOUT,
} from "./Types";

const AppProvider = (props) => {
  const initialState = {
    user: {},
    activities: [],
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
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      hanldeProfile(user.token);
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
      }
    } catch (error) {
      console.log(error);
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
    }
  };

  const postSignout = async () => {
    const response = await handleSignout(data);

    dispatch({
      type: POST_SIGNOUT,
    });
  };

  // useEffect(() => {
  //   getActivities();
  // }, []);

  return (
    <Context.Provider
      value={{
        user: state.user,
        activities: state.activities,
        handleLogin,
        postSignup,
        getActivities,
        postSignout,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppProvider;
