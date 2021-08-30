import {AUTH_SIGN_IN, LOG_OUT} from "../actions/actionTypes";

const initialState = {
  token: null
}

export default function authReduced(state = initialState, action) {
  switch (action.type) {
    case AUTH_SIGN_IN: {
      return {
        ...state, token: action.token
      }
    }
    case LOG_OUT: {
      return {
        ...state, token: null
      }
    }
    default:
      return {...state}
  }
}