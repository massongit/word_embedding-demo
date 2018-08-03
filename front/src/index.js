import React from "react"
import App from "./containers/App"
import fetch from "node-fetch"
import rootReducer from "./reducers"
import {Provider} from "react-redux"
import {IntlProvider} from "react-intl"
import {intl, locale, messages} from "./intl"
import {render} from "react-dom"
import {createStore} from "redux"
import {setMethods} from "./actions"
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

const store = createStore(rootReducer);

(async () => {
    store.dispatch(setMethods({
        methods: await (await fetch(
            "wordembedding",
            {
                method: "GET"
            }
        ).then(res => {
            if (res.ok) {
                return res
            } else {
                throw new Error(res.statusText)
            }
        })).json()
    }))
})()

// ルート要素を表示
render((
    <IntlProvider
        locale={locale}
        messages={messages}
    >
        <Provider
            store={store}
        >
            <App/>
        </Provider>
    </IntlProvider>
), document.getElementById("root"))
