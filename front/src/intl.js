import {addLocaleData, IntlProvider} from "react-intl"

/**
 * メッセージリソース
 * @type {object}
 */
export let messages

/**
 * ロケール
 * @type {string}
 */
export let locale = navigator.language

try { // メッセージリソースをセット
    // ロケールの言語部のみ (『en-US』の『en』のみ)
    const language = locale.split(/[-_]/)[0]

    messages = require("./translations/" + language)
    addLocaleData([...require("react-intl/locale-data/" + language)])
} catch (e) { // うまく行かない場合、ロケールを『en』としてメッセージリソースをセット
    locale = "en"
    messages = require("./translations/" + locale)
}

/**
 * react-intlのインスタンス
 * @type {intl|{formatters, now}}
 */
export const intl = new IntlProvider({
    locale,
    messages
}).getChildContext().intl
