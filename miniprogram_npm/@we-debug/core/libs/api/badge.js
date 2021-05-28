"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBadge = addBadge;
exports.removeBadge = removeBadge;
exports.getBadge = getBadge;
Object.defineProperty(exports, "createBadge", {
  enumerable: true,
  get: function () {
    return _index2.createBadge;
  }
});

var _index = _interopRequireDefault(require("../store/index"));

var _index2 = require("../manage/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 新增状态角标对象
 * @param {Badge} badges
 */
function addBadge(badges) {
  _index.default.badges.add(badges);
}
/**
 * 移除状态角标对象
 * @param {*} badges
 */


function removeBadge(badges) {
  _index.default.badges.remove(badges);
}
/**
 * 获取状态角标对象集合
 */


function getBadge() {
  return _index.default.badges.get();
}