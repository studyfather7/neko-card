"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rule = require("./rule");

Object.keys(_rule).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rule[key];
    }
  });
});

var _badge = require("./badge");

Object.keys(_badge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _badge[key];
    }
  });
});