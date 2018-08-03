import React from "react"
import PanelBody from "../containers/PanelBody"
import {Panel, Row} from "react-bootstrap"
import {FormattedMessage, intlShape} from "react-intl"

/**
 * 概要パネル
 */
class DescriptionPanel extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    }

    render() {
        return (
            <Row>
                <Panel>
                    <Panel.Heading>
                        <FormattedMessage id="title.description"/>
                    </Panel.Heading>
                    <PanelBody>
                        {
                            this.props.intl.formatMessage({
                                id: "description.wordEmbedding"
                            }).split("\n").map((e, i) => (
                                <p
                                    key={i}
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {e}
                                </p>
                            ))
                        }
                    </PanelBody>
                </Panel>
            </Row>
        )
    }
}

export default DescriptionPanel
