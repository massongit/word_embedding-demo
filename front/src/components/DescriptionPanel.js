import React from "react"
import PanelBody from "../containers/PanelBody"
import {Panel, Row} from "react-bootstrap"
import {FormattedMessage} from "react-intl"

/**
 * 概要パネル
 * @returns {element} 概要パネル
 */
const DescriptionPanel = () => (
    <Row>
        <Panel>
            <Panel.Heading>
                <FormattedMessage id="title.description"/>
            </Panel.Heading>
            <PanelBody messageId="description.wordEmbedding"/>
        </Panel>
    </Row>
)

export default DescriptionPanel
