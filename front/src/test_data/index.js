import words from "./words"
import words2 from "./words2"

export const word = words.similar[0].word

export const keywords2 = {
    "negative": [
        "日本"
    ],
    "positive": [
        "東京",
        "アメリカ"
    ]
}

/**
 * Word2Vecによる計算結果の表示ActionのState
 * @type {{keywords: {negative: string[], positive: string[]}, words}}
 */
export const showSimilarWordsState2 = {
    keywords: keywords2,
    words: words2
}

export const keywords = {
    "negative": [
        "男"
    ],
    "positive": [
        "王",
        "女"
    ]
}

/**
 * Word2Vecによる計算結果の表示ActionのState
 * @type {{keywords: {negative: string[], positive: string[]}, words}}
 */
export const showSimilarWordsState = {
    keywords,
    words
}
