import { combineReducers } from 'redux'
import User from './User'
import Friends from './Friends'
import Users from './Users'

export default combineReducers({
	User,
	Friends,
	Users
})
