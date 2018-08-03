import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import InputPanel from "./InputPanel"
import MethodPanel from "./MethodPanel"
import DescriptionPanel from "../containers/DescriptionPanel"
import OutputPanel from "./OutputPanel"
import {Grid} from "react-bootstrap"

/**
 * similarのPropTypes
 * @type {{similar: shim}}
 */
export const propTypesSimilar = {
    similar: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
        cosine: PropTypes.number.isRequired
    }).isRequired).isRequired
}

/**
 * ルート要素
 */
class App extends React.Component {
    static propTypes = {
        ...propTypesSimilar,
        method: PropTypes.string
    }

    render() {
        return (
            <Grid>
                <Header/>
                <DescriptionPanel/>
                <MethodPanel/>
                {
                    (() => {
                        if (this.props.method) {
                            return (<InputPanel/>)
                        }
                    })()
                }
                {
                    (() => {
                        // 分散表現による計算が行われていない場合には表示しない
                        if (0 < this.props.similar.length) {
                            return (<OutputPanel/>)
                        }
                    })()
                }
            </Grid>
        )
    }
}

export default App
