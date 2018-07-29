import React from "react"
import PanelBody from "../containers/PanelBody"
import Information from "../containers/Information"
import {Panel, Row} from "react-bootstrap"
import {FormattedMessage} from "react-intl"
import KeyWords from "../containers/KeyWords"

/**
 * 計算結果表示部のパネル
 */
const OutputPanel = () => (
    <Row>
        <Panel>
            <Panel.Heading>
                <FormattedMessage id="title.result"/>
            </Panel.Heading>
            <PanelBody>
                <KeyWords/>
            </PanelBody>
            <Information/>
        </Panel>
    </Row>
)

export default OutputPanel
