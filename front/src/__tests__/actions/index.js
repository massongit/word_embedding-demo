import * as types from "../../actions/types"
import {showSimilarWordsState} from "../../test_data"
import {makeShowSimilarWordsAction} from "../reducers"

/**
 * 分散表現による計算結果の表示Action
 * @type {{type: string, payload: {keywords: string, words: *[]}}}
 */
const showSimilarWordsAction = {
    type: types.SHOW_SIMILAR_WORDS,
    payload: showSimilarWordsState
}

describe("actions/index", () => {
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
