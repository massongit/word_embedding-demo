import deepcopy from "deepcopy"
import rootReducer from "../../reducers"
import emptyAction from "../../test_data/emptyAction"
import loadingState from "../../test_data/loadingState"
import setMethodsState from "../../test_data/setMethodsState"
import setMethodParameter from "../../test_data/setMethodParameter"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodState from "../../test_data/initialSetMethodState"
import initialSetMethodsState from "../../test_data/initialSetMethodsState"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {createStore} from "redux"
import {loading, setMethod, setMethods, showSimilarWords} from "../../actions"
import {
    setMethodParameter3,
    showSimilarWordsParameterInvalidKeyWords,
    showSimilarWordsState,
    showSimilarWordsStateIncludeUndefinedWord2
} from "../../test_data"

const dispatchDoubleSomeActionEqual = (store, b, c, d, e) => {
    dispatchEqual(store, [
        c(b),
        c(d)
    ], e)
}

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

export const dispatchSomeActionAndShowSimilarWordsEqual = (store, p, s, action) => {
    dispatchEqual(store, [
        action(s),
        makeShowSimilarWordsAction(p)
    ], s)
}

export const loadingAndSetMethodTests = (e, a, name, b, c, d) => {
    beforeEach(() => {
        store = createStore(e)
    })

    it("初期状態を正しく保持している", () => {
        storeEqual(store, a)
    })

    it("初期状態において、" + name + "のActionから" + name + "のStateを生成する", () => {
        dispatchEqual(store, c(b), b)
    })

    it("初期状態において、空の" + name + "のActionが渡されたとき、Stateを変更しない", () => {
        dispatchEqual(store, c(emptyAction), a)
    })
    it("初期状態において、setMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, setMethodsState, a)
    })

    it("初期状態において、空のsetMethodsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSetMethodsEqual(store, emptyAction, a)
    })

    it("初期状態以外のStateにおいて" + name + "のActionから" + name + "のStateを生成する", () => {
        dispatchDoubleSomeActionEqual(store, b, c, d, d)
    })

    it("初期状態以外のStateにおいて、空の" + name + "のActionが渡されたとき、Stateを変更しない", () => {
        dispatchDoubleSomeActionEqual(store, b, c, emptyAction, b)
    })

    it("初期状態以外のStateにおいて、undefinedな要素を含むwordsを持ったshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSomeActionAndShowSimilarWordsEqual(store, showSimilarWordsStateIncludeUndefinedWord2, b, c)
    })

    it("初期状態以外のStateにおいて、sentenceとwords内の単語が一致しないshowSimilarWordsのActionが渡されたとき、Stateを変更しない", () => {
        dispatchSomeActionAndShowSimilarWordsEqual(store, showSimilarWordsParameterInvalidKeyWords, b, c)
    })
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
        dispatchSetMethodsAndSetMethodEqual(store, setMethodParameter3, {
            setMethod: setMethodParameter3,
            setMethods: setMethodsState,
            loading: initialLoadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("初期状態からsetMethods, setMethod, loading, showSimilarWords, loadingとStateが遷移した際に、正しいStateを返す", () => {
        dispatchEqual(store, [
            setMethods(setMethodsState),
            setMethod(setMethodParameter3),
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
