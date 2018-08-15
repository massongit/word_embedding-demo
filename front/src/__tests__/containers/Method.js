import React from "react"
import Method from "../../containers/Method"
import thunk from "redux-thunk"
import configureMockStore from "redux-mock-store"
import general from "../../configs/general"
import setMethodsState from "../../test_data/setMethodsState"
import initialLoadingState from "../../test_data/initialLoadingState"
import initialSetMethodState from "../../test_data/initialSetMethodState"
import initialShowSimilarWordsState from "../../test_data/initialShowSimilarWordsState"
import {FormGroup, Radio} from "react-bootstrap"
import {loadTranslation, mountWithIntl, shallowWithIntl} from "enzyme-react-intl"

let store

loadTranslation("./src/translations/ja.json")

describe("containers/Method", () => {
    beforeEach(() => {
        store = configureMockStore([thunk])({
            setMethod: initialSetMethodState,
            setMethods: setMethodsState,
            loading: initialLoadingState,
            showSimilarWords: initialShowSimilarWordsState
        })
    })

    it("Componentが正しく配置されている", () => {
        const methodComponent = shallowWithIntl(
            <Method
                store={store}
            />
        ).dive()
        expect(methodComponent).toMatchSnapshot()
    })

    it("FormGroupになっている", () => {
        const methodComponent = mountWithIntl(
            <Method
                store={store}
            />
        )
        expect(methodComponent.contains(FormGroup)).toBeTruthy()
    })

    it("手法一覧セットActionのStateに含まれる全ての手法がRadioとして配置されている", () => {
        const methodComponent = mountWithIntl(
            <Method
                store={store}
            />
        )
        const radio = methodComponent.find(Radio)

        expect(radio).toHaveLength(setMethodsState.methods.length)

        for (const k of setMethodsState.methods) {
            expect(radio.contains(general["word_embeddings.methods"][k])).toBeTruthy()
        }
    })

    it("手法を選択したとき、正常に手法セットActionがdispatchされる", () => {
        const methodComponent = mountWithIntl(
            <Method
                store={store}
            />
        )
        methodComponent.find(Radio).forEach((k, i) => {
            k.props().onChange()
            expect(store.getActions()).toHaveLength(i + 1)
        })
    })
})
