import React from "react"
import PropTypes from "prop-types"
import general from "../configs/general"
import {FormGroup, Radio} from "react-bootstrap"
import {intlShape} from "react-intl"
import {setMethod} from "../actions"

/**
 * 手法選択部
 */
class Method extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        methods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        method: PropTypes.string,
        intl: intlShape.isRequired
    }

    /**
     * ラジオボタンを描画する
     * @returns {*} ラジオボタン
     */
    renderRadios() {
        return this.props.methods.map((m, i) => {
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

    /**
     * 手法の説明を描画する
     * @returns {*} 手法の説明
     */
    renderDescription() {
        if (this.props.method) {
            return this.props.intl.formatMessage({
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
    }

    render() {
        return (
            <div>
                <FormGroup>
                    {this.renderRadios()}
                </FormGroup>
                {this.renderDescription()}
            </div>
        )
    }
}

export default Method
