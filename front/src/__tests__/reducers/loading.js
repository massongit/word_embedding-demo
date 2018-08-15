import loadingReducer from "../../reducers/loading"
import words from "../../test_data/words"
import words2 from "../../test_data/words2"
import keywords from "../../test_data/keywords"
import keywords2 from "../../test_data/keywords2"
import loadingState from "../../test_data/loadingState"
import emptyAction from "../../test_data/emptyAction"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import {createStore} from "redux"
import {loading, setMethod} from "../../actions"
import {
    dispatchDoubleLoadingEqual,
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

let loadingStore

describe("reducers/loading", () => {
    beforeEach(() => {
        loadingStore = createStore(loadingReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(loadingStore, initialLoadingState)
    })

    it("初期状態において、loadingのActionからloadingのStateを生成する", () => {
        dispatchLoadingEqual(loadingStore, loadingState, loadingState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(loadingStore, emptyAction, initialLoadingState)
    })

    it("初期状態において、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(loadingStore, showSimilarWordsState, initialLoadingState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(loadingStore, {
            words
        }, initialLoadingState)
    })

    it("初期状態において、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(loadingStore, {
            keywords
        }, initialLoadingState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(loadingStore, showSimilarWordsStateIncludeUndefinedWord, initialLoadingState)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(loadingStore, setMethodParameter, initialLoadingState)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(loadingStore, emptyAction, initialLoadingState)
    })

    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(loadingStore, setMethodsState, initialLoadingState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(loadingStore, emptyAction, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、loadingのActionからloadingのStateを生成する", () => {
        dispatchDoubleLoadingEqual(loadingStore, initialLoadingState, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleLoadingEqual(loadingStore, emptyAction, loadingState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(loadingStore, showSimilarWordsState2, loadingState)
    })

    it("初期状態以外のStateにおいて、sentenceのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(loadingStore, {
            keywords: keywords2
        }, loadingState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(loadingStore, {
            words: words2
        }, loadingState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndShowSimilarWordsEqual(loadingStore, showSimilarWordsStateIncludeUndefinedWord2, loadingState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndShowSimilarWordsEqual(loadingStore, showSimilarWordsParameterInvalidKeyWords, loadingState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndSetMethodEqual(loadingStore, setMethodParameter2, loadingState)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndSetMethodEqual(loadingStore, emptyAction, loadingState)
    })
})
