import words from "./words"
import words2 from "./words2"
import keywords from "./keywords"
import keywords2 from "./keywords2"

export const word = words.similar[0].word

/**
 * 分散表現による計算結果の表示ActionのState
 * @type {{keywords: {negative: string[], positive: string[]}, words}}
 */
export const showSimilarWordsState2 = {
    keywords: keywords2,
    words: words2
}

/**
 * 分散表現による計算結果の表示ActionのState
 * @type {{keywords: {negative: string[], positive: string[]}, words}}
 */
export const showSimilarWordsState = {
    keywords,
    words
}
