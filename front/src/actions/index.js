import * as types from "./types"
import {createAction} from "redux-actions"

/**
 * 分散表現による計算結果の表示ActionのActionCreator
 * @type {function}
 */
export const showSimilarWords = createAction(types.SHOW_SIMILAR_WORDS, parameter => ({
    words: parameter.words,
    keywords: parameter.keywords
}))

/**
 * ローディングActionのActionCreator
 * @type {function}
 */
export const loading = createAction(types.LOADING, parameter => ({
    loading: parameter.loading
}))
