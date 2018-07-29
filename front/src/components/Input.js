import React from "react"
import fetch from "node-fetch"
import PropTypes from "prop-types"
import {Button, Form, FormControl, InputGroup} from "react-bootstrap"
import {FormattedMessage, intlShape} from "react-intl"
import {showSimilarWords} from "../actions"
import {propTypesPN} from "./KeyWords"

/**
 * 入力部
 */
class Input extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        keywords: PropTypes.shape(propTypesPN).isRequired,
        intl: intlShape.isRequired
    }

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    /**
     * 入力されたキーワードを元にAPIへの入力用のキーワードを作成する
     * @returns {{positive: Array, negative: Array}} APIへの入力用のキーワード
     */
    makeKeyWords() {
        // キーワード
        const keywords = {
            positive: [],
            negative: []
        }

        // 入力されたキーワードをpositiveな単語とnegativeな単語に分類
        for (const word of this.input.value.replace("　", " ").trim().split(" ")) {
            if (word.startsWith("-")) {
                keywords.negative.push(word.slice(1))
            } else if (word.startsWith("+")) {
                keywords.positive.push(word.slice(1))
            } else {
                keywords.positive.push(word)
            }
        }

        return keywords
    }

    /**
     * onSubmitイベント
     * @param ev イベント
     */
    async onSubmit(ev) {
        // サーバーへのSubmitが行われないようにする
        ev.preventDefault()

        // キーワード
        const keywords = this.makeKeyWords()

        // 以前の入力文とは異なる文章が入力されたとき、Word2Vecによる計算を行い、Word2Vecによる計算結果の表示Actionをdispatch
        if (0 < keywords.positive.length && 0 < keywords.negative.length && keywords !== this.props.keywords) {
            try {
                this.props.dispatch(showSimilarWords({
                    keywords,
                    words: await this.callWord2Vec(keywords)
                }))
            } catch (er) {
                alert(this.props.intl.formatMessage(
                    {
                        id: "errorMessage.predict"
                    },
                    {
                        message: er.message
                    }
                ))
            }
        }
    }

    /**
     * Word2VecのAPIを呼び出す
     * @param query {object} クエリ
     * @returns {Promise<*>} 計算結果
     */
    async callWord2Vec(query) {
        return await (await fetch(
            "/word2vec",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query)
            }
        ).then(res => {
            if (res.ok) {
                return res
            } else {
                throw new Error(res.statusText)
            }
        })).json()
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
            >
                <InputGroup>
                    <FormControl
                        defaultValue="王 -男 女"
                        inputRef={n => {
                            this.input = n
                        }}
                    />
                    <InputGroup.Button>
                        <Button type="submit">
                            <FormattedMessage id="calculate"/>
                        </Button>
                    </InputGroup.Button>
                </InputGroup>
            </Form>
        )
    }
}

export default Input
