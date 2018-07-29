import React from "react"
import Information from "../../containers/Information"
import rootReducer from "../../reducers"
import {loadTranslation, mountWithIntl, shallowWithIntl} from "enzyme-react-intl"
import {createStore} from "redux"
import {showSimilarWordsState, word, word3} from "../../test_data"
import {dispatchActions, makeShowSimilarWordsAction} from "../reducers"
import words from "../../test_data/words"

/**
 * Storeを作成する
 * @returns {store} Store
 */
const makeStore = () => {
    const store = createStore(rootReducer)
    dispatchActions(store, makeShowSimilarWordsAction(showSimilarWordsState))
    return store
}

let informationComponent

loadTranslation("./src/translations/ja.json")

describe("containers/Information/snapshot", () => {
    it("初期状態からshowSimilarWordsへStateが遷移した際に、Componentが正しく配置されている", () => {
        informationComponent = shallowWithIntl(
            <Information
                store={makeStore()}
            />
        ).dive()
        expect(informationComponent).toMatchSnapshot()
    })
})

describe("containers/Information/other", () => {
    beforeEach(() => {
        informationComponent = mountWithIntl(
            <Information
                store={makeStore()}
            />
        )
    })

    it("初期状態からshowSimilarWordsへStateが遷移した際に、子要素にwordが含まれる", () => {
        expect(informationComponent.contains(word)).toBeTruthy()
    })

    it("初期状態からshowSimilarWordsへStateが遷移した際に、子要素にkeywordsが含まれる", () => {
        expect(informationComponent.contains(words.similar[0].word)).toBeTruthy()
    })
})
