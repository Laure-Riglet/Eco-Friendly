/**
 * @name loadingCategoriesData
 * @description Action creator for loading categories data
 * @returns {object} : the action
 */
export const LOADING_CATEGORIES_DATA = 'LOADING_CATEGORIES_DATA';

export const loadingCategoriesData = () => ({
  type: LOADING_CATEGORIES_DATA,
});

/**
 * @name fetchCategoriesFromApi
 * @description Action creator to get categories data
 * @param {object} data : the data to fetch
 * @returns {object} : the action
 */
export const FETCH_CATEGORIES_FROM_API = 'FETCH_CATEGORIES_FROM_API';

export const fetchCategoriesFromApi = (data) => ({
  type: FETCH_CATEGORIES_FROM_API,
  data,
});

/**
 * @name lodaingHomePageData
 * @description Action creator for loading home page data
 * @returns {object} : the action
 */
export const LOADING_HOME_PAGE_DATA = 'LOADING_HOME_PAGE_DATA';

export const loadingHomePageData = () => ({
  type: LOADING_HOME_PAGE_DATA,
});

/**
 * @name fetchHomePageDataFromApi
 * @description Action creator to get home page data
 * @param {object} data : the data to fetch
 * @returns {object} : the action
 */
export const FETCH_HOME_PAGE_DATA_FROM_API = 'FETCH_HOME_PAGE_DATA_FROM_API';

export const fetchHomePageDataFromApi = (data) => ({
  type: FETCH_HOME_PAGE_DATA_FROM_API,
  data,
});

/**
 * @name loadingCategoriesData
 * @description Action creator for loading categories data
 * @param {ReactNodeLike} modalContent
 * @returns {object} : the action
 */
export const OPEN_MODAL = 'OPEN_MODAL';

export const openModal = (modalContent) => ({
  type: OPEN_MODAL,
  modalContent,
});

/**
 * @name closeModal
 * @description Action creator for closing the modal
 * @returns {object} : the action
 */
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

/**
 * @name onInputChange
 * @description Action creator for changing the value of an input
 * @param {string} value : the value of the input
 * @param {string} identifier : the name of the input
 * @returns {object} : the action
 */
export const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';

export const OnInputChange = (value, identifier) => ({
  type: ON_INPUT_CHANGE,
  value,
  identifier,
});

/**
 * @name removeErrorMessages
 * @description Action creator for removing error messages
 * @returns {object} : the action
 */
export const REMOVE_ERROR_MESSAGES = 'REMOVE_ERROR_MESSAGES';

export const removeErrorMessages = () => ({
  type: REMOVE_ERROR_MESSAGES,
});

/**
 * @name toggleIsPublished
 * @description Action creator for toggling the isPublished state
 * @returns {object} : the action
 */
export const TOGGLE_IS_PUBLISHED = 'TOGGLE_IS_PUBLISHED';

export const toggleIsPublished = () => ({
  type: TOGGLE_IS_PUBLISHED,
});

/**
 * @name toggleIsSaved
 * @description Action creator for toggling the isSaved state
 * @returns {object} : the action
 */
export const TOGGLE_IS_SAVED = 'TOGGLE_IS_SAVED';

export const toggleIsSaved = () => ({
  type: TOGGLE_IS_SAVED,
});

/**
 * @name toggleIsDeleted
 * @description Action creator for toggling the isDeleted state
 * @returns {object} : the action
 */
export const TOGGLE_IS_DELETED = 'TOGGLE_IS_DELETED';

export const toggleIsDeleted = () => ({
  type: TOGGLE_IS_DELETED,
});

/**
 * @name toggleBurger
 * @description Action creator for toggling the burger
 * @returns {object} : the action
 */
export const TOGGLE_BURGER = 'TOGGLE_BURGER';

export const toggleBurger = () => ({
  type: TOGGLE_BURGER,
});

/**
 * @name toggleUserMenu
 * @description Action creator for toggling the user menu
 * @returns {object} : the action
 */
export const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

export const toggleUserMenu = () => ({
  type: TOGGLE_USER_MENU,
});
