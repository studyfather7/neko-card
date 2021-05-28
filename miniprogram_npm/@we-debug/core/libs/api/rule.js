"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFormRule = addFormRule;
exports.removeFormRule = removeFormRule;
exports.getFormRule = getFormRule;
Object.defineProperty(exports, "createFormRule", {
  enumerable: true,
  get: function () {
    return _index2.createFormRule;
  }
});

var _index = _interopRequireDefault(require("../store/index"));

var _index2 = require("../manage/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 新增规则
 * @param {Rule} rule
 */
function addFormRule(rule) {
  _index.default.rules.add(rule);
}
/**
 * 移除规则
 * @param {*} rule
 */


function removeFormRule(rule) {
  _index.default.rules.remove(rule);
}
/**
 * 获取规则集合
 */


function getFormRule() {
  return _index.default.rules.get();
}