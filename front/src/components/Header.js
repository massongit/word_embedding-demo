import React from "react"
import {Jumbotron, Row} from "react-bootstrap"

/**
 * ヘッダー
 * @returns {element} ヘッダー
 */
const Header = () => (
    <Row>
        <Jumbotron>
            <h1>Word Embedding</h1>
        </Jumbotron>
    </Row>
)

export default Header
