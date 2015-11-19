import fs from 'fs';
import path from 'path';
import { Promise } from 'bluebird';
import { CacheManager } from './cache';

const readFile = Promise.promisify(fs.readFile);

export class DictionaryLoader {
  loadFromPrefix(prefix) {
    throw new Error('Please refer to the implementation to examine the cache.');
  }
}

export class CacheableDictionaryLoader extends DictionaryLoader {
  constructor(adapter) {
    super()
    this.cacheManager = new CacheManager(adapter);
  }
  loadFromPrefix(prefix) {
    return Promise.bind(this).then(() => {
      return this.loadAddressDictionaryFromCache(prefix);
    }).then((dict) => {
      if (dict) {
        return dict;
      }
      return this.loadAddressDictionaryFromFile(prefix);
    });
  }
  loadAddressDictionaryFromCache(prefix) {
    return this.cacheManager.find(prefix);
  }
  loadAddressDictionaryFromFile(prefix) {
    const file = path.join(__dirname, '/../json', 'zip-' + prefix + '.json');

    return Promise.bind(this).then(() => {
      return readFile(file);
    }).then((content) => {
      const dict = JSON.parse(content);
      this.cacheManager.store(prefix, dict);
      return dict;
    });
  }
}
