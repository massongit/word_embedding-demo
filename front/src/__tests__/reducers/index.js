import deepcopy from "deepcopy"
import rootReducer from "../../reducers"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {createStore} from "redux"
import {showSimilarWords} from "../../actions"
import {showSimilarWordsState} from "../../test_data"

export const dispatchActions = (store, actions) => {
    if (!(actions instanceof Array)) {
        actions = [actions]
    }

    for (const action of actions) {
        store.dispatch(action)
    }
}

export const makeShowSimilarWordsAction = ps => {
    if (ps instanceof Array) {
        return ps.map(p => (
            showSimilarWords(deepcopy(p))
        ))
    } else {
        return showSimilarWords(deepcopy(ps))
    }
}

export const storeEqual = (store, s) => {
    expect(store.getState()).toEqual(s)
}

export const dispatchEqual = (store, p, s) => {
    dispatchActions(store, p)
    storeEqual(store, s)
}

export const dispatchShowSimilarWordsEqual = (store, p, s) => {
    dispatchEqual(store, makeShowSimilarWordsAction(p), s)
}

let store

describe("reducers/index", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, {
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からshowSimilarWordsへStateが遷移した際に、正しいStateを返す", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsState, {
            showSimilarWords: showSimilarWordsState
        })
    })
})
