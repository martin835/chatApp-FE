import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import loggedUserReducer from "../reducers/loggedUserReducer"
import activeChatReducer from "../reducers/activeChatReducer"

const composeFunction = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  loggedUser: {},
  activeChat: " "
}

const mainReducer = combineReducers({
loggedUser: loggedUserReducer,
activeChat: activeChatReducer
})

const configureStore = createStore(
  mainReducer,
  initialState,
  composeFunction(applyMiddleware(thunk))
)

export default configureStore
