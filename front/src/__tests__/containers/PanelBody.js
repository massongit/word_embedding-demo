import React from "react"
import PanelBody from "../../containers/PanelBody"
import Input from "../../containers/Input"
import rootReducer from "../../reducers/index"
import {Panel} from "react-bootstrap"
import {loadTranslation, mountWithIntl, shallowWithIntl} from "enzyme-react-intl"
import {createStore} from "redux"

loadTranslation("./src/translations/ja.json")

describe("containers/PanelBody", () => {
    it("Componentが正しく配置されている", () => {
        const panelBodyComponent = shallowWithIntl(
            <PanelBody messageId="description.input">
                <Input/>
            </PanelBody>
        ).dive()
        expect(panelBodyComponent).toMatchSnapshot()
    })

    it("Panel.Bodyの直下に子要素が入っている", () => {
        const panelBodyComponent = mountWithIntl(
            <PanelBody messageId="description.input">
                <Input
                    store={createStore(rootReducer)}
                />
            </PanelBody>
        )
        expect(panelBodyComponent.find(Panel.Body).children().contains(Input)).toBeTruthy()
    })
})
