import {
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_BURGER,
  TOGGLE_USER_MENU,
  FETCH_CATEGORIES_FROM_API,
  FETCH_HOME_PAGE_DATA_FROM_API,
} from '../actions/common';

export const initialState = {
  modalIsOpen: false,
  modalContent: null,
  burgerIsOpen: false,
  userMenuIsOpen: false,
  categories: [],
  homePageData: {},
  homePageDataIsLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
        modalContent: action.modalContent,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
        modalContent: null,
      };
    case TOGGLE_BURGER:
      return {
        ...state,
        burgerIsOpen: !state.burgerIsOpen,
      };
    case TOGGLE_USER_MENU:
      return {
        ...state,
        userMenuIsOpen: !state.userMenuIsOpen,
      };
    case FETCH_CATEGORIES_FROM_API:
      return {
        ...state,
        categories: action.data,
      };
    case FETCH_HOME_PAGE_DATA_FROM_API:
      return {
        ...state,
        homePageData: action.data,
        homePageDataIsLoaded: true,
      };
    default:
      return state;
  }
};

export default reducer;
