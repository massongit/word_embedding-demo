import React from "react"
import App from "../../containers/App"
import OutputPanel from "../../components/OutputPanel"
import InputPanel from "../../components/InputPanel"
import rootReducer from "../../reducers"
import {shallow} from "enzyme"
import {createStore} from "redux"
import {doSnapshot, functions} from "./KeyWords"

const functions2 = [undefined, functions]

let store

/**
 * テストの前処理
 */
const beforeProcess = () => (
    shallow(
        <App
            store={store}
        />
    ).dive()
)

describe("containers/PanelBody", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
    })

    it("Componentが正しく配置されている", () => {
        doSnapshot(functions2, store, beforeProcess)
    })

    it("子要素にInputPanelが含まれる", () => {
        for (const f of functions2) {
            if (f) {
                f(store)
            }

            expect(beforeProcess().children().contains(<InputPanel/>)).toBeTruthy()
        }
    })

    it("子要素にOutputPanelが正しく配置される", () => {
        for (const v of [[functions2[0], false], [functions2[1], true], [functions2[2], true]]) {
            if (v[0]) {
                v[0](store)
            }

            expect(beforeProcess().children().contains(<OutputPanel/>)).toEqual(v[1])
        }
    })
})
