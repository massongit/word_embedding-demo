import loadingReducer from "../../reducers/loading"
import loadingState from "../../test_data/loadingState"
import emptyAction from "../../test_data/emptyAction"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import {createStore} from "redux"
import {loading, setMethod} from "../../actions"
import {
    dispatchEqual,
    dispatchLoadingEqual,
    dispatchSetMethodEqual,
    dispatchSetMethodsEqual,
    dispatchShowSimilarWordsEqual,
    makeShowSimilarWordsAction,
    storeEqual
} from "./index"
import {
    showSimilarWordsParameterInvalidKeyWords,
    showSimilarWordsState,
    showSimilarWordsState2,
    showSimilarWordsStateIncludeUndefinedWord,
    showSimilarWordsStateIncludeUndefinedWord2,
    showSimilarWordsStateOnlyKeywords,
    showSimilarWordsStateOnlyKeywords2,
    showSimilarWordsStateOnlyWords,
    showSimilarWordsStateOnlyWords2
} from "../../test_data"

const dispatchLoadingAndShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        makeShowSimilarWordsAction(p)
    ], s)
}

const dispatchLoadingAndSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        setMethod(p)
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

    it("初期状態において、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsState, initialLoadingState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords, initialLoadingState)
    })

    it("初期状態において、keywordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords, initialLoadingState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord, initialLoadingState)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, setMethodParameter, initialLoadingState)
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

    it("初期状態以外のStateにおいて、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndSetMethodEqual(store, setMethodParameter2, loadingState)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndSetMethodEqual(store, emptyAction, loadingState)
    })
})
