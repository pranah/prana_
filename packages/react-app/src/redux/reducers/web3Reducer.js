import { ADD_TODO, TOGGLE_TODO, GET_USER_ACCOUNT } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
  userAccount: null

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
    case GET_USER_ACCOUNT: {
      const { userAccount } = action.payload;
      return {
        ...state,
        userAccount
      };
    }
    default:
      return state;
  }
}
