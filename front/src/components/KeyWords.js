import React from "react"
import {FormattedMessage} from "react-intl"
import PropTypes from "prop-types"

/**
 * positiveとnegativeのPropTypes
 * @type {{positive: shim, negative: shim}}
 */
export const propTypesPN = {
    positive: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    negative: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

/**
 * キーワード
 */
class KeyWords extends React.Component {
    static propTypes = propTypesPN

    render() {
        return (
            <p>
                <label htmlFor="keywords">
                    <FormattedMessage id="header.keywords"/>
                </label>
                <p id="keywords">
                    {
                        (() => {
                            let r = []

                            if (this.props.positive) {
                                r = r.concat(this.props.positive.map(w => (
                                    "+" + w
                                )))
                            }

                            if (this.props.negative) {
                                r = r.concat(this.props.negative.map(w => (
                                    "-" + w
                                )))
                            }

                            return r.join(" ")
                        })()
                    }
                </p>
            </p>
        )
    }
}

export default KeyWords
