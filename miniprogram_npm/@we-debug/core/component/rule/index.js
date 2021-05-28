"use strict";

var _index = _interopRequireDefault(require("../../libs/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = _index.default.store;
const {
  isFunc
} = _index.default.util;
const prefix = 'debug:rule-';
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  properties: {
    config: {
      type: Object,
      value: {}
    }
  },
  observers: {
    'config.id'(v) {
      this.setData({
        prefix: prefix + v
      });
    },

    'config.title'(v) {
      this.setData({
        title: v
      });
    },

    'config.meta'(v) {
      this.setData({
        meta: v
      });
    },

    'config.desc'(v) {
      this.setData({
        desc: v
      });
    },

    'config.type'(v) {
      this.setData({
        type: v
      });
    },

    'config.state'(state) {
      let nameState = '';
      let checkedState = false;
      let disabledState = false;

      if (state) {
        const name = state.name;
        const checked = state.checked;
        const disabled = state.disabled;
        nameState = isFunc(name) ? name() : name;
        checkedState = isFunc(checked) ? checked() : checked;
        disabledState = isFunc(disabled) ? disabled() : disabled;
      }

      this.setData({
        state: {
          name: nameState,
          checked: !!checkedState,
          disabled: !!disabledState
        }
      });
    }

  },
  data: {
    prefix,
    state: {
      // 名称，如果是按钮则展示在按钮上
      name: '',
      checked: false,
      // 是否禁用按钮或switch
      disabled: false
    },
    title: '',
    meta: '',
    desc: '',
    type: ''
  },
  methods: {
    bindChangeHandler(e) {
      const {
        disabled
      } = this.data.state;
      const v = e.detail.value;
      const handler = this.properties.config.handler;

      if (disabled) {
        return;
      }

      if (handler && handler.bindChange && isFunc(handler.bindChange)) {
        handler.bindChange.call(this, {
          checked: v,
          disabled
        });
      }
    },

    bindTapHandler() {
      const {
        checked,
        disabled
      } = this.data.state;
      const handler = this.properties.config.handler;

      if (disabled) {
        return;
      }

      if (handler && handler.bindTap && isFunc(handler.bindTap)) {
        handler.bindTap.call(this, {
          checked,
          disabled
        });
      }
    },

    emit(opt) {
      this.setData(opt);
    },

    addListeners() {
      const prefix = this.data.prefix;
      store.event.on(prefix + ':emit', this.emit.bind(this));
    },

    removeListeners() {
      const prefix = this.data.prefix;
      store.event.off(prefix + ':emit', this.emit.bind(this));
    }

  },

  attached() {
    this.addListeners();
  },

  detached() {
    this.removeListeners();
  }

});