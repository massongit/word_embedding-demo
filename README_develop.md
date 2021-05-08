# 開発者向け情報
## 必要なソフトウェア
* [MeCab](http://taku910.github.io/mecab/)
* [Python](https://www.python.org/) 3.8
* [pipenv](https://docs.pipenv.org/) (インストールコマンド: `pip install pipenv`)
* [Node.js](https://nodejs.org/ja/) 14.15
* [Yarn](https://yarnpkg.com/ja/)

## URL一覧
|URL|概要|
|:--:|:--:|
|[http://localhost:5000/](http://localhost:5000/)|トップページ|
|http://localhost:5000/wordembedding/|分散表現による計算用API|

## コマンド
### フロントエンド
#### ビルド
1. 端末を起動します。
1. `cd {このディレクトリ}/front`コマンドを実行します。
1. `yarn build`コマンドを実行します。

#### テスト
1. 端末を起動します。
1. `cd {このディレクトリ}/front`コマンドを実行します。
1. `yarn test`コマンドを実行します。

### サーバーサイド
#### 環境構築
### 共通
1. 端末を起動します。
1. `cd {このディレクトリ}/server/src`コマンドを実行します。
1. `pipenv install --dev`コマンドを実行します。

#### テスト
1. 端末を起動します。
1. `cd {このディレクトリ}/server/src`コマンドを実行します。
1. `pipenv install --dev`コマンドを実行します。
1. `pipenv shell`コマンドを実行します。
1. `pytest`コマンドを実行します。

## フロントエンドのAction・State
* showSimilarWords: 分散表現による計算結果の表示Action
    * Action
        * `action.payload.keywords`: 入力したキーワード (連想配列)
        * `action.payload.words`: 分散表現による計算結果 (分散表現による計算用APIのレスポンス)
        * `action.payload.method`: 手法 (文字列)
    * State
        * `state.showSimilarWords.keywords`: 入力したキーワード (連想配列)
        * `state.showSimilarWords.words`: 分散表現による計算結果 (分散表現による計算用APIのレスポンス)
        * `state.showSimilarWords.method`: 手法 (文字列)
* loading: ローディングAction
    * Action
        * `action.payload.loading`: 分散表現による計算結果を取得中かどうか (boolean)
    * State
        * `state.loading.loading`: 分散表現による計算結果を取得中かどうか (boolean)
* setMethod: 手法セットAction
    * Action
        * `action.payload.method`: 手法 (文字列)
    * State
        * `state.setMethod.method`: 手法 (文字列)
* setMethods: 手法一覧セットAction
    * Action
        * `action.payload.methods`: 手法一覧 (配列)
    * State
        * `state.setMethod.methods`: 手法一覧 (配列)

## 分散表現による計算用API
### 手法一覧の取得
#### リクエスト
空データ (GETメソッド)

#### レスポンス
手法一覧 (JSON形式)

```json
[
    "word2vec",
    "fasttext"
]
```

### 分散表現による計算
#### リクエスト
日本語のpositiveな単語のリストとnegativeな単語のリスト (POSTメソッド, JSON形式)

```json
{
    "method": "fasttext",
    "negative": [
        "男"
    ],
    "positive": [
        "王",
        "女"
    ]
}
```
#### レスポンス
入力された単語に類似する上位10単語の情報 (JSON形式)

```json
{
    "negative": [
        "男"
    ],
    "positive": [
        "王",
        "女"
    ],
    "similar": [
        {
            "cosine": 0.6129051446914673,
            "word": "女王"
        },
        {
            "cosine": 0.5734513998031616,
            "word": "大王"
        },
        {
            "cosine": 0.5623782873153687,
            "word": "王女"
        },
        {
            "cosine": 0.557570219039917,
            "word": "王妃"
        },
        {
            "cosine": 0.536829948425293,
            "word": "デュエルモンスターズビギナーズパック"
        },
        {
            "cosine": 0.5333640575408936,
            "word": "デュエルモンスターズエキスパート"
        },
        {
            "cosine": 0.5321550369262695,
            "word": "戯"
        },
        {
            "cosine": 0.5298371911048889,
            "word": "遊戯"
        },
        {
            "cosine": 0.5250808000564575,
            "word": "デュエルモンスターズ"
        },
        {
            "cosine": 0.525033175945282,
            "word": "王家"
        }
    ]
}
```
