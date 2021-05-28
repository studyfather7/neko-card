"use strict";

var _index = _interopRequireDefault(require("../../libs/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = _index.default.store;
const animateDuration = 300;
const animateClassName = {
  fadeIn: 'fadeIn',
  fadeOut: 'fadeOut',
  slideInUp: 'slideInUp',
  slideOutDown: 'slideOutDown'
};
Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    contentHeight: {
      type: Number,
      value: 500
    }
  },
  observers: {
    show(v) {
      v ? this.showMaskHandler() : this.closeMaskHandler();
    }

  },
  data: {
    // 是否展示浮层
    showMask: false,
    // 动画类
    animateClassName: {
      mask: animateClassName.fadeIn,
      modal: animateClassName.slideInUp
    }
  },
  externalClasses: ['my-class'],
  methods: {
    noop() {},

    closeMaskHandler() {
      store.event.emit('debug:mask:hide-modal');
    },

    showMask() {
      this.setData({
        animateClassName: {
          mask: animateClassName.fadeIn,
          modal: animateClassName.slideInUp
        },
        showMask: true
      });
    },

    closeMask() {
      this.setData({
        animateClassName: {
          mask: animateClassName.fadeOut,
          modal: animateClassName.slideOutDown
        }
      });
      setTimeout(() => {
        this.setData({
          showMask: false
        });
      }, animateDuration);
    },

    addListeners() {
      store.event.on('debug:mask:show-modal', this.showMask.bind(this));
      store.event.on('debug:mask:hide-modal', this.closeMask.bind(this));
    },

    removeListeners() {
      store.event.off('debug:mask:show-modal', this.showMask.bind(this));
      store.event.off('debug:mask:hide-modal', this.showMask.bind(this));
    }

  },

  attached() {
    this.addListeners();
  },

  detached() {
    this.removeListeners();
  }

});