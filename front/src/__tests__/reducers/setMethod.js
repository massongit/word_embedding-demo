import setMethodReducer from "../../reducers/setMethod"
import emptyAction from "../../test_data/emptyAction"
import setMethodParameter from "../../test_data/setMethodParameter"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodState from "../../test_data/initialSetMethodState"
import {createStore} from "redux"
import {loading, setMethod} from "../../actions"
import {
    dispatchEqual,
    dispatchSomeActionAndShowSimilarWordsEqual,
    loadingAndSetMethodTests,
    makeShowSimilarWordsAction
} from "./index"
import {
    setMethodParameter3,
    showSimilarWordsState2,
    showSimilarWordsStateOnlyKeywords2,
    showSimilarWordsStateOnlyWords2
} from "../../test_data"

const dispatchSetMethodAndShowSimilarWordsEqual = (store, p) => {
    dispatchSomeActionAndShowSimilarWordsEqual(store, p, setMethodParameter3, setMethod)
}

const dispatchSetMethodAndLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter3),
        loading(p)
    ], s)
}

let store

describe("reducers/setMethod/1", () => {
    beforeEach(() => {
        store = createStore(setMethodReducer)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchEqual(store, [
            setMethod(setMethodParameter3),
            makeShowSimilarWordsAction(showSimilarWordsState2)
        ], setMethodParameter)
    })

    it("初期状態以外のStateにおいて、keywordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords2)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords2)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndLoadingEqual(store, initialLoadingState, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndLoadingEqual(store, emptyAction, setMethodParameter3)
    })
})

describe("reducers/setMethod/2", () => {
    loadingAndSetMethodTests(setMethodReducer, initialSetMethodState, "setMethod", setMethodParameter3, setMethod, setMethodParameter2)
})