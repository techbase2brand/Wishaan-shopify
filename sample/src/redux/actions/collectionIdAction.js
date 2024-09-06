export const SET_ACTIVE_COLLECTION_ID = 'SET_ACTIVE_COLLECTION_ID';
export const SET_TITLES = 'SET_TITLES';

export const setActiveCollectionId = (id) => ({
  type: SET_ACTIVE_COLLECTION_ID,
  payload: id,
});

export const setTitles = (titles) => ({
  type: SET_TITLES,
  payload: titles,
});