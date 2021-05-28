module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1605702678794, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _networkManage = _interopRequireDefault(require("./networkManage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Network = {};
wx.onAppRoute(() => {
  // 路由信息更新时，请求队列清空
  _networkManage.default.clear();
});
/**
 * weDebug: weDebug 实例
 * networkCallee: 网络请求方式
 *
 * @class NetworkPlugin
 */

class NetworkPlugin {
  constructor(weDebug, options = {}) {
    this.weDebug = weDebug;
    this.networkCallee = options.networkCallee || ['request', 'downloadFile', 'uploadFile'];
    this._store = {
      infoRuleState: weDebug.createCache('__infoRuleState__')
    };
    this._proxyRule = null;
  }
  /**
   * 创建界面
   *
   * @memberof NetworkPlugin
   */


  createUI() {
    const that = this;
    const {
      createFormRule,
      addFormRule
    } = that.weDebug; // 创建网络环境规则表单

    that._networkRule = createFormRule({
      title: '调试抓包',
      desc: '获取本页面所有请求的抓包信息',
      type: 'button',
      handler: {
        bindTap() {
          wx.setClipboardData({
            data: JSON.stringify(_networkManage.default.get(), null, 2)
          });
        }

      }
    }); // 添加表单到视图

    addFormRule([that._networkRule]);
  }
  /**
   * 劫持实现逻辑
   *
   * @returns
   * @memberof NetworkPlugin
   */


  createProxy() {
    this.networkCallee.forEach(method => {
      const networkFunc = wx[method];
      Object.defineProperty(wx, method, {
        get: () => (opt = {}) => this.proxyHandler(networkFunc, opt)
      });
    });
  }

  proxyHandler(networkFunc, opt = {}) {
    const that = this;
    const {
      isFunc
    } = that.weDebug.util;
    let out = Object.assign({}, opt);

    if (!out.header) {
      out.header = {};
    }

    if (!out.data) {
      out.data = {};
    }

    out.success = function (res) {
      _networkManage.default.add({
        request: opt,
        response: res
      });

      isFunc(opt.success) && opt.success.apply(this, arguments);
    };

    out.fail = function (err) {
      _networkManage.default.add({
        request: opt,
        response: err
      });

      isFunc(opt.fail) && opt.fail.apply(this, arguments);
    };

    return networkFunc.call(this, out);
  }

}

Network.install = function (weDebug, options = {}) {
  const ins = new NetworkPlugin(weDebug, options);
  ins.createUI();
  ins.createProxy();
};

var _default = Network;
exports.default = _default;
}, function(modId) {var map = {"./networkManage":1605702678795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1605702678795, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 请求队列管理
const requestManage = {
  _requestQueue: [],

  get() {
    return this._requestQueue;
  },

  add(task) {
    this._requestQueue.push(task);
  },

  remove(task) {
    let i = this._requestQueue.length;

    while (i--) {
      let tmp = this._requestQueue[i];

      if (tmp === task) {
        this._requestQueue.splice(i, 1);

        break;
      }
    }
  },

  clear() {
    this._requestQueue = [];
  }

};
var _default = requestManage;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1605702678794);
})()
//# sourceMappingURL=index.js.map