import {initialState} from "../store"
import { SET_ACTIVE_CHAT } from "../actions"

const activeChatReducer = (state = initialState.activeChat, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT:
      return  action.payload
      
    default:
      return state
  }
}

export default activeChatReducer
