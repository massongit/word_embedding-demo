# coding=utf-8

"""
サーバー
"""

import collections
import datetime
import json
import logging
import os
import pathlib
import pyfasttext

import flask
import flask_api.status
import flask_classy
import gensim
import natto

import config

# 作者
__author__ = 'Masaya Suzuki'

# バージョン
__version__ = '0.0.2'

# 設定
conf = config.Config(pathlib.Path.cwd().parent / 'configs')

app = flask.Flask(__name__, conf.get('general', 'front', 'url'), conf.get('general', 'front', 'dir path'))


def output_http_data(headers, body):
    """
    HTTPデータ (リクエストやレスポンス) の内容を出力する
    :param headers: HTTPデータ (リクエストやレスポンス) のheader
    :param body: HTTPデータ (リクエストやレスポンス) のbody
    """
    app.logger.debug('[Header]')

    for header in headers:
        app.logger.debug('{}: {}'.format(*header))

    app.logger.debug(os.linesep.join(['[Data]',
                                      json.dumps(body, indent=4, ensure_ascii=False, sort_keys=True)]))


@app.route('/')
def index():
    """
    トップページを表示
    :return: トップページ
    """
    app.logger.debug('/ called!')
    return app.send_static_file('index.html')


class OrderedCounter(collections.Counter, collections.OrderedDict):
    """
    入れた順序を保存するCounter
    """
    pass


class WordEmbeddingView(flask_classy.FlaskView):
    """
    分散表現による計算結果を返すView
    """

    trailing_slash = False

    def __init__(self):
        self.word_embeddings = collections.OrderedDict()

        # Word2Vecのモデルを使用するとき
        if conf.get('general', 'word2vec', 'model path') and conf.get('general', 'word2vec', 'mecab dir path'):
            # Word2Vecのモデル
            self.word_embeddings['word2vec'] = gensim.models.KeyedVectors.load_word2vec_format(
                conf.get('general', 'word2vec', 'model path'),
                binary=bool(conf.get('general', 'word2vec', 'is binary')))

            # MeCab
            self.mecab = natto.MeCab({
                'output_format_type': 'wakati',
                'dicdir': conf.get('general', 'word2vec', 'mecab dir path')
            })

        # FastTextのモデルを使用するとき
        if conf.get('general', 'fasttext', 'model path'):
            # FastTextのモデル
            self.word_embeddings['fasttext'] = pyfasttext.FastText(conf.get('general', 'fasttext', 'model path'))

        self.pn = {
            'positive': 1,
            'negative': -1
        }

    def _wakati_keywords(self, method, keywords):
        """
        キーワードの単語分割を行う
        :param method: 手法
        :param keywords: キーワードのりスト
        :return: 単語分割されたキーワードのりスト
        """
        words = list()

        for keyword in keywords:
            if method == 'fasttext':  # FastTextのモデルを使用するとき
                words.append(keyword)
            elif method == 'word2vec':  # Word2Vecのモデルを使用するとき
                words += self.mecab.parse(keyword).split()

        return words

    def _count_keywords(self, request):
        """
        単語をカウントする
        (positiveな単語は+1、negativeな単語は-1する)
        :param request: リクエスト
        :return: 単語のカウント結果
        """
        # 単語カウンター
        # (positiveな単語は+1、negativeな単語は-1する)
        # counter['positive']: positiveな単語のカウンター
        # counter['negative']: negativeな単語のカウンター
        counter = dict()

        for k in self.pn.keys():
            if k in request:
                words = self._wakati_keywords(request['method'], request[k])
            else:
                words = list()

            counter[k] = OrderedCounter(words)

        counter['positive'].subtract(counter['negative'])
        return counter['positive']

    def _make_responce(self, request):
        """
        レスポンスを生成する
        :param request: リクエスト
        :return: レスポンス
        """
        # 単語カウンター
        # (positiveな単語は+1、negativeな単語は-1する)
        counter = self._count_keywords(request)

        # レスポンス
        responce = {k: [w for w, n in counter.items() for _ in range(pm * n)]
                    for k, pm in self.pn.items()}

        # 類似単語を導出
        responce['similar'] = [{
            'word': w,
            'cosine': c
        } for w, c in self.word_embeddings[request['method']].most_similar(**responce)]

        return responce

    def post(self):
        try:
            app.logger.debug('POST /wordembedding/ called!')

            # リクエスト
            request = flask.request.get_json()

            app.logger.debug('<Request>')
            output_http_data(flask.request.headers, request)

            response = flask.jsonify(self._make_responce(request))
            response.status_code = flask_api.status.HTTP_200_OK
            response.headers['Access-Control-Allow-Origin'] = '*'

            app.logger.debug('<Response>')
            app.logger.debug('[Status]')
            app.logger.debug(response.status)
            output_http_data(response.headers, response.json)

            return response
        except Exception as e:
            app.logger.exception(e)
            flask.abort(flask_api.status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self):
        app.logger.debug('GET /wordembedding/ called!')
        response = flask.jsonify(list(self.word_embeddings.keys()))
        response.status_code = flask_api.status.HTTP_200_OK
        response.headers['Access-Control-Allow-Origin'] = '*'

        app.logger.debug('<Response>')
        app.logger.debug('[Status]')
        app.logger.debug(response.status)
        output_http_data(response.headers, response.json)

        return response


if __name__ == '__main__':
    # RootLoggerのログレベルをDEBUGに設定
    logging.root.setLevel(logging.DEBUG)

    # RootLoggerにハンドラをセット
    for handler in [logging.StreamHandler(),
                    logging.FileHandler(str(pathlib.Path(conf.get('general', 'log', 'path'))
                                            / (datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S') + '.log')))]:
        handler.setLevel(logging.root.getEffectiveLevel())
        handler.setFormatter(logging.Formatter('[%(name)s %(asctime)s %(levelname)s] %(message)s'))
        logging.root.addHandler(handler)

WordEmbeddingView.register(app)

if __name__ == '__main__':
    app.run(conf.get('general', 'server', 'host'), conf.get('general', 'server', 'port'), True, use_reloader=False)
