import * as types from "../actions/types"
import {handleActions} from "redux-actions"

/**
 * similarに適切に要素が含まれているかどうかをチェックする
 * @param similar {array} similar
 * @returns {boolean} similarに適切に要素が含まれているかどうか
 */
const checkSimilar = (similar) => {
    for (const s of similar) {
        if (!s || !s.word || !s.cosine) {
            return false
        }
    }

    return true
}

/**
 * similarWordsActionに適切に要素が含まれているかどうかをチェックする
 * @param action {object} similarWordsAction
 * @returns {boolean} similarWordsActionに適切に要素が含まれているかどうか
 */
export const checkSimilarWordsAction = (action) => (action.payload.keywords && action.payload.words && action.payload.words.similar && checkSimilar(action.payload.words.similar))

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
