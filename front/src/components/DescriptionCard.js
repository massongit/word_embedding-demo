import React from "react"
import PanelCardBody from "../containers/PanelCardBody"
import {Card, CardHeader} from "reactstrap"
import {FormattedMessage, intlShape} from "react-intl"

/**
 * 概要パネル
 */
class DescriptionCard extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    }

    render() {
        return (
            <Card className="mt-4">
                <CardHeader>
                    <FormattedMessage id="title.description"/>
                </CardHeader>
                <PanelCardBody>
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
                </PanelCardBody>
            </Card>
        )
    }
}

export default DescriptionCard
