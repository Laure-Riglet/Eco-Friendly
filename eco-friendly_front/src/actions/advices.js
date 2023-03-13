/* eslint-disable operator-linebreak */
/**
 * @name loadingAdvicesData
 * @description Action creator for loading advices data
 * @returns {object}
 */
export const LOADING_ADVICES_DATA = 'LOADING_ADVICES_DATA';

export const loadingAdvicesData = () => ({
  type: LOADING_ADVICES_DATA,
});

/**
 * @name loadingLastFourAdvices
 * @description Action creator for loading last four advices data
 * @param {array} data
 * @returns {object}
 */
export const FETCH_ADVICES_FROM_API = 'FETCH_ADVICES_FROM_API';

export const fetchAdvicesFromApi = (data) => ({
  type: FETCH_ADVICES_FROM_API,
  data,
});

/**
 * @name EditAdviceData
 * @description Action creator for editing advice data
 * @param {object} data
 * @returns {object}
 */
export const EDIT_ADVICE_DATA = 'EDIT_ADVICE_DATA';

export const editAdviceData = (data) => ({
  type: EDIT_ADVICE_DATA,
  data,
});

/**
 * @name getUserAdvices
 * @description Action creator for loading user advices
 * @returns {object}
 */
export const GET_USER_ADVICES = 'GET_USER_ADVICES';

export const getUserAdvices = () => ({
  type: GET_USER_ADVICES,
});

/**
 * @name getUserAdvicesSuccess
 * @description Action creator to get user advices success
 * @param {array} data
 * @returns {object}
 */
export const GET_USER_ADVICES_SUCCESS = 'GET_USER_ADVICES_SUCCESS';

export const getUserAdvicesSuccess = (data) => ({
  type: GET_USER_ADVICES_SUCCESS,
  data,
});

/**
 * @name getUserAdvicesFailed
 * @description Action creator to get user advices failed
 * @param {array} errors
 * @returns {object}
 */
export const GET_USER_ADVICES_FAILED = 'GET_USER_ADVICES_FAILED';

export const getUserAdvicesFailed = (errors) => ({
  type: GET_USER_ADVICES_FAILED,
  errors,
});

/**
 * @name UserPublishNewAdvice
 * @description Action creator for publishing new advice
 * @returns {object}
 */
export const USER_PUBLISH_NEW_ADVICE = 'USER_PUBLISH_NEW_ADVICE';

export const userPublishNewAdvice = () => ({
  type: USER_PUBLISH_NEW_ADVICE,
});

/**
 * @name userPublishNewAdviceSuccess
 * @description Action creator for publishing new advice success
 * @param {object} data
 * @returns {object}
 */
export const USER_PUBLISH_NEW_ADVICE_SUCCESS =
  'USER_PUBLISH_NEW_ADVICE_SUCCESS';

export const userPublishNewAdviceSuccess = (data) => ({
  type: USER_PUBLISH_NEW_ADVICE_SUCCESS,
  data,
});

/**
 * @name userPublishNewAdviceFailed
 * @description Action creator for publishing new advice failed
 * @param {array} errors
 * @returns {object}
 */
export const USER_PUBLISH_NEW_ADVICE_FAILED = 'USER_PUBLISH_NEW_ADVICE_FAILED';

export const userPublishNewAdviceFailed = (errors) => ({
  type: USER_PUBLISH_NEW_ADVICE_FAILED,
  errors,
});

/**
 * @name userSaveNewAdvice
 * @description Action creator for saving new advice
 * @returns {object}
 */
export const USER_SAVE_NEW_ADVICE = 'USER_SAVE_NEW_ADVICE';

export const userSaveNewAdvice = () => ({
  type: USER_SAVE_NEW_ADVICE,
});

/**
 * @name userSaveNewAdviceSuccess
 * @description Action creator for saving new advice success
 * @param {object} data
 * @returns {object}
 * */
export const USER_SAVE_NEW_ADVICE_SUCCESS = 'USER_SAVE_NEW_ADVICE_SUCCESS';

export const userSaveNewAdviceSuccess = (data) => ({
  type: USER_SAVE_NEW_ADVICE_SUCCESS,
  data,
});

/**
 * @name userSaveNewAdviceFailed
 * @description Action creator for saving new advice failed
 * @param {array} errors
 * @returns {object}
 */
export const USER_SAVE_NEW_ADVICE_FAILED = 'USER_SAVE_NEW_ADVICE_FAILED';

export const userSaveNewAdviceFailed = (errors) => ({
  type: USER_SAVE_NEW_ADVICE_FAILED,
  errors,
});

/**
 * @name userPublishEditAdvice
 * @description Action creator for publishing edited advice
 * @returns {object}
 */
export const USER_PUBLISH_EDIT_ADVICE = 'USER_PUBLISH_EDIT_ADVICE';

export const userPublishEditAdvice = () => ({
  type: USER_PUBLISH_EDIT_ADVICE,
});

/**
 * @name userPublishEditAdviceSuccess
 * @description Action creator for publishing edited advice success
 * @param {object} data
 * @returns {object}
 */
export const USER_PUBLISH_EDIT_ADVICE_SUCCESS =
  'USER_PUBLISH_EDIT_ADVICE_SUCCESS';

export const userPublishEditAdviceSuccess = (data) => ({
  type: USER_PUBLISH_EDIT_ADVICE_SUCCESS,
  data,
});

/**
 * @name userPublishEditAdviceFailed
 * @description Action creator for publishing edited advice failed
 * @param {array} errors
 * @returns {object}
 */
export const USER_PUBLISH_EDIT_ADVICE_FAILED =
  'USER_PUBLISH_EDIT_ADVICE_FAILED';

export const userPublishEditAdviceFailed = (errors) => ({
  type: USER_PUBLISH_EDIT_ADVICE_FAILED,
  errors,
});

/**
 * @name userSaveEditAdvice
 * @description Action creator for saving edited advice
 * @returns {object}
 */
export const USER_SAVE_EDIT_ADVICE = 'USER_SAVE_EDIT_ADVICE';

export const userSaveEditAdvice = () => ({
  type: USER_SAVE_EDIT_ADVICE,
});

/**
 * name userSaveEditAdviceSuccess
 * @description Action creator for saving edited advice success
 * @param {object} data
 * @returns {object}
 */
export const USER_SAVE_EDIT_ADVICE_SUCCESS = 'USER_SAVE_EDIT_ADVICE_SUCCESS';

export const userSaveEditAdviceSuccess = (data) => ({
  type: USER_SAVE_EDIT_ADVICE_SUCCESS,
  data,
});

/**
 * @name userSaveEditAdviceFailed
 * @description Action creator for saving edited advice failed
 * @param {array} errors
 * @returns {object}
 */
export const USER_SAVE_EDIT_ADVICE_FAILED = 'USER_SAVE_EDIT_ADVICE_FAILED';

export const userSaveEditAdviceFailed = (errors) => ({
  type: USER_SAVE_EDIT_ADVICE_FAILED,
  errors,
});

/**
 * @name userDeleteAdvice
 * @description Action creator for deleting advice
 * @param {string} id
 * @returns {object}
 */
export const USER_DELETE_ADVICE = 'USER_DELETE_ADVICE';

export const userDeleteAdvice = (id) => ({
  type: USER_DELETE_ADVICE,
  id,
});

/**
 * @name userDeleteAdviceSuccess
 * @description Action creator for deleting advice success
 * @returns {object}
 */
export const USER_DELETE_ADVICE_SUCCESS = 'USER_DELETE_ADVICE_SUCCESS';

export const userDeleteAdviceSuccess = () => ({
  type: USER_DELETE_ADVICE_SUCCESS,
});

/**
 * @name userDeleteAdviceFailed
 * @description Action creator for deleting advice failed
 * @param {array} errors
 * @returns {object}
 */
export const USER_DELETE_ADVICE_FAILED = 'USER_DELETE_ADVICE_FAILED';

export const userDeleteAdviceFailed = (errors) => ({
  type: USER_DELETE_ADVICE_FAILED,
  errors,
});
