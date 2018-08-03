import loading from "./loading"
import setMethod from "./setMethod"
import setMethods from "./setMethods"
import showSimilarWords from "./showSimilarWords"
import {combineReducers} from "redux"

/**
 * ルートReducer
 */
export default combineReducers({
    showSimilarWords,
    loading,
    setMethods,
    setMethod
})
