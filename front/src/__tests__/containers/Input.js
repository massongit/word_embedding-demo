import React from "react"
import Input from "../../containers/Input"
import thunk from "redux-thunk"
import fetch from "node-fetch"
import configureMockStore from "redux-mock-store"
import words from "../../test_data/words"
import words2 from "../../test_data/words2"
import setMethodsState from "../../test_data/setMethodsState"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import * as types from "../../actions/types"
import {Form, FormControl} from "react-bootstrap"
import {loadTranslation, mountWithIntl, shallowWithIntl} from "enzyme-react-intl"
import {setMethodParameter3, showSimilarWordsState, showSimilarWordsState2} from "../../test_data"
import {makeShowSimilarWordsAction} from "../reducers"

export const eventMock = {
    preventDefault: jest.fn()
}

const createMockStore = (s) => (
    configureMockStore([thunk])({
        setMethod: setMethodParameter3,
        setMethods: setMethodsState,
        loading: initialLoadingState,
        showSimilarWords: s
    })
)

const createRootState = () => (
    createMockStore(initialShowSimilarWordsState)
)

const createRootStateAfterShowSimilarWords = () => (
    createMockStore(showSimilarWordsState)
)

const checkContainShowSimilarWords = (store, inputComponent, w) => {
    let isExpect = false
    const action_ = makeShowSimilarWordsAction(w)
    for (const action of store.getActions()) {
        if (action.type === types.SHOW_SIMILAR_WORDS) {
            expect(action).toEqual(action_)
            isExpect = true
        }
    }
    expect(isExpect).toBeTruthy()
}

const keywords_input = "-男 王 女"

loadTranslation("./src/translations/ja.json")

describe("containers/Input", () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it("Componentが正しく配置されている", () => {
        const store = createRootState()
        const inputComponent = shallowWithIntl(
            <Input
                store={store}
            />
        ).dive()
        expect(inputComponent).toMatchSnapshot()
    })

    it("Formになっている", () => {
        const store = createRootState()
        const inputComponent = mountWithIntl(
            <Input
                store={store}
            />
        )
        expect(inputComponent.contains(Form)).toBeTruthy()
    })

    it("onSubmitイベントが呼び出されたとき、サーバーへのSubmitが行われない", async () => {
        const store = createRootState()
        const inputComponent = mountWithIntl(
            <Input
                store={store}
            />
        )
        await inputComponent.find(Form).props().onSubmit(eventMock)
        expect(eventMock.preventDefault.mock.calls).toHaveLength(1)
    })

    it("入力文が空の状態で、onSubmitイベントが呼び出されたとき、fetchとshowSimilarWordsのdispatchが行われない", async () => {
        const store = createRootState()
        const inputComponent = mountWithIntl(
            <Input
                store={store}
            />
        )
        inputComponent.find(FormControl).children().instance().value = ""
        await inputComponent.find(Form).props().onSubmit(eventMock)
        expect(fetch.mock.calls).toHaveLength(0)
        for (const action of store.getActions()) {
            expect(action.type).not.toEqual([types.SHOW_SIMILAR_WORDS])
        }
    })

    it("入力文が入力された状態で、onSubmitイベントが呼び出されたとき、fetchとshowSimilarWordsのdispatchが正常に行われる", async () => {
        const store = createRootState()
        const inputComponent = mountWithIntl(
            <Input
                store={store}
            />
        )
        inputComponent.find(FormControl).children().instance().value = keywords_input
        fetch.mockResponse(JSON.stringify(words))
        await inputComponent.find(Form).props().onSubmit(eventMock)
        expect(fetch.mock.calls).toHaveLength(1)
        checkContainShowSimilarWords(store, inputComponent, showSimilarWordsState)
    })

    it("前回と同じ入力内容でonSubmitイベントを呼び出したとき、fetchやshowSimilarWordsのdispatchが行われない", async () => {
        const store = createRootStateAfterShowSimilarWords()
        const inputComponent = mountWithIntl(
            <Input
                store={store}
            />
        )
        inputComponent.find(FormControl).children().instance().value = keywords_input
        await inputComponent.find(Form).props().onSubmit(eventMock)
        expect(fetch.mock.calls).toHaveLength(0)
        for (const action of store.getActions()) {
            expect(action.type).not.toEqual(types.SHOW_SIMILAR_WORDS)
        }
    })

    it("前回とは違う入力内容でonSubmitイベントを呼び出したとき、fetchやshowSimilarWordsのdispatchが正常に行われる", async () => {
        const store = createRootStateAfterShowSimilarWords()
        const inputComponent = mountWithIntl(
            <Input
                store={store}
            />
        )
        inputComponent.find(FormControl).children().instance().value = "-日本 東京 アメリカ"
        fetch.mockResponse(JSON.stringify(words2))
        await inputComponent.find(Form).props().onSubmit(eventMock)
        expect(fetch.mock.calls).toHaveLength(1)
        checkContainShowSimilarWords(store, inputComponent, showSimilarWordsState2)
    })
})
