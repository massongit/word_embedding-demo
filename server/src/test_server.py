# coding=utf-8

"""
サーバーのテスト
"""

import json
import pathlib

import pytest

import config
import server

# 作者
__author__ = 'Masaya Suzuki'

# バージョン
__version__ = '0.0.4'


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


def test_analysis_word_embedding(client, conf):
    """
    分散表現による計算が正常に行われる
    :param client: テスト用のクライアント
    :param conf: 設定
    """
    do_word_embedding_test(client, {
        'method': 'fasttext',
        'negative': [
            '男'
        ],
        'positive': [
            '王',
            '女'
        ]
    })


def test_get_methods(client, conf):
    """
    手法一覧を正常に取得できる
    :param client: テスト用のクライアント
    :param conf: 設定
    """
    res = client.get('/wordembedding')
    do_test_http_ok(res)

    assert isinstance(res.json, list)

    for m in res.json:
        assert isinstance(m, str)


def do_word_embedding_test(client, data):
    """
    分散表現による計算のテストを行う
    :param client: テスト用のクライアント
    :param data: POSTするデータ
    """
    res = client.post('/wordembedding', data=json.dumps(data), content_type='application/json')
    do_test_http_ok(res)

    for k in data.keys():
        if k != 'method':
            assert res.json[k] == data[k]

    for w in res.json["similar"]:
        assert "cosine" in w
        assert "word" in w


def do_test_http_ok(res):
    """
    レスポンスが200 OKを返すかどうかのテストを行う
    :param res: レスポンス
    """
    assert res.status_code == 200
