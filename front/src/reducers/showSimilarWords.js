import * as types from "../actions/types"
import {handleActions} from "redux-actions"

/**
 * similarWordsActionに適切に要素が含まれているかどうかをチェックする
 * @param action {object} similarWordsAction
 * @returns {boolean} similarWordsActionに適切に要素が含まれているかどうか
 */
export const checkSimilarWordsAction = (action) => {
    if (action.payload.keywords && action.payload.words && action.payload.words.similar) {
        for (const s of action.payload.words.similar) {
            if (!s || !s.word || !s.cosine) {
                return false
            }
        }

        return true
    } else {
        return false
    }
}

/**
 * 分散表現による計算結果の表示ActionのReducer
 */
export default handleActions(
    {
        // 分散表現による計算結果の表示Actionのとき
        [types.SHOW_SIMILAR_WORDS]: (state, action) => {
            if (checkSimilarWordsAction(action)) {
                return {
                    keywords: action.payload.keywords,
                    words: action.payload.words,
                    method: action.payload.method
                }
            } else {
                return state
            }
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
