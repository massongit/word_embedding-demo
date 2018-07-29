import * as types from "../actions/types"
import {handleActions} from "redux-actions"

/**
 * Word2Vecによる計算結果の表示ActionのReducer
 */
export default handleActions(
    {
        // Word2Vecによる計算結果の表示Actionのとき
        [types.SHOW_SIMILAR_WORDS]: (state, action) => {
            if (action.payload.words && action.payload.words.similar) {
                for (const s of action.payload.words.similar) {
                    if (!s || !s.word || !s.cosine) {
                        return state
                    }
                }

                if (action.payload.keywords && action.payload.words && !action.payload.words.similar.includes(undefined)) {
                    return {
                        keywords: action.payload.keywords,
                        words: action.payload.words
                    }
                }
            }

            return state
        }
    },
    {
        keywords: {
            positive: [],
            negative: []
        },
        words: {
            positive: [],
            negative: [],
            similar: []
        }
    }
)
