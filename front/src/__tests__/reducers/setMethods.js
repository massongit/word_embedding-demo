import setMethodsReducer from "../../reducers/setMethods"
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
import initialSetMethodsState from "../../test_data/initialSetMethodsState"
import {createStore} from "redux"
import {loading, setMethod, setMethods} from "../../actions"
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
    showSimilarWordsStateIncludeUndefinedWord2
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

let setMethodsStore

describe("reducers/setMethods", () => {
    beforeEach(() => {
        setMethodsStore = createStore(setMethodsReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(setMethodsStore, initialSetMethodsState)
    })

    it("初期状態において、setMethodsのActionからsetMethodsのStateを生成する", () => {
        dispatchSetMethodsEqual(setMethodsStore, setMethodsState, setMethodsState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(setMethodsStore, emptyAction, initialSetMethodsState)
    })

    it("初期状態において、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodsStore, showSimilarWordsState, initialSetMethodsState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodsStore, {
            words
        }, initialSetMethodsState)
    })

    it("初期状態において、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodsStore, {
            keywords
        }, initialSetMethodsState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(setMethodsStore, showSimilarWordsStateIncludeUndefinedWord, initialSetMethodsState)
    })

    it("初期状態において、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(setMethodsStore, loadingState, initialSetMethodsState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(setMethodsStore, emptyAction, initialSetMethodsState)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(setMethodsStore, setMethodParameter, initialSetMethodsState)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(setMethodsStore, emptyAction, initialSetMethodsState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(setMethodsStore, showSimilarWordsState2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(setMethodsStore, {
            keywords: keywords2
        }, setMethodsState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(setMethodsStore, {
            words: words2
        }, setMethodsState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(setMethodsStore, showSimilarWordsStateIncludeUndefinedWord2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndShowSimilarWordsEqual(setMethodsStore, showSimilarWordsParameterInvalidKeyWords, setMethodsState)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndLoadingEqual(setMethodsStore, initialLoadingState, setMethodsState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndLoadingEqual(setMethodsStore, emptyAction, setMethodsState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndSetMethodEqual(setMethodsStore, setMethodParameter2, setMethodsState)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsAndSetMethodEqual(setMethodsStore, emptyAction, setMethodsState)
    })
})
