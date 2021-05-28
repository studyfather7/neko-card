"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sys = _interopRequireDefault(require("./sys"));

var _badges = _interopRequireDefault(require("./badges"));

var _rules = _interopRequireDefault(require("./rules"));

var _event = _interopRequireDefault(require("./event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  sys: _sys.default,
  badges: _badges.default,
  rules: _rules.default,
  event: _event.default
};
exports.default = _default;