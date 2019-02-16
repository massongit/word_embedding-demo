import React from "react"
import fetch from "node-fetch"
import PropTypes from "prop-types"
import {Button, Form, Input, InputGroup, InputGroupAddon} from "reactstrap"
import {FormattedMessage, intlShape} from "react-intl"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {loading, showSimilarWords} from "../actions"
import {propTypesPN} from "./KeyWords"
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

/**
 * 入力部
 */
class InputSentence extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        keywords: PropTypes.shape(propTypesPN).isRequired,
        loading: PropTypes.bool.isRequired,
        prevMethod: PropTypes.string,
        method: PropTypes.string.isRequired,
        intl: intlShape.isRequired
    }

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    /**
     * 分散表現のAPIを呼び出す
     * @param query {object} クエリ
     * @returns {Promise<*>} 計算結果
     */
    static async callWordEmbedding(query) {
        const res = await fetch(
            "wordembedding",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(query)
            }
        )

        if (res.ok) {
            return await res.json()
        } else {
            throw new Error(res.statusText)
        }
    }

    /**
     * 入力されたキーワードをpositiveな単語とnegativeな単語に分類する
     * @returns {{positive: Array, negative: Array}} APIへの入力用のキーワード
     */
    classifyKeyWords() {
        // キーワード
        const keywords = {
            positive: [],
            negative: []
        }

        for (const word of this.input.value.replace("　", " ").trim().split(" ")) {
            if (/^[-ー]/.test(word)) {
                keywords.negative.push(word.slice(1))
            } else if (/^[+＋]/.test(word)) {
                keywords.positive.push(word.slice(1))
            } else if (word) {
                keywords.positive.push(word)
            }
        }

        return keywords
    }

    /**
     * 入力されたキーワードを元にAPIへの入力用のキーワードを作成する
     * @returns {{positive: Array, negative: Array}} APIへの入力用のキーワード
     */
    makeKeyWords() {
        // キーワード
        const keywords = this.classifyKeyWords()

        // キーワードのりストをソート
        for (const k in keywords) {
            keywords[k].sort()
        }

        return keywords
    }

    /**
     * ローディングActionをdispatchする
     * @param isLoading ローディング中かどうか
     */
    loading(isLoading) {
        this.props.dispatch(loading({
            loading: isLoading
        }))
    }

    /**
     * 分散表現による計算を行い、分散表現による計算結果の表示Actionをdispatchする
     * @param keywords キーワード
     */
    async dispatchSimilarWords(keywords) {
        try {
            this.props.dispatch(showSimilarWords({
                keywords,
                method: this.props.method,
                words: await InputSentence.callWordEmbedding({
                    ...keywords,
                    method: this.props.method
                })
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

    /**
     * onSubmitイベント
     * @param ev イベント
     */
    async onSubmit(ev) {
        // サーバーへのSubmitが行われないようにする
        ev.preventDefault()

        // キーワード
        const keywords = this.makeKeyWords()

        // 以前の入力文とは異なる文章が入力されたとき
        if ((0 < keywords.positive.length || 0 < keywords.negative.length) && (this.props.method !== this.props.prevMethod || JSON.stringify(keywords) !== JSON.stringify(this.props.keywords))) {
            // ローディングアイコンを表示する
            this.loading(true)

            // 分散表現による計算を行い、分散表現による計算結果の表示Actionをdispatch
            await this.dispatchSimilarWords(keywords)

            // ローディングアイコンを消す
            this.loading(false)
        }
    }

    /**
     * ローディングアイコンを描画する
     * @returns {*} ローディングアイコン
     */
    renderSpinner() {
        if (this.props.loading) {
            return (
                <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                />
            )
        }
    }

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
            >
                <InputGroup className="mb-3">
                    <Input
                        defaultValue="王 -男 女"
                        innerRef={n => {
                            this.input = n
                        }}
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            type="submit"
                            color="primary"
                            disabled={this.props.loading}
                        >
                            {this.renderSpinner()}
                            <FormattedMessage id="calculate"/>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        )
    }
}

export default InputSentence
