import deepcopy from "deepcopy"
import rootReducer from "../../reducers"
import loadingState from "../../test_data/loadingState"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {createStore} from "redux"
import {loading, showSimilarWords} from "../../actions"
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

export const makeLoadingAction = ps => {
    if (ps instanceof Array) {
        return ps.map(p => (
            loading(p)
        ))
    } else {
        return loading(ps)
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

export const dispatchLoadingEqual = (store, p, s) => {
    dispatchEqual(store, makeLoadingAction(p), s)
}

let store

describe("reducers/index", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, {
            loading: initialLoadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からloadingへStateが遷移した際に、正しいStateを返す", () => {
        dispatchLoadingEqual(store, loadingState, {
            loading: loadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からshowSimilarWordsへStateが遷移した際に、正しいStateを返す", () => {
        dispatchShowSimilarWordsEqual(store, showSimilarWordsState, {
            loading: initialLoadingState,
            showSimilarWords: showSimilarWordsState
        })
    })
})
