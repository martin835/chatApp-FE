import {initialState} from "../store"
import { SET_LOGGED_USER } from "../actions"

const loggedUserReducer = (state = initialState.loggedUser, action) => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return  action.payload

    default:
      return state
  }
}

export default loggedUserReducer
