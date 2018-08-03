import Methods from "../components/Method"
import {connect} from "react-redux"
import {injectIntl} from "react-intl"

const mapStateToProps = state => ({
    methods: state.setMethods.methods,
    method: state.setMethod.method,
})

/**
 * 手法選択部のContainer
 */
export default injectIntl(connect(mapStateToProps)(Methods))
