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
 * 分散表現による計算結果の表示ActionのReducer
 */
export default handleActions(
    {
        // 分散表現による計算結果の表示Actionのとき
        [types.SHOW_SIMILAR_WORDS]: (state, action) => {
            if (action.payload.words && action.payload.words.similar) {
                if (checkSimilar(action.payload.words.similar) && action.payload.keywords && action.payload.words && !action.payload.words.similar.includes(undefined)) {
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
