import * as types from "./types"
import {createAction} from "redux-actions"

/**
 * Word2Vecによる計算結果の表示ActionのActionCreator
 * @type {function}
 */
export const showSimilarWords = createAction(types.SHOW_SIMILAR_WORDS, parameter => ({
    words: parameter.words,
    keywords: parameter.keywords
}))
