import React from "react"
import PanelBody from "../containers/PanelBody"
import Input from "../containers/Input"
import {Panel, Row} from "react-bootstrap"
import {FormattedMessage} from "react-intl"

/**
 * 入力部のパネル
 * @returns {element} 入力部のパネル
 */
const InputPanel = () => (
    <Row>
        <Panel>
            <Panel.Heading>
                <FormattedMessage id="title.input"/>
            </Panel.Heading>
            <PanelBody
                messageId="description.input"
                additionalDescription={
                    <ul>
                        <li>
                            <FormattedMessage id="description.input.supplement"/>
                        </li>
                    </ul>
                }
            >
                <Input/>
            </PanelBody>
        </Panel>
    </Row>
)

export default InputPanel
