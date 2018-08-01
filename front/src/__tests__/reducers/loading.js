import loadingReducer from "../../reducers/loading"
import loadingState from "../../test_data/loadingState"
import emptyLoadingAction from "../../test_data/emptyLoadingAction"
import initialLoadingState from "../../test_data/initialLoadingState"
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
import words from "../../test_data/words"
import keywords from "../../test_data/keywords"
import keywords2 from "../../test_data/keywords2"
import words2 from "../../test_data/words2"

const dispatchDoubleLoadingEqual = (store, p, s) => {
    dispatchEqual(store, [
        makeLoadingAction(loadingState),
        makeLoadingAction(p)
    ], s)
}

const dispatchLoadingAndShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        makeLoadingAction(loadingState),
        makeShowSimilarWordsAction(p)
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
        dispatchLoadingEqual(store, emptyLoadingAction, initialLoadingState)
    })

    it("初期状態において、showSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsState, initialLoadingState)
    })

    it("初期状態において、wordsのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, {
            words
        }, initialLoadingState)
    })

    it("初期状態において、sentenceのみを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, {
            keywords
        }, initialLoadingState)
    })

    it("初期状態において、undefinedな要素を含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, {
            keywords,
            words: {
                positive: words.positive,
                negative: words.negative,
                similar: words.similar.concat(undefined)
            }
        }, initialLoadingState)
    })

    it("初期状態において、undefinedな要素を含むwordを含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsIncludeUndefinedWordEqual(store, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、loadingのActionからloadingのStateを生成する", () => {
        dispatchDoubleLoadingEqual(store, initialLoadingState, initialLoadingState)
    })

    it("初期状態以外のStateにおいて、空のloadingのActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleLoadingEqual(store, emptyLoadingAction, loadingState)
    })

    it("初期状態以外のStateにおいて、showSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsState2, loadingState)
    })

    it("初期状態以外のStateにおいて、sentenceのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, {
            keywords: keywords2
        }, loadingState)
    })

    it("初期状態以外のStateにおいて、wordsのみを持ったshowSimilarWordsのActionからshowSimilarWordsのStateを生成する", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, {
            words: words2
        }, loadingState)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, {
            keywords: keywords2,
            words: {
                positive: words2.positive,
                negative: words2.negative,
                similar: words2.similar.concat(undefined)
            }
        }, loadingState)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchLoadingAndShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, loadingState)
    })
})
