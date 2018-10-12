import React from "react"
import PanelCardBody from "../containers/PanelCardBody"
import Method from "../containers/Method"
import {Card, CardHeader} from "reactstrap"
import {FormattedMessage} from "react-intl"

/**
 * 手法選択部のパネル
 * @returns {element} 手法選択部のパネル
 */
const MethodCard = () => (
    <Card className="mt-4">
        <CardHeader>
            <FormattedMessage id="title.method"/>
        </CardHeader>
        <PanelCardBody
            messageId="description.method"
        >
            <Method/>
        </PanelCardBody>
    </Card>
)

export default MethodCard
