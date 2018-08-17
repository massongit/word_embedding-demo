import setMethodsReducer from "../../reducers/setMethods"
import emptyAction from "../../test_data/emptyAction"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodsState from "../../test_data/initialSetMethodsState"
import {createStore} from "redux"
import {loading, setMethod, setMethods} from "../../actions"
import {dispatchEqual, dispatchSetMethodsEqual, makeShowSimilarWordsAction, storeEqual} from "./index"
import {
    showSimilarWordsParameterInvalidKeyWords,
    showSimilarWordsState2,
    showSimilarWordsStateIncludeUndefinedWord2,
    showSimilarWordsStateOnlyKeywords2,
    showSimilarWordsStateOnlyWords2
} from "../../test_data"

const dispatchSetMethodsAndShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethods(setMethodsState),
        makeShowSimilarWordsAction(p)
    ], s)
}

const dispatchSetMethodsAndLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethods(setMethodsState),
        loading(p)
    ], s)
}

const dispatchSetMethodsAndSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethods(setMethodsState),
        setMethod(p)
    ], s)
}

let store

describe("reducers/setMethods", () => {
    beforeEach(() => {
        store = createStore(setMethodsReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, initialSetMethodsState)
    })

    it("初期状態において、setMethodsのActionからsetMethodsのStateを生成する", () => {
        dispatchSetMethodsEqual(store, setMethodsState, setMethodsState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, emptyAction, initialSetMethodsState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(store, showSimilarWordsState2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、keywordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, setMethodsState)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndLoadingEqual(store, initialLoadingState, setMethodsState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndLoadingEqual(store, emptyAction, setMethodsState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndSetMethodEqual(store, setMethodParameter2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndSetMethodEqual(store, emptyAction, setMethodsState)
    })
})
