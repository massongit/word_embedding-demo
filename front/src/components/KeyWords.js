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

                            for (const v of [["+", this.props.positive], ["-", this.props.negative]]) {
                                if (v[1]) {
                                    r = r.concat(v[1].map(w => (
                                        v[0] + w
                                    )))
                                }
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
