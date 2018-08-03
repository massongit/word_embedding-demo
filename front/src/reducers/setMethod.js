import * as types from "../actions/types"
import {handleActions} from "redux-actions"

/**
 * 手法セットActionのReducer
 */
export default handleActions(
    {
        // 手法セットActionのとき
        [types.SET_METHOD]: (state, action) => {
            if (action.payload.method) {
                return {
                    prevMethod: state.method,
                    method: action.payload.method
                }
            } else {
                return state
            }
        }
    }, {}
)
