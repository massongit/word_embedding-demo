import React from "react"
import PropTypes from "prop-types"
import {Radio} from "react-bootstrap"
import {intlShape} from "react-intl"
import {setMethod} from "../actions"
import general from "../settings/general"

/**
 * 入力部
 */
class Method extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        methods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        method: PropTypes.string.isRequired,
        intl: intlShape.isRequired
    }

    render() {
        return (
            <div>
                {
                    this.props.methods.map((m, i) => {
                        if (m in general["word_embeddings.methods"]) {
                            return (
                                <Radio
                                    key={i}
                                    name="method"
                                    onChange={
                                        () => {
                                            this.props.dispatch(setMethod({
                                                method: m
                                            }))
                                        }
                                    }
                                    inline
                                >
                                    {general["word_embeddings.methods"][m]}
                                </Radio>
                            )
                        } else {
                            return undefined
                        }
                    })
                }
                {
                    (() => {
                        if (this.props.method) {
                            return (
                                <p
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    {
                                        this.props.intl.formatMessage({
                                            id: "description." + this.props.method
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
                                </p>
                            )
                        }
                    })()
                }
            </div>
        )
    }
}

export default Method
