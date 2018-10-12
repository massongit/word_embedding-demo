import React from "react"
import PropTypes from "prop-types"
import Header from "./Header"
import InputCard from "./InputCard"
import MethodCard from "./MethodCard"
import DescriptionCard from "../containers/DescriptionCard"
import OutputCard from "./OutputCard"
import {Container} from "reactstrap"

/**
 * similarのPropTypes
 * @type {{similar: *}}
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
            <Container>
                <Header/>
                <DescriptionCard/>
                <MethodCard/>
                {
                    (() => {
                        if (this.props.method) {
                            return (<InputCard/>)
                        }
                    })()
                }
                {
                    (() => {
                        // 分散表現による計算が行われていない場合には表示しない
                        if (0 < this.props.similar.length) {
                            return (<OutputCard/>)
                        }
                    })()
                }
            </Container>
        )
    }
}

export default App
