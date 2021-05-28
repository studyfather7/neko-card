"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCache = createCache;

var _cache = require("../base/cache");

/**
 * 创建缓存
 * @param {*} cacheKey
 */
function createCache(cacheKey) {
  let v = null;

  try {
    v = wx.getStorageSync(cacheKey);
  } catch (e) {}

  return new _cache.CacheData(cacheKey, v);
}