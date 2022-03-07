import { combineReducers } from 'redux'
import authedUser from '../reducers/authedUser'
import questions from '../reducers/questions'
import users from '../reducers/users'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
  authedUser,
  questions,
  users,
  loadingBar: loadingBarReducer
})