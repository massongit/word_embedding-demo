import loadingReducer from "../../reducers/loading"
import loadingState from "../../test_data/loadingState"
import emptyAction from "../../test_data/emptyAction"
import initialLoadingState from "../../test_data/initialLoadingState"
import {createStore} from "redux"
import {loading} from "../../actions"
import {
    dispatchSetMethodEqual,
    dispatchSomeActionAndShowSimilarWordsEqual,
    loadingAndSetMethodTests,
    loadingAndSetMethodTests2
} from "./index"
import {
    setMethodParameter3,
    showSimilarWordsState2,
    showSimilarWordsStateOnlyKeywords2,
    showSimilarWordsStateOnlyWords2
} from "../../test_data"

const dispatchLoadingAndShowSimilarWordsEqual = (store, p) => {
    dispatchSomeActionAndShowSimilarWordsEqual(store, p, loadingState, loading)
}

let store

describe("reducers/loading/1", () => {
    beforeEach(() => {
        store = createStore(loadingReducer)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, setMethodParameter3, initialLoadingState)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, emptyAction, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsState2)
    })

    it("初期状態以外のStateにおいて、keywordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords2)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords2)
    })
})

describe("reducers/loading/2", () => {
    loadingAndSetMethodTests(loadingReducer, initialLoadingState, "loading", loadingState, loading)
})

describe("reducers/loading/3", () => {
    loadingAndSetMethodTests2(loadingReducer, initialLoadingState, "loading", loadingState, loading, initialLoadingState)
})