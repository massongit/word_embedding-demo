import App from "../components/App"
import {connect} from "react-redux"

const mapStateToProps = state => ({
    similar: state.showSimilarWords.words.similar,
    method: state.setMethod.method
})

/**
 * ルート要素のContainer
 */
export default connect(mapStateToProps)(App)
