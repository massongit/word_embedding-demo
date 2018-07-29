import Input from "../components/Input"
import {connect} from "react-redux"
import {injectIntl} from "react-intl"

const mapStateToProps = state => ({
    keywords: state.showSimilarWords.keywords
})

/**
 * 入力部のContainer
 */
export default injectIntl(connect(mapStateToProps)(Input))
