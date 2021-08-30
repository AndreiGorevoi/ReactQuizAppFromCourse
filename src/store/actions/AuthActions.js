import axios from "axios";
import {AUTH_SIGN_IN, LOG_OUT} from "./actionTypes";

export function authSignIn(token) {
  return {
    type: AUTH_SIGN_IN,
    token
  }
}

export function logOut() {
  return {
    type: LOG_OUT,
  }
}

export function authLogOut(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut)
    }, time * 1000)
  }
}


export function auth(login, password, isLogin) {
  return async dispatch => {
    const data = {
      email: login,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwpWgyhaclVp_jqWA6E2GxCE6lmWfNRUc'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwpWgyhaclVp_jqWA6E2GxCE6lmWfNRUc'
    }

    const response = await axios.post(url, data)

    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)

    localStorage.setItem('token', response.data.idToken)
    localStorage.setItem('userId', response.data.localId)
    localStorage.setItem('expirationDate', expirationDate)
    dispatch(authSignIn(response.data.idToken))
    dispatch(authLogOut(response.data.expiresIn))

  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logOut())
    } else {
      const expDate = new Date(localStorage.getItem('expirationDate'))
      if (expDate <= new Date()) {
        dispatch(logOut())
      } else {
        dispatch(authSignIn(token))
        dispatch(authLogOut((expDate.getTime() - new Date().getTime()) / 1000))
      }


    }
  }
}