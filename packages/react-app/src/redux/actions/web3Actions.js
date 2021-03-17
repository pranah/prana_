import { 
  SET_USER_ACCOUNT, 
  SET_PRANA_CONTRACT, 
  SET_PRANA_HELPER_CONTRACT 
} from "../actionTypes";

export const setUserAccount = userAccount => ({
  type: SET_USER_ACCOUNT,
  payload: { userAccount }
});

export const setPranaContract = pranaContract => ({
  type: SET_PRANA_CONTRACT,
  payload: { pranaContract }
});

export const setPranaHelperContract = pranaHelperContract => ({
  type: SET_PRANA_HELPER_CONTRACT,
  payload: { pranaHelperContract }
});