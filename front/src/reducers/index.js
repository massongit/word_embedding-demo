import loading from "./loading"
import showSimilarWords from "./showSimilarWords"
import {combineReducers} from "redux"

/**
 * ルートReducer
 */
export default combineReducers({
    showSimilarWords,
    loading
})
