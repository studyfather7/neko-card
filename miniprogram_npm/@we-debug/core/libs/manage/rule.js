"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormRule = createFormRule;
exports.FormRule = void 0;

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormRule extends _base.default {
  constructor(opt = {}) {
    super(opt);
    this.title = opt.title || '';
    this.desc = opt.desc || '';
    this.meta = opt.meta || '';
    this.type = opt.type || '';
    this.state = opt.state || {};
  }

  get prefix() {
    return 'debug:rule-' + this.id;
  }

}

exports.FormRule = FormRule;

function createFormRule(opt = {}) {
  return new FormRule(opt);
}