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

import flask
import flask_api.status
import flask_classy
import gensim
import natto

import config

# 作者
__author__ = 'Masaya Suzuki'

# バージョン
__version__ = '0.0.1'

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


class Word2VecView(flask_classy.FlaskView):
    """
    Word2Vecによる計算結果を返すView
    """

    trailing_slash = False

    def __init__(self):
        # Word2Vec
        self.word2vec = gensim.models.KeyedVectors.load_word2vec_format(conf.get('general', 'word2vec', 'model path'))

        # MeCab
        self.mecab = natto.MeCab({
            'output_format_type': 'wakati',
            'dicdir': conf.get('general', 'mecab', 'dir path')
        })

    def _count_keywords(self, request):
        """
        単語をカウントする
        (positiveな単語は+1、negativeな単語は-1する)
        :param request: リクエスト
        :return: 単語のカウント結果
        """
        # 単語カウンター
        # (positiveな単語は+1、negativeな単語は-1する)
        counter = OrderedCounter()

        # 単語をMeCabで分割し、単語カウンターでカウント
        for key, pm in [['positive', 1], ['negative', -1]]:
            if key in request:
                for word_request in request[key]:
                    for word_mecab in self.mecab.parse(word_request).split():
                        counter[word_mecab] += pm * 1

        return counter

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
                    for k, pm in [['positive', 1], ['negative', -1]]}

        # 類似単語を導出
        try:
            responce['similar'] = [{
                'word': w,
                'cosine': c
            } for w, c in self.word2vec.most_similar(**responce)]
        except ValueError:
            responce['similar'] = list()

        return responce

    def post(self):
        try:
            app.logger.debug('/word2vec/ called!')

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

Word2VecView.register(app)

if __name__ == '__main__':
    app.run(conf.get('general', 'server', 'host'), conf.get('general', 'server', 'port'), True)
