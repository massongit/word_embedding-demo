import React from "react"
import KeyWords from "../../containers/KeyWords"
import rootReducer from "../../reducers"
import {shallow} from "enzyme"
import {createStore} from "redux"
import {showSimilarWordsState} from "../../test_data"
import {dispatchActions, makeShowSimilarWordsAction} from "../reducers"

export const functions = store => {
    dispatchActions(store, makeShowSimilarWordsAction(showSimilarWordsState))
}

export const doSnapshot = (fs, store, g) => {
    for (const f of fs) {
        if (f) {
            f(store)
        }

        expect(g()).toMatchSnapshot()
    }
}

let store

/**
 * テストの前処理
 */
const beforeProcess = () => (
    shallow(
        <KeyWords
            store={store}
        />
    ).dive()
)

describe("containers/KeyWords", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
    })


    it("初期状態からStateが遷移した際に、Componentが正しく配置されている", () => {
        doSnapshot([functions], store, beforeProcess)
    })
})
