import React from "react"
import OutputPanel from "../../components/OutputPanel"
import Information from "../../containers/Information"
import rootReducer from "../../reducers/index"
import {shallow} from "enzyme"
import {createStore} from "redux"
import {doSnapshot, functions} from "../containers/KeyWords"

let store

/**
 * テストの前処理
 */
const beforeProcess = () => (
    shallow(
        <OutputPanel
            store={store}
        />
    ).dive()
)

describe("containers/OutputPanel", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
    })

    it("初期状態からStateが遷移した際に、Componentが正しく配置されている", () => {
        doSnapshot([functions], store, beforeProcess)
    })

    it("初期状態からStateが遷移した際に、子要素にInformationが含まれない", () => {
        functions(store)
        expect(beforeProcess().children().contains(<Information/>)).toBeTruthy()
    })
})
