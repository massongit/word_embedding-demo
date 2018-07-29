import showSimilarWordsReducer from "../../reducers/showSimilarWords"
import words from "../../test_data/words"
import words2 from "../../test_data/words2"
import keywords from "../../test_data/keywords"
import keywords2 from "../../test_data/keywords2"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {createStore} from "redux"
import {dispatchEqual, dispatchShowSimilarWordsEqual, makeShowSimilarWordsAction, storeEqual} from "./index"
import {showSimilarWordsState, showSimilarWordsState2, word} from "../../test_data"

const showSimilarWordsParameterInvalidKeyWords = {
    sentence: keywords,
    words: words2
}

const dispatchDoubleShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, [
        makeShowSimilarWordsAction(showSimilarWordsState),
        makeShowSimilarWordsAction(p)
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
        dispatchShowSimilarWordsEqual(store, {
            keywords,
            words: {
                positive: words.positive,
                negative: words.negative,
                similar: words.similar.concat(undefined)
            }
        }, initialShowSimilarWordsState)
    })

    it("初期状態において、undefinedな要素を含むwordを含むwordsを持ったshowSimilarWordsActionが渡されたとき、Stateを変更しない", () => {
        dispatchShowSimilarWordsEqual(store, {
            keywords,
            words: {
                positive: words.positive,
                negative: words.negative,
                similar: words.similar.concat({
                    word
                })
            }
        }, initialShowSimilarWordsState)
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
})
