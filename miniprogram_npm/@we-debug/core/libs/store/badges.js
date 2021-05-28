"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 状态角标
let badges = [];

function get() {
  return badges;
}

function getById(id) {
  return badges.find(s => s.id === id);
}

function add(s) {
  badges = badges.concat(s);
}

function remove(s) {
  let i = badges.length;

  while (i--) {
    let tmp = badges[i];

    if (tmp === s) {
      badges.splice(i, 1);
      break;
    }
  }
}

var _default = {
  get,
  getById,
  add,
  remove
};
exports.default = _default;