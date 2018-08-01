import showSimilarWordsReducer from "../../reducers/showSimilarWords"
import words from "../../test_data/words"
import words2 from "../../test_data/words2"
import keywords from "../../test_data/keywords"
import keywords2 from "../../test_data/keywords2"
import loadingState from "../../test_data/loadingState"
import emptyLoadingAction from "../../test_data/emptyLoadingAction"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {createStore} from "redux"
import {
    dispatchEqual,
    dispatchLoadingEqual,
    dispatchShowSimilarWordsEqual,
    dispatchShowSimilarWordsIncludeUndefinedWordEqual,
    makeLoadingAction,
    makeShowSimilarWordsAction,
    storeEqual
} from "./index"
import {showSimilarWordsParameterInvalidKeyWords, showSimilarWordsState, showSimilarWordsState2} from "../../test_data"

const dispatchDoubleShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        makeShowSimilarWordsAction(showSimilarWordsState),
        makeShowSimilarWordsAction(p)
    ], s)
}

const dispatchShowSimilarWordsAndLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        makeShowSimilarWordsAction(showSimilarWordsState),
        makeLoadingAction(p)
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
        dispatchShowSimilarWordsEqual(store, {
            words
        }, initialShowSimilarWordsState)
    })

    it("初期状態において、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, {
            keywords
        }, initialShowSimilarWordsState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsIncludeUndefinedWordEqual(store, initialShowSimilarWordsState)
    })

    it("初期状態において、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(store, loadingState, initialShowSimilarWordsState)
    })

    it("初期状態において、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingEqual(store, emptyLoadingAction, initialShowSimilarWordsState)
    })


    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsState2, showSimilarWordsState2)
    })

    it("初期状態において、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, initialShowSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、sentenceのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(store, {
            keywords: keywords2
        }, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchDoubleShowSimilarWordsEqual(store, {
            words: words2
        }, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleShowSimilarWordsEqual(store, {
            keywords: keywords2,
            words: {
                positive: words2.positive,
                negative: words2.negative,
                similar: words2.similar.concat(undefined)
            }
        }, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、loadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndLoadingEqual(store, loadingState, showSimilarWordsState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsAndLoadingEqual(store, emptyLoadingAction, showSimilarWordsState)
    })
})
