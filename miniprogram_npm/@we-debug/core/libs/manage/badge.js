"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBadge = createBadge;
exports.Badge = void 0;

var _utils = require("../base/utils");

var _base = _interopRequireDefault(require("./base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const valid = v => !(0, _utils.isUndefined)(v) && !(0, _utils.isNull)(v);

class Badge extends _base.default {
  constructor(opt = {}) {
    super(opt);
    this.key = valid(opt.key) ? opt.key : '';
    this.value = valid(opt.value) ? opt.value : '';
    this.color = opt.color || '';
    this.show = opt.show || false;
    this.draggable = opt.draggable;
    this.position = opt.position;
  }

  get prefix() {
    return 'debug:badge-' + this.id;
  }

}

exports.Badge = Badge;

function createBadge(opt = {}) {
  return new Badge(opt);
}