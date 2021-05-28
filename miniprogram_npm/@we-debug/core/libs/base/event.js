"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;

var _utils = require("./utils");

class Event {
  constructor() {
    this._fns = {};
  }

  on(key, fn) {
    if ((0, _utils.isArr)(key)) {
      key.forEach(item => {
        if ((0, _utils.isStr)(item)) {
          this.on(item, fn);
        } else if ((0, _utils.isObj)(item)) {
          this.on(item.event, item.fn);
        }
      });
    } else {
      (this._fns[key] || (this._fns[key] = [])).push(fn);
    }
  }

  off(key, fn) {
    if (!key && !fn) {
      this._fns = Object.create(null);
      return this;
    }

    if ((0, _utils.isArr)(key)) {
      key.forEach(item => {
        if ((0, _utils.isStr)(item)) {
          this.off(item, fn);
        } else if ((0, _utils.isObj)(item)) {
          this.off(item.key, item.fn);
        }
      });
      return this;
    }

    if (!this._fns[key]) return this;

    if (!fn) {
      this._fns[key] = null;
    }

    if (fn) {
      let fns = this._fns[key];
      let i = fns.length;

      while (i--) {
        let tmp = fns[i];

        if (tmp === fn || tmp.fn === fn) {
          fns.splice(i, 1);
          break;
        }
      }
    }
  }

  emit(key, ...args) {
    const fns = this._fns[key];

    if (fns && fns.length) {
      fns.forEach(fn => {
        fn.apply(this, args);
      });
    }
  }

}

exports.Event = Event;