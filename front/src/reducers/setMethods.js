import * as types from "../actions/types"
import {handleActions} from "redux-actions"

/**
 * 手法一覧セットActionのReducer
 */
export default handleActions(
    {
        // 手法一覧セットActionのとき
        [types.SET_METHODS]: (state, action) => {
            if (action.payload.methods && 0 < action.payload.methods.length) {
                return {
                    methods: action.payload.methods
                }
            } else {
                return state
            }
        }
    },
    {
        methods: []
    }
)
