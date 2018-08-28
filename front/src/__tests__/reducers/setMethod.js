import setMethodReducer from "../../reducers/setMethod"
import emptyAction from "../../test_data/emptyAction"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodState from "../../test_data/initialSetMethodState"
import {createStore} from "redux"
import {loading, setMethod} from "../../actions"
import {
    dispatchEqual,
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

const dispatchDoubleSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter3),
        setMethod(p)
    ], s)
}

const dispatchSetMethodAndShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter3),
        makeShowSimilarWordsAction(p)
    ], s)
}

const dispatchSetMethodAndLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter3),
        loading(p)
    ], s)
}

let store

describe("reducers/setMethod", () => {
    beforeEach(() => {
        store = createStore(setMethodReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, initialSetMethodState)
    })

    it("初期状態において、setMethodのActionからsetMethodのStateを生成する", () => {
        dispatchSetMethodEqual(store, setMethodParameter3, setMethodParameter3)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, emptyAction, initialSetMethodState)
    })

    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, setMethodsState, initialSetMethodState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, emptyAction, initialSetMethodState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionからsetMethodのStateを生成する", () => {
        dispatchDoubleSetMethodEqual(store, setMethodParameter2, setMethodParameter2)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleSetMethodEqual(store, emptyAction, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsState2, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、keywordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords2, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords2, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord2, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndLoadingEqual(store, initialLoadingState, setMethodParameter3)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndLoadingEqual(store, emptyAction, setMethodParameter3)
    })
})
