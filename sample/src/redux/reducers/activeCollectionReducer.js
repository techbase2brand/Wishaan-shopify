// activeCollectionReducer.js
import { SET_ACTIVE_COLLECTION_ID } from '../actions/collectionIdAction';

const initialState = {
  activeCollectionId: 'gid://shopify/Collection/481233142067',
};

const activeCollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_COLLECTION_ID:
      return {
        ...state,
        activeCollectionId: action.payload,
      };
    default:
      return state;
  }
};

export default activeCollectionReducer;

  
