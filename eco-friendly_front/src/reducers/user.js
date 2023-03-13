import {
  USER_ON_INPUT_CHANGE,
  USER_AUTHENTICATION_SUCCESS,
  USER_AUTHENTICATION_ERROR,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_SETTINGS_UPDATE_SUCCESS,
  USER_SETTINGS_UPDATE_ERROR,
  USER_REMOVE_ERROR_MESSAGES,
  USER_EMAIL_UPDATE_SUCCESS,
  USER_EMAIL_UPDATE_ERROR,
  USER_SEND_EMAIL_VERIFICATION_SUCCESS,
  USER_SEND_EMAIL_VERIFICATION_ERROR,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_ERROR,
  USER_DELETE_ACCOUNT_SUCCESS,
  USER_DELETE_ACCOUNT_ERROR,
  USER_LOGOUT,
  USER_TOGGLE_IS_UPDATED,
} from '../actions/user';

import { REMOVE_ERROR_MESSAGES } from '../actions/common';

export const initialState = {
  token: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).token
    : '',
  isLoaded: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).isLoaded
    : false,
  isLogged: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).isLogged
    : false,
  id: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).id
    : '',
  roles: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).roles
    : [],
  firstname: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).firstname
    : '',
  lastname: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).lastname
    : '',
  nickname: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).nickname
    : '',
  avatar: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).avatar
    : '',
  isActive: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).isActive
    : false,
  isVerified: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).isVerified
    : false,
  email: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user')).email
    : '',
  confirmationEmail: '',
  password: '',
  confirmPassword: '',
  resetToken: '',
  isUpdated: false,
  isRegistring: false, // User is registering or updating his password or email
  firstnameErrorMessages: [],
  lastnameErrorMessages: [],
  nicknameErrorMessages: [],
  avatarErrorMessages: [],
  emailConfirmationMessages: '',
  emailErrorMessages: [],
  passwordErrorMessages: [],
  authErrorMessages: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_ON_INPUT_CHANGE:
      return {
        ...state,
        [action.identifier]: action.value,
      };
    case REMOVE_ERROR_MESSAGES:
      return {
        ...state,
        emailErrorMessages: [],
        passwordErrorMessages: [],
        nicknameErrorMessages: [],
      };
    case USER_TOGGLE_IS_UPDATED:
      return {
        ...state,
        isUpdated: !state.isUpdated,
      };
    case USER_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        token: action.token,
        isLoaded: true,
        isLogged: true,
        isRegistring: false,
        id: action.data.id,
        roles: action.data.roles,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        nickname: action.data.nickname,
        avatar: action.data.avatar,
        isActive: action.data.isActive,
        isVerified: action.data.isVerified,
        email: action.data.email,
        password: '',
      };
    case USER_AUTHENTICATION_ERROR:
      return {
        ...state,
        authErrorMessages: action.error,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        nickname: action.data.nickname,
        email: action.data.email,
        isRegistring: true,
        password: '',
        confirmPassword: '',
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        emailErrorMessages: action.errors.email,
        passwordErrorMessages: action.errors.password,
        nicknameErrorMessages: action.errors.nickname,
      };
    case USER_SETTINGS_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        roles: action.data.roles,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        nickname: action.data.nickname,
        avatar: action.data.avatar,
        isActive: action.data.isActive,
        isVerified: action.data.isVerified,
        email: action.data.email,
      };
    case USER_SETTINGS_UPDATE_ERROR:
      return {
        ...state,
        firstnameErrorMessages: action.errors.firstname,
        lastnameErrorMessages: action.errors.lastname,
        nicknameErrorMessages: action.errors.nickname,
        avatarErrorMessages: action.errors.avatar,
        emailErrorMessages: action.errors.email,
      };
    case USER_EMAIL_UPDATE_SUCCESS:
      return {
        ...state,
        isRegistring: true,
        isVerified: false,
        nickname: action.data.nickname,
        email: action.data.email,
      };
    case USER_EMAIL_UPDATE_ERROR:
      return {
        ...state,
        emailErrorMessages: action.errors,
      };
    case USER_SEND_EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        isRegistring: true,
        emailConfirmationMessages: action.data.message,
        resetToken: action.data.resetToken.token,
      };
    case USER_SEND_EMAIL_VERIFICATION_ERROR:
      return {
        ...state,
        emailErrorMessages: [action.errors],
      };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdated: true,
        isRegistring: false,
        password: '',
        confirmPassword: '',
        resetToken: '',
      };
    case USER_PASSWORD_UPDATE_ERROR:
      return {
        ...state,
        passwordErrorMessages: action.errors,
      };
    case USER_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
      };
    case USER_DELETE_ACCOUNT_ERROR:
      return {
        ...state,
      };
    case USER_REMOVE_ERROR_MESSAGES:
      return {
        ...state,
        firstnameErrorMessages: [],
        lastnameErrorMessages: [],
        nicknameErrorMessages: [],
        avatarErrorMessages: [],
        emailErrorMessages: [],
        passwordErrorMessages: [],
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: '',
        isLoaded: false,
        isLogged: false,
        id: '',
        roles: [],
        firstname: '',
        lastname: '',
        nickname: '',
        avatar: '',
        isActive: false,
        isVerified: false,
        email: '',
        password: '',
      };
    default:
      return state;
  }
};

export default reducer;
