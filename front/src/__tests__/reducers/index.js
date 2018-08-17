import deepcopy from "deepcopy"
import rootReducer from "../../reducers"
import loadingState from "../../test_data/loadingState"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodState from "../../test_data/initialSetMethodState"
import initialSetMethodsState from "../../test_data/initialSetMethodsState"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {createStore} from "redux"
import {loading, setMethod, setMethods, showSimilarWords} from "../../actions"
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

export const dispatchLoadingEqual = (store, p, s) => {
    dispatchEqual(store, loading(p), s)
}

export const dispatchSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, setMethod(p), s)
}

export const dispatchSetMethodsEqual = (store, p, s) => {
    dispatchEqual(store, setMethods(p), s)
}

export const dispatchSetMethodsAndSetMethodEqual = (store, p, s) => {
    dispatchEqual(store, [
        setMethods(setMethodsState),
        setMethod(p)
    ], s)
}

let store

describe("reducers/index", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, {
            setMethod: initialSetMethodState,
            setMethods: initialSetMethodsState,
            loading: initialLoadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からsetMethodsへStateが遷移した際に、正しいStateを返す", () => {
        dispatchSetMethodsEqual(store, setMethodsState, {
            setMethod: initialSetMethodState,
            setMethods: setMethodsState,
            loading: initialLoadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からsetMethods, setMethodとStateが遷移した際に、正しいStateを返す", () => {
        dispatchSetMethodsAndSetMethodEqual(store, setMethodParameter, {
            setMethod: setMethodParameter,
            setMethods: setMethodsState,
            loading: initialLoadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からsetMethods, setMethod, loading, showSimilarWords, loadingとStateが遷移した際に、正しいStateを返す", () => {
        dispatchEqual(store, [
            setMethods(setMethodsState),
            setMethod(setMethodParameter),
            loading(loadingState),
            makeShowSimilarWordsAction(showSimilarWordsState),
            loading(initialLoadingState)
        ], {
            setMethod: setMethodParameter,
            setMethods: setMethodsState,
            loading: initialLoadingState,
            showSimilarWords: showSimilarWordsState
        })
    })
})
