import React from "react"
import PanelCardBody from "../containers/PanelCardBody"
import Information from "../containers/Information"
import {Card, CardHeader} from "reactstrap"
import {FormattedMessage} from "react-intl"
import KeyWords from "../containers/KeyWords"

/**
 * 計算結果表示部のパネル
 */
const OutputCard = () => (
    <Card className="mt-4">
        <CardHeader>
            <FormattedMessage id="title.result"/>
        </CardHeader>
        <PanelCardBody>
            <KeyWords/>
        </PanelCardBody>
        <Information/>
    </Card>
)

export default OutputCard
