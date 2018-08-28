import * as types from "../actions/types"
import {handleActions} from "redux-actions"
import {checkSimilarWordsAction} from "./showSimilarWords"

/**
 * 手法セットActionのReducer
 */
export default handleActions(
    {
        // 手法セットActionのとき
        [types.SET_METHOD]: (state, action) => {
            if (action.payload.method) {
                return {
                    prevMethod: state.prevMethod,
                    method: action.payload.method
                }
            } else {
                return state
            }
        },
        // 分散表現による計算結果の表示Actionのとき
        [types.SHOW_SIMILAR_WORDS]: (state, action) => {
            if (checkSimilarWordsAction(action)) {
                return {
                    prevMethod: state.method,
                    method: state.method
                }
            } else {
                return state
            }
        }
    }, {}
)
