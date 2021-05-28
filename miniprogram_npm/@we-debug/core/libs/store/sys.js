"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let _sys;

function set(sys) {
  _sys = sys;
}

function get() {
  if (!_sys) _sys = wx.getSystemInfoSync();
  return _sys;
}

var _default = {
  get,
  set
};
exports.default = _default;