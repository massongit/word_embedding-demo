import React from "react"
import {Table} from "reactstrap"
import {FormattedNumber, intlShape} from "react-intl"
import {propTypesSimilar} from "./App"

/**
 * 計算結果表示部
 */
class Information extends React.Component {
    static propTypes = {
        ...propTypesSimilar,
        intl: intlShape.isRequired
    }

    /**
     * ヘッダー部を描画する
     * @returns {node} ヘッダー部
     */
    renderHeader() {
        return (
            <tr>
                {
                    [
                        "header.candidate",
                        "header.word",
                        "header.cosine"
                    ].map((id, i) => ( // 見出しを上下左右中央揃えで表示
                        <th
                            key={i}
                            className="text-center"
                            style={{
                                "verticalAlign": "middle"
                            }}
                        >
                            {
                                this.props.intl.formatMessage({
                                    id
                                })
                            }
                        </th>
                    ))
                }
            </tr>
        )
    }

    /**
     * コンテンツ部を描画する
     * @returns {any[]} コンテンツ部
     */
    renderContents() {
        return this.props.similar.map((w, j) => (
            <tr
                key={j}
            >
                {
                    [
                        this.props.intl.formatNumber(j + 1),
                        w.word
                    ].map((data, i) => (
                        <td
                            className="text-center"
                            key={i}
                        >
                            {data}
                        </td>
                    ))
                }
                <td className="text-right">
                    <FormattedNumber
                        value={w.cosine}
                    />
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <Table striped bordered hover size="sm" className="mb-0">
                <thead>
                    {this.renderHeader()}
                </thead>
                <tbody>
                    {this.renderContents()}
                </tbody>
            </Table>
        )
    }
}

export default Information
