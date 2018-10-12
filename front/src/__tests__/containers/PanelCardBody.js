import React from "react"
import PanelCardBody from "../../containers/PanelCardBody"
import InputSentence from "../../containers/InputSentence"
import rootReducer from "../../reducers/index"
import {CardBody} from "reactstrap"
import {loadTranslation, mountWithIntl, shallowWithIntl} from "enzyme-react-intl"
import {createStore} from "redux"
import {functions2} from "./App"

loadTranslation("./src/translations/ja.json")

let store

describe("containers/PanelCardBody", () => {
    beforeEach(() => {
        store = createStore(rootReducer)
        for (const f of functions2) {
            if (f) {
                f(store)
            }
        }
    })

    it("Componentが正しく配置されている", () => {
        const panelCardBodyComponent = shallowWithIntl(
            <PanelCardBody messageId="description.input">
                <InputSentence
                    store={store}
                />
            </PanelCardBody>
        ).dive()
        expect(panelCardBodyComponent).toMatchSnapshot()
    })

    it("CardBodyの直下に子要素が入っている", () => {
        const panelCardBodyComponent = mountWithIntl(
            <PanelCardBody messageId="description.input">
                <InputSentence
                    store={store}
                />
            </PanelCardBody>
        )
        expect(panelCardBodyComponent.find(CardBody).children().contains(InputSentence)).toBeTruthy()
    })
})
