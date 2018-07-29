# coding=utf-8

"""
サーバーのテスト
"""

import inspect
import json
import pathlib

import pytest

import config
import server

# 作者
__author__ = 'Masaya Suzuki'

# バージョン
__version__ = '0.0.1'


@pytest.fixture
def client():
    """
    テスト用のクライアントを返す
    :return: テスト用のクライアント
    """
    return server.app.test_client()


@pytest.fixture
def conf():
    """
    設定を返す
    :return: 設定
    """
    return config.Config(pathlib.Path.cwd().parent / 'configs')


def test_render_index(client, conf):
    """
    トップページが正常に返される
    :param client: テスト用のクライアント
    """
    res = client.get('/')
    do_test_http_ok(res)
    with (pathlib.Path(conf.get('general', 'front', 'dir path')) / 'index.html').open() as index_file:
        assert res.data.decode() == index_file.read()


def test_analysis_word2vec(client, conf):
    """
    Word2Vecによる計算が正常に行われる
    :param client: テスト用のクライアント
    :param conf: 設定
    """
    do_word2vec_test(client, conf, {
        'negative': [
            '男'
        ],
        'positive': [
            '王',
            '女'
        ]
    }, inspect.currentframe())


def do_word2vec_test(client, conf, data, frame):
    """
    Word2Vecによる計算のテストを行う
    :param client: テスト用のクライアント
    :param conf: 設定
    :param data: POSTするデータ
    :param frame: fname (inspect.currentframe()を指定)
    """
    res = client.post('/word2vec', data=json.dumps(data), content_type='application/json')
    do_test_http_ok(res)
    with (pathlib.Path(conf.get('general', 'test', 'json dir path'))
          / (inspect.getframeinfo(frame)[2] + '.json')).open() as json_file:
        assert res.json == json.load(json_file)


def do_test_http_ok(res):
    """
    レスポンスが200 OKを返すかどうかのテストを行う
    :param res: レスポンス
    """
    assert res.status_code == 200
