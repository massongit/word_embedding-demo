import words from "./words"
import words2 from "./words2"
import keywords from "./keywords"
import keywords2 from "./keywords2"

export const word = words.similar[0].word

const method = "fasttext"

/**
 * 分散表現による計算結果の表示ActionのState
 * @type {{keywords: {negative: string[], positive: string[]}, words}}
 */
export const showSimilarWordsState2 = {
    keywords: keywords2,
    words: words2,
    method
}

/**
 * 分散表現による計算結果の表示ActionのState
 * @type {{keywords: {negative: string[], positive: string[]}, words}}
 */
export const showSimilarWordsState = {
    keywords,
    words,
    method
}

export const showSimilarWordsParameterInvalidKeyWords = {
    sentence: keywords,
    words: words2
}

export const showSimilarWordsStateIncludeUndefinedWord = {
    keywords,
    words: {
        positive: words.positive,
        negative: words.negative,
        similar: words.similar.concat(undefined)
    }
}

export const showSimilarWordsStateIncludeUndefinedWord2 = {
    keywords: keywords2,
    words: {
        positive: words2.positive,
        negative: words2.negative,
        similar: words2.similar.concat(undefined)
    }
}
