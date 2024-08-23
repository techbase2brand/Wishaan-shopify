import { combineReducers } from 'redux';
import wishlistReducer from './wishListReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import menuReducer from './menuReducer';
import videoReducer from './videoReducer';
import cachedFilesReducer from './cachedFilesReducer';
import activeCollectionReducer from './activeCollectionReducer';
import titlesReducer from './titlesReducer';

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
  auth: authReducer,
  cart: cartReducer,
  menu: menuReducer,
  videos: videoReducer,
  cachedFiles: cachedFilesReducer,
  activeCollection: activeCollectionReducer,
  titles: titlesReducer,
});

export default rootReducer;
