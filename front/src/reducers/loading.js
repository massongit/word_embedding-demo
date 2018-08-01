import * as types from "../actions/types"
import {handleActions} from "redux-actions"

/**
 * ローディングActionのReducer
 */
export default handleActions(
    {
        // ローディングActionのとき
        [types.LOADING]: (state, action) => {
            if (typeof action.payload.loading === "boolean") {
                return {
                    loading: action.payload.loading
                }
            } else {
                return state
            }
        }
    },
    {
        loading: false
    }
)
