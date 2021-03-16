import { GET_USER_ACCOUNT, ADD_TODO, TOGGLE_TODO, SET_FILTER } from "../actionTypes";

export const getUserAccount = userAccount => ({
    type: GET_USER_ACCOUNT,
    payload: { userAccount }
  });