import showSimilarWordsReducer from "../../reducers/showSimilarWords"
import loadingState from "../../test_data/loadingState"
import emptyAction from "../../test_data/emptyAction"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import setMethodParameter2 from "../../test_data/setMethodParameter2"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
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

const dispatchDoubleShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        makeShowSimilarWordsAction(showSimilarWordsState),
        loading(initialLoadingState),
        loading(loadingState),
        makeShowSimilarWordsAction(p),
        loading(initialLoadingState)
    ], s)
}

const dispatchShowSimilarWordsAndLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        makeShowSimilarWordsAction(showSimilarWordsState),
        loading(p)
    ], s)
}

const dispatchShowSimilarWordsAndSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, [
        loading(loadingState),
        makeShowSimilarWordsAction(showSimilarWordsState),
        loading(initialLoadingState),
        setMethod(p)
    ], s)
}

let store

describe("reducers/showSimilarWords", () => {
    beforeEach(() => {
        store = createStore(showSimilarWordsReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, initialShowSimilarWordsState)
    })

    it("初期状態において、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsState, showSimilarWordsState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords, initialShowSimilarWordsState)
    })

    it("初期状態において、keywordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords, initialShowSimilarWordsState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord, initialShowSimilarWordsState)
    })

    it("初期状態において、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(store, loadingState, initialShowSimilarWordsState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(store, emptyAction, initialShowSimilarWordsState)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, setMethodParameter, initialShowSimilarWordsState)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(store, emptyAction, initialShowSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsState2, showSimilarWordsState2)
    })

    it("初期状態において、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, initialShowSimilarWordsState)
    })

    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, setMethodsState, initialShowSimilarWordsState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, emptyAction, initialShowSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、keywordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsStateOnlyKeywords2, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsStateOnlyWords2, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord2, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndLoadingEqual(store, loadingState, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndLoadingEqual(store, emptyAction, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndSetMethodEqual(store, setMethodParameter2, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndSetMethodEqual(store, emptyAction, showSimilarWordsState)
    })
})
