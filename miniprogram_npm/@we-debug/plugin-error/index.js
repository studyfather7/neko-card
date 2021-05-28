module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1605702678792, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ErrorPlugin = {};
/**
 * 异常调试插件
 *
 * @param {*} weDebug
 * @param {*} [options={}]
 */

const errManage = {
  _errStack: [],

  get() {
    return this._errStack;
  },

  add(e) {
    this._errStack.push(e);
  },

  clear() {
    this._errStack = [];
  }

};

ErrorPlugin.install = function (weDebug, options = {}) {
  if (ErrorPlugin.installed) return;
  ErrorPlugin.installed = true;
  const badgeOption = options.badge || {};
  const copyOption = options.copyRule || {};
  const clearOption = options.clearRule || {};
  const errorBadge = weDebug.createBadge(Object.assign({}, {
    key: 'error',
    value: 0,
    color: 'red',
    show: () => true,
    draggable: true,
    position: {
      right: 0,
      top: 10
    }
  }, badgeOption));
  const copyErrStackRule = weDebug.createFormRule(Object.assign({}, {
    title: '获取错误信息',
    desc: '复制错误信息到剪切板',
    type: 'button',
    state: {
      disabled: false
    },
    handler: {
      bindTap(state) {
        if (!state.disabled) {
          wx.setClipboardData({
            data: JSON.stringify(errManage.get(), null, 2)
          });
        }
      }

    }
  }, copyOption));
  const clearErrStackRule = weDebug.createFormRule(Object.assign({}, {
    title: '清空错误信息',
    desc: '',
    type: 'button',
    state: {
      name: '清空',
      disabled: false
    },
    handler: {
      bindTap(state) {
        if (!state.disabled) {
          errManage.clear();
          updateState();
        }
      }

    }
  }, clearOption));
  weDebug.addBadge([errorBadge]);
  weDebug.addFormRule([copyErrStackRule, clearErrStackRule]);

  function updateState() {
    const errStack = errManage.get();
    const errLen = errStack.length;
    errorBadge.emit({
      value: errLen
    });
    copyErrStackRule.emit({
      meta: errLen
    });
  }

  wx.onError(err => {
    errManage.add(err);
    updateState();
  });
  wx.onAppRoute(() => {
    updateState();
  });
};

var _default = ErrorPlugin;
exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1605702678792);
})()
//# sourceMappingURL=index.js.map