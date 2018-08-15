import showSimilarWordsReducer from "../../reducers/showSimilarWords"
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
    showSimilarWordsStateIncludeUndefinedWord2
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

let showSimilarWordsStore

describe("reducers/showSimilarWords", () => {
    beforeEach(() => {
        showSimilarWordsStore = createStore(showSimilarWordsReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(showSimilarWordsStore, initialShowSimilarWordsState)
    })

    it("初期状態において、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchShowSimilarWordsEqual(showSimilarWordsStore, showSimilarWordsState, showSimilarWordsState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(showSimilarWordsStore, {
            words
        }, initialShowSimilarWordsState)
    })

    it("初期状態において、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(showSimilarWordsStore, {
            keywords
        }, initialShowSimilarWordsState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(showSimilarWordsStore, showSimilarWordsStateIncludeUndefinedWord, initialShowSimilarWordsState)
    })

    it("初期状態において、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(showSimilarWordsStore, loadingState, initialShowSimilarWordsState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(showSimilarWordsStore, emptyAction, initialShowSimilarWordsState)
    })

    it("初期状態において、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(showSimilarWordsStore, setMethodParameter, initialShowSimilarWordsState)
    })

    it("初期状態において、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodEqual(showSimilarWordsStore, emptyAction, initialShowSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(showSimilarWordsStore, showSimilarWordsState2, showSimilarWordsState2)
    })

    it("初期状態において、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(showSimilarWordsStore, showSimilarWordsParameterInvalidKeyWords, initialShowSimilarWordsState)
    })

    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(showSimilarWordsStore, setMethodsState, initialShowSimilarWordsState)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(showSimilarWordsStore, emptyAction, initialShowSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、sentenceのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(showSimilarWordsStore, {
            keywords: keywords2
        }, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(showSimilarWordsStore, {
            words: words2
        }, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleShowSimilarWordsEqual(showSimilarWordsStore, showSimilarWordsStateIncludeUndefinedWord2, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleShowSimilarWordsEqual(showSimilarWordsStore, showSimilarWordsParameterInvalidKeyWords, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndLoadingEqual(showSimilarWordsStore, loadingState, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndLoadingEqual(showSimilarWordsStore, emptyAction, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、setMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndSetMethodEqual(showSimilarWordsStore, setMethodParameter2, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、空のsetMethodのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndSetMethodEqual(showSimilarWordsStore, emptyAction, showSimilarWordsState)
    })
})
