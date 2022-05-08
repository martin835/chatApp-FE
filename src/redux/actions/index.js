export const SET_LOGGED_USER = "SET_LOGGED_USER"
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"

export const setLoggedUserAction = userInfo => ({
  type: SET_LOGGED_USER,
  payload: userInfo,
})

export const setActiveChatAction = activeChat => ({
  type: SET_ACTIVE_CHAT,
  payload: activeChat,
})
