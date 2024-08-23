// titlesReducer.js
import { SET_TITLES } from '../actions/collectionIdAction';

const initialState = {
  titles: [],
};

const titlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLES:
      return {
        ...state,
        titles: action.payload,
      };
    default:
      return state;
  }
};

export default titlesReducer;
