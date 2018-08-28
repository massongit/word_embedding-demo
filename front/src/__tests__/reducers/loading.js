import loadingReducer from "../../reducers/loading"
import loadingState from "../../test_data/loadingState"
import emptyAction from "../../test_data/emptyAction"
import setMethodsState from "../../test_data/setMethodsState"
import initialLoadingState from "../../test_data/initialLoadingState"
import {createStore} from "redux"
import {loading} from "../../actions"
import {
    dispatchEqual,
    dispatchLoadingEqual,
    dispatchSetMethodEqual,
    dispatchSetMethodsEqual,
    makeShowSimilarWordsAction,
    storeEqual
} from "./index"
import {
    setMethodParameter3,
    showSimilarWordsParameterInvalidKeyWords,
    showSimilarWordsState2,
    showSimilarWordsStateIncludeUndefinedWord2,
    showSimilarWordsStateOnlyKeywords2,
    showSimilarWordsStateOnlyWords2
} from "../../test_data"

const dispatchLoadingAndShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        makeShowSimilarWordsAction(p)
    ], s)
}

const dispatchDoubleLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        loading(p)
    ], s)
}

let store

describe("reducers/loading", () => {
    beforeEach(() => {
        store = createStore(loadingReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, initialLoadingState)
    })

    it("初期状態において、loadingのActionからloadingのStateを生成する", () => {
        dispatchLoadingEqual(store, loadingState, loadingState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(store, emptyAction, initialLoadingState)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, setMethodParameter3, initialLoadingState)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, emptyAction, initialLoadingState)
    })

    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, setMethodsState, initialLoadingState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, emptyAction, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、loadingのActionからloadingのStateを生成する", () => {
        dispatchDoubleLoadingEqual(store, initialLoadingState, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleLoadingEqual(store, emptyAction, loadingState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsState2, loadingState)
    })

    it("初期状態以外のStateにおいて、keywordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords2, loadingState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords2, loadingState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord2, loadingState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, loadingState)
    })
})
