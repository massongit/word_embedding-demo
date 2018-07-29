import React from "react"
import PropTypes from "prop-types"
import {Panel} from "react-bootstrap"
import {intlShape} from "react-intl"

/**
 * PanelのBody
 */
class PanelBody extends React.Component {
    static propTypes = {
        messageId: PropTypes.string,
        additionalDescription: PropTypes.node,
        children: PropTypes.node,
        intl: intlShape.isRequired
    }

    render() {
        return (
            <Panel.Body>
                {
                    (() => {
                        if (this.props.messageId) {
                            const description = [
                                this.props.intl.formatMessage({
                                    id: this.props.messageId
                                }),
                                this.props.additionalDescription
                            ]

                            if (this.props.children) {
                                return (
                                    <p>
                                        {description}
                                    </p>
                                )
                            } else {
                                return description
                            }
                        }
                    })()
                }
                {this.props.children}
            </Panel.Body>
        )
    }
}

export default PanelBody
