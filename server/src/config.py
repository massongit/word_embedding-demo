# coding=utf-8

"""
設定ファイルを扱うためのオブジェクト
"""

import configparser

# 作者
__author__ = 'Masaya Suzuki'

# バージョン
__version__ = '0.1.0'


class Config:
    """
    設定ファイルを扱うためのオブジェクト
    """

    def __init__(self, config_dir_path):
        """
        初期化
        :param config_dir_path: 設定ファイルが格納されているディレクトリのパス (pathlib.Path)
        """
        self._configs = dict()
        for config_file in config_dir_path.glob('*.ini'):
            self._configs[config_file.stem] = configparser.ConfigParser()
            self._configs[config_file.stem].read(str(config_file))

    def get(self, file_name, section_name, option_name):
        """
        設定を取得する
        :param file_name: 設定ファイル名 (拡張子なし)
        :param section_name: セクション名
        :param option_name: 設定名
        :return: 設定
        """
        # 設定
        conf = self._configs[file_name].get(section_name, option_name)

        # 整数に変換できる場合は整数に変換して返す
        try:
            return int(conf)
        except ValueError:
            return conf
