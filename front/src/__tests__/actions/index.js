import * as types from "../../actions/types"
import loadingState from "../../test_data/loadingState"
import {showSimilarWordsState} from "../../test_data"
import {makeLoadingAction, makeShowSimilarWordsAction} from "../reducers"

/**
 * 分散表現による計算結果の表示Action
 * @type {{type: string, payload: {keywords: string, words: *[]}}}
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

describe("actions/index/showSimilarWords", () => {
    it("valueからActionを生成する", () => {
        expect(makeShowSimilarWordsAction(showSimilarWordsState)).toEqual(showSimilarWordsAction)
    })

    it("valueから異常値を除外してActionを生成する", () => {
        expect(makeShowSimilarWordsAction({
            ...showSimilarWordsState,
            wrong_test: "wrong!"
        })).toEqual(showSimilarWordsAction)
    })
})

describe("actions/index/loading", () => {
    it("valueからActionを生成する", () => {
        expect(makeLoadingAction(loadingState)).toEqual(loadingAction)
    })

    it("valueから異常値を除外してActionを生成する", () => {
        expect(makeLoadingAction({
            ...loadingState,
            wrong_test: "wrong!"
        })).toEqual(loadingAction)
    })
})
