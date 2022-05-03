import { combineReducers } from "redux"
import storeSession from './storeSession'

const rootReducer = combineReducers({
    "storeSession" : storeSession
})

export default rootReducer