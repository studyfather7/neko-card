"use strict";

var _index = _interopRequireDefault(require("../../libs/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = _index.default.store;
Component({
  properties: {
    config: {
      type: Object,
      value: {}
    }
  },
  observers: {
    'config.rules'(v) {
      if (v) {
        this.setData({
          rules: v
        });
      }
    },

    'config.badges'(v) {
      if (v) {
        this.setData({
          badges: v
        });
      }
    }

  },
  data: {
    sys: store.sys.get(),
    rules: store.rules.get(),
    badges: store.badges.get()
  }
});