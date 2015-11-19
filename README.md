# postal-code-jp

[![Build Status](https://travis-ci.org/holyshared/postal-code-jp.svg?branch=master)](https://travis-ci.org/holyshared/postal-code-jp)
[![codecov.io](https://codecov.io/github/holyshared/postal-code-jp/coverage.svg?branch=master)](https://codecov.io/github/holyshared/postal-code-jp?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/564c68b14e32b6001e00036a/badge.svg?style=flat)](https://www.versioneye.com/user/projects/564c68b14e32b6001e00036a)

## インストール方法

下記のコマンドでインストールできます。

	npm install postal-code-jp

## 基本的な使用方法

郵便番号から、住所の情報を返します。

```js
import AddressResolver from 'postal-code-jp';

const resolver = new AddressResolver();

resolver.find('0010933').then((address) => {
  console.log(address.prefecture); // 都道府県
  console.log(address.city); // 市区町村名
  console.log(address.area); // 町域名
  console.log(address.street); // 番地
});
```

## 検索結果のキャッシュ

キャッシュに利用するアダプタを変えることで、独自のキャッシュ処理に切り替えることができます。  
デフォルトでは、**MemoryCacheAdapter**を使用して、メモリにキャッシュします。

```js
import AddressResolver from 'postal-code-jp';
import { cache } from 'postal-code-jp';

const memoryAdapter = new cache.MemoryCacheAdapter();
const resolver = new AddressResolver(memoryAdapter);

resolver.find('0010933').then((address) => {
  console.log(address.prefecture); // 都道府県
  console.log(address.city); // 市区町村名
  console.log(address.area); // 町域名
  console.log(address.street); // 番地
});
```

## 独自アダプタの実装

**CacheAdapter**をサブクラス化して、独自のアダプタを使用できるようになります。  
下記のメソッドを実装する必要があります。

* find(prefix) - 郵便番号の頭3桁を引数に取り、該当する辞書を返します。
* store(prefix, store) - 郵便番号の頭3桁と、辞書を受け取り、キャッシュします。

```js
import AddressResolver from 'postal-code-jp';
import { cache } from 'postal-code-jp';

class CustomAdapter extends cache.CacheAdapter {
  constructor() {
    super();
  }

  /**
   * Search the dictionary from the cache
   *
   * @param {string} prefix
   * @return Promise<Object>
   */
  find(prefix) {
  }

  /**
   * Cache the dictionary
   *
   * @param {string} prefix
   * @param {Object} dict
   * @return Promise<void>
   */
  store(prefix, dict) {
  }
}

const resolver = new AddressResolver(new CustomAdapter());

resolver.find('0010933').then((address) => {
  console.log(address.prefecture); // 都道府県
  console.log(address.city); // 市区町村名
  console.log(address.area); // 町域名
  console.log(address.street); // 番地
});
```

## テストの実行

次のコマンドで、テストを実行できます。

	npm install
	npm run instrument
	npm test
