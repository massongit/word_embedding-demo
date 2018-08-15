import setMethodReducer from "../../reducers/setMethod"
import words from "../../test_data/words"
import words2 from "../../test_data/words2"
import keywords from "../../test_data/keywords"
import keywords2 from "../../test_data/keywords2"
import emptyAction from "../../test_data/emptyAction"
import loadingState from "../../test_data/loadingState"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodState from "../../test_data/initialSetMethodState"
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
    setMethodState2,
    showSimilarWordsParameterInvalidKeyWords,
    showSimilarWordsState,
    showSimilarWordsState2,
    showSimilarWordsStateIncludeUndefinedWord,
    showSimilarWordsStateIncludeUndefinedWord2
} from "../../test_data"

const dispatchDoubleSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter),
        setMethod(p)
    ], s)
}

const dispatchSetMethodAndShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter),
        makeShowSimilarWordsAction(p)
    ], s)
}

const dispatchSetMethodAndLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethod(setMethodParameter),
        loading(p)
    ], s)
}

let setMethodStore

describe("reducers/setMethod", () => {
    beforeEach(() => {
        setMethodStore = createStore(setMethodReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(setMethodStore, initialSetMethodState)
    })

    it("初期状態において、setMethodのActionからsetMethodのStateを生成する", () => {
        dispatchSetMethodEqual(setMethodStore, setMethodParameter, setMethodParameter)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(setMethodStore, emptyAction, initialSetMethodState)
    })

    it("初期状態において、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodStore, showSimilarWordsState, initialSetMethodState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodStore, {
            words
        }, initialSetMethodState)
    })

    it("初期状態において、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodStore, {
            keywords
        }, initialSetMethodState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodStore, showSimilarWordsStateIncludeUndefinedWord, initialSetMethodState)
    })

    it("初期状態において、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(setMethodStore, loadingState, initialSetMethodState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(setMethodStore, emptyAction, initialSetMethodState)
    })

    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(setMethodStore, setMethodsState, initialSetMethodState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(setMethodStore, emptyAction, initialSetMethodState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionからsetMethodのStateを生成する", () => {
        dispatchDoubleSetMethodEqual(setMethodStore, setMethodParameter2, setMethodState2)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleSetMethodEqual(setMethodStore, emptyAction, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(setMethodStore, showSimilarWordsState2, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(setMethodStore, {
            keywords: keywords2
        }, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(setMethodStore, {
            words: words2
        }, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(setMethodStore, showSimilarWordsStateIncludeUndefinedWord2, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndShowSimilarWordsEqual(setMethodStore, showSimilarWordsParameterInvalidKeyWords, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndLoadingEqual(setMethodStore, initialLoadingState, setMethodParameter)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodAndLoadingEqual(setMethodStore, emptyAction, setMethodParameter)
    })
})
