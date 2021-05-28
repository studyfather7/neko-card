"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../store/index"));

var _utils = require("../base/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _id = 1;

class BaseManage {
  constructor(opt) {
    this.id = opt.id || _id++;
    this.handler = opt.handler || _utils.noop;
  }

  get prefix() {
    throw new Error('you have to declare a prefix');
  }

  emit(opt = {}) {
    _index.default.event.emit(this.prefix + ':emit', opt);
  }

}

exports.default = BaseManage;