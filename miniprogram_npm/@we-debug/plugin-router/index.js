module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1605702678796, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const RoutePlugin = {};
/**
 * 路由调试插件
 *
 * @param {*} weDebug
 * @param {*} [options={}]
 */

RoutePlugin.install = function (weDebug, options = {}) {
  if (RoutePlugin.installed) return;
  RoutePlugin.installed = true;
  const pathRule = options.pathRule || {};
  const queryRule = options.queryRule || {};
  const copyRouteRule = weDebug.createFormRule(Object.assign({}, {
    title: '页面路由',
    desc: '复制当前页面路由到剪切板',
    type: 'button',
    handler: {
      bindTap(state) {
        if (!state.disabled) {
          const pages = getCurrentPages(),
                route = pages[pages.length - 1].route;
          wx.setClipboardData({
            data: JSON.stringify(route, null, 2)
          });
        }
      }

    }
  }, pathRule));
  const copyPageOptionRule = weDebug.createFormRule(Object.assign({}, {
    title: '页面参数',
    desc: '复制当前页面参数到剪切板',
    type: 'button',
    handler: {
      bindTap(state) {
        if (!state.disabled) {
          const pages = getCurrentPages(),
                ops = pages[pages.length - 1].options;
          wx.setClipboardData({
            data: JSON.stringify(ops, null, 2)
          });
        }
      }

    }
  }, queryRule));
  weDebug.addFormRule([copyRouteRule, copyPageOptionRule]);
};

var _default = RoutePlugin;
exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1605702678796);
})()
//# sourceMappingURL=index.js.map