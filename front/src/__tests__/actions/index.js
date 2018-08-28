import * as types from "../../actions/types"
import loadingState from "../../test_data/loadingState"
import setMethodsState from "../../test_data/setMethodsState"
import {loading, setMethod, setMethods} from "../../actions"
import {setMethodParameter3, showSimilarWordsState} from "../../test_data"
import {makeShowSimilarWordsAction} from "../reducers"

/**
 * 分散表現による計算結果の表示Action
 * @type {{type: string, payload: {keywords: {negative: string[], positive: string[]}, words}}}
 */
const showSimilarWordsAction = {
    type: types.SHOW_SIMILAR_WORDS,
    payload: showSimilarWordsState
}

/**
 * ローディングAction
 * @type {{type: string, payload}}
 */
const loadingAction = {
    type: types.LOADING,
    payload: loadingState
}

/**
 * 手法一覧セットAction
 * @type {{type: string, payload}}
 */
const setMethodsAction = {
    type: types.SET_METHODS,
    payload: setMethodsState
}

/**
 * 手法セットAction
 * @type {{type: string, payload}}
 */
const setMethodAction = {
    type: types.SET_METHOD,
    payload: setMethodParameter3
}

describe("actions/index", () => {
    it("valueからActionを生成する", () => {
        for (const v of [
            [makeShowSimilarWordsAction(showSimilarWordsState), showSimilarWordsAction],
            [loading(loadingState), loadingAction],
            [setMethods(setMethodsState), setMethodsAction],
            [setMethod(setMethodParameter3), setMethodAction]
        ]) {
            expect(v[0]).toEqual(v[1])
        }
    })

    it("valueから異常値を除外してActionを生成する", () => {
        for (const v of [
            [makeShowSimilarWordsAction, showSimilarWordsState, showSimilarWordsAction],
            [loading, loadingState, loadingAction],
            [setMethods, setMethodsState, setMethodsAction],
            [setMethod, setMethodParameter3, setMethodAction]
        ]) {
            expect(v[0]({
                ...v[1],
                wrong_test: "wrong!"
            })).toEqual(v[2])
        }
    })
})
