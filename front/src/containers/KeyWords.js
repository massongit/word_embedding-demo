import KeyWords from "../components/KeyWords"
import {connect} from "react-redux"

const mapStateToProps = state => ({
    positive: state.showSimilarWords.words.positive,
    negative: state.showSimilarWords.words.negative
})

/**
 * キーワードのContainer
 */
export default connect(mapStateToProps)(KeyWords)
