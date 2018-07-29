import React from "react"
import App from "./containers/App"
import rootReducer from "./reducers"
import {Provider} from "react-redux"
import {IntlProvider} from "react-intl"
import {intl, locale, messages} from "./intl"
import {render} from "react-dom"
import {createStore} from "redux"
import "bootstrap/dist/css/bootstrap.css"

// 例外をalertとして表示
process.on("uncaughtException", er => {
    alert(intl.formatMessage(
        {
            id: "errorMessage.default"
        },
        {
            message: er.message
        }
    ))
})

// ルート要素を表示
render((
    <IntlProvider
        locale={locale}
        messages={messages}
    >
        <Provider
            store={createStore(rootReducer)}
        >
            <App/>
        </Provider>
    </IntlProvider>
), document.getElementById("root"))
