import React from "react"
import PanelCardBody from "../containers/PanelCardBody"
import InputSentence from "../containers/InputSentence"
import {Card, CardHeader} from "reactstrap"
import {FormattedMessage} from "react-intl"

/**
 * 入力部のパネル
 * @returns {element} 入力部のパネル
 */
const InputCard = () => (
    <Card className="mt-4">
        <CardHeader>
            <FormattedMessage id="title.input"/>
        </CardHeader>
        <PanelCardBody
            messageId="description.input"
            additionalDescription={
                <ul>
                    <li>
                        <FormattedMessage id="description.input.supplement.1"/>
                    </li>
                    <li>
                        <FormattedMessage id="description.input.supplement.2"/>
                    </li>
                </ul>
            }
        >
            <InputSentence/>
        </PanelCardBody>
    </Card>
)

export default InputCard
