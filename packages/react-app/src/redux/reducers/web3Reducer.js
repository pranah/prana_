import { 
  ADD_TODO, TOGGLE_TODO, SET_USER_ACCOUNT,
  SET_PRANA_CONTRACT,
  SET_PRANA_HELPER_CONTRACT,
} from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
  userAccount: null,
  pranaContract: null,
  pranaHelperContract: null,
  myPublishedContent: [],
  myCollectedTokens: [],
  myRentedTokens: [],
  collectableContent: [],
  resaleTokens: [],
  rentTokens: [],
  

};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }
    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }
    case SET_USER_ACCOUNT: {
      const { userAccount } = action.payload;
      return {
        ...state,
        userAccount
      };
    }
    case SET_PRANA_CONTRACT: {
      const { pranaContract } = action.payload;
      return {
        ...state,
        pranaContract
      };
    }
    case SET_PRANA_HELPER_CONTRACT: {
      const { pranaHelperContract } = action.payload;
      return {
        ...state,
        pranaHelperContract
      };
    }
    default:
      return state;
  }
}
