import * as types from "./types"
import {createAction} from "redux-actions"

/**
 * 分散表現による計算結果の表示ActionのActionCreator
 * @type {function}
 */
export const showSimilarWords = createAction(types.SHOW_SIMILAR_WORDS, parameter => ({
    words: parameter.words,
    keywords: parameter.keywords,
    method: parameter.method
}))

/**
 * ローディングActionのActionCreator
 * @type {function}
 */
export const loading = createAction(types.LOADING, parameter => ({
    loading: parameter.loading
}))

/**
 * 手法一覧セットActionのActionCreator
 * @type {function}
 */
export const setMethods = createAction(types.SET_METHODS, parameter => ({
    methods: parameter.methods
}))

/**
 * 手法セットActionのActionCreator
 * @type {function}
 */
export const setMethod = createAction(types.SET_METHOD, parameter => ({
    method: parameter.method
}))
