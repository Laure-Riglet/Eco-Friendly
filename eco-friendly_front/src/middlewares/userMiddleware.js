/* eslint-disable brace-style */
import axios from 'axios';
import {
  USER_LOGIN,
  userAuthenticationSuccess,
  USER_REGISTER,
  userRegisterSuccess,
  userAuthenticationError,
  USER_SETTINGS_UPDATE,
  userSettingsUpdateSuccess,
  userSettingsUpdateError,
  USER_EMAIL_UPDATE,
  userEmailUpdateSuccess,
  userEmailUpdateError,
  USER_SEND_EMAIL_VERIFICATION,
  userSendEmailVerificationSuccess,
  userSendEmailVerificationError,
  USER_DELETE_ACCOUNT,
  userDeleteAccountSuccess,
  userDeleteAccountError,
  USER_PASSWORD_UPDATE,
  userPasswordUpdateSuccess,
  userPasswordUpdateError,
} from '../actions/user';

import config from '../config';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case USER_LOGIN:
      axios
        .post(`${config.apiBaseUrl}/login_check`, {
          username: store.getState().user.email,
          password: store.getState().user.password,
        })
        .then((response) => {
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          store.dispatch(
            userAuthenticationSuccess(response.data.token, response.data.user),
          );
        })
        .catch((error) => {
          store.dispatch(userAuthenticationError(error.response.data.message));
        });
      break;
    case USER_REGISTER:
      axios
        .post(`${config.apiBaseUrl}/register`, {
          email: store.getState().user.email,
          password: store.getState().user.password,
          nickname: store.getState().user.nickname,
          firstname: store.getState().user.firstname,
          lastname: store.getState().user.lastname,
        })
        .then((response) => {
          store.dispatch(userRegisterSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(userAuthenticationError(error.response.data.errors));
        });
      break;
    case USER_SETTINGS_UPDATE:
      axios
        .put(
          `${config.apiBaseUrl}/users/${store.getState().user.id}`,
          {
            email: store.getState().user.email,
            nickname: store.getState().user.nickname,
            firstname: store.getState().user.firstname,
            lastname: store.getState().user.lastname,
            avatar: store.getState().user.avatar,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          },
        )
        .then((response) => {
          sessionStorage.setItem('user', JSON.stringify(response.data));
          store.dispatch(userSettingsUpdateSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(userSettingsUpdateError(error.response.data.errors));
        });
      break;
    case USER_EMAIL_UPDATE:
      axios
        .post(
          `${config.apiBaseUrl}/users/${store.getState().user.id}/email-update`,
          {
            email: store.getState().user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          },
        )
        .then((response) => {
          store.dispatch(userEmailUpdateSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(userEmailUpdateError(error.response.data.errors));
        });
      break;
    case USER_SEND_EMAIL_VERIFICATION:
      axios
        .post(
          `${config.apiBaseUrl}/reset-password`,
          {
            email: store.getState().user.confirmationEmail,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          },
        )
        .then((response) => {
          store.dispatch(userSendEmailVerificationSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(
            userSendEmailVerificationError(error.response.data.message),
          );
        });
      break;
    case USER_PASSWORD_UPDATE:
      /* remove double quote from token */
      action.token = action.token.replace(/"/g, '');
      axios
        .post(
          `${config.apiBaseUrl}/reset-password/reset/${action.token}`,
          {
            password: store.getState().user.password,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          },
        )
        .then((response) => {
          store.dispatch(userPasswordUpdateSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(userPasswordUpdateError(error.response.data.errors));
        });
      break;
    case USER_DELETE_ACCOUNT:
      axios
        .delete(`${config.apiBaseUrl}/users/${store.getState().user.id}`, {
          headers: {
            Authorization: `Bearer ${store.getState().user.token}`,
          },
        })
        .then((response) => {
          store.dispatch(userDeleteAccountSuccess(response.data));
        })
        .catch((error) => {
          store.dispatch(userDeleteAccountError(error.response.data.errors));
        });
      break;
    default:
  }
  next(action);
};

export default userMiddleware;
