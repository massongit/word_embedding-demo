import Input from "../components/Input"
import {connect} from "react-redux"
import {injectIntl} from "react-intl"

const mapStateToProps = state => ({
    keywords: state.showSimilarWords.keywords,
    loading: state.loading.loading,
    prevMethod: state.showSimilarWords.method,
    method: state.setMethod.method
})

/**
 * 入力部のContainer
 */
export default injectIntl(connect(mapStateToProps)(Input))
