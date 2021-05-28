"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "store", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "use", {
  enumerable: true,
  get: function () {
    return _use.use;
  }
});
Object.defineProperty(exports, "init", {
  enumerable: true,
  get: function () {
    return _init.init;
  }
});
Object.defineProperty(exports, "createCache", {
  enumerable: true,
  get: function () {
    return _cache.createCache;
  }
});
Object.defineProperty(exports, "createBadge", {
  enumerable: true,
  get: function () {
    return _badge.createBadge;
  }
});
Object.defineProperty(exports, "getBadge", {
  enumerable: true,
  get: function () {
    return _badge.getBadge;
  }
});
Object.defineProperty(exports, "addBadge", {
  enumerable: true,
  get: function () {
    return _badge.addBadge;
  }
});
Object.defineProperty(exports, "removeBadge", {
  enumerable: true,
  get: function () {
    return _badge.removeBadge;
  }
});
Object.defineProperty(exports, "createFormRule", {
  enumerable: true,
  get: function () {
    return _rule.createFormRule;
  }
});
Object.defineProperty(exports, "getFormRule", {
  enumerable: true,
  get: function () {
    return _rule.getFormRule;
  }
});
Object.defineProperty(exports, "addFormRule", {
  enumerable: true,
  get: function () {
    return _rule.addFormRule;
  }
});
Object.defineProperty(exports, "removeFormRule", {
  enumerable: true,
  get: function () {
    return _rule.removeFormRule;
  }
});
exports.util = exports.default = exports.event = void 0;

var _index = _interopRequireDefault(require("./store/index"));

var util = _interopRequireWildcard(require("./base/utils"));

exports.util = util;

var _use = require("./api/use");

var _init = require("./api/init");

var _cache = require("./api/cache");

var _badge = require("./api/badge");

var _rule = require("./api/rule");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const event = _index.default.event;
exports.event = event;
var _default = {
  use: _use.use,
  init: _init.init,
  createCache: _cache.createCache,
  event,
  store: _index.default,
  util,
  createBadge: _badge.createBadge,
  getBadge: _badge.getBadge,
  addBadge: _badge.addBadge,
  removeBadge: _badge.removeBadge,
  createFormRule: _rule.createFormRule,
  getFormRule: _rule.getFormRule,
  addFormRule: _rule.addFormRule,
  removeFormRule: _rule.removeFormRule
};
exports.default = _default;