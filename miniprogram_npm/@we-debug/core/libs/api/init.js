"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

var _use = require("./use.js");

var _pluginError = _interopRequireDefault(require("@we-debug/plugin-error"));

var _pluginRouter = _interopRequireDefault(require("@we-debug/plugin-router"));

var _pluginLauncher = _interopRequireDefault(require("@we-debug/plugin-launcher"));

var _pluginNetwork = _interopRequireDefault(require("@we-debug/plugin-network"));

var _plugin = _interopRequireDefault(require("../../component/ui-check/plugin"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 初始化方法
 * @param {*} options
 */
function init(options = {}) {
  options = (0, _deepmerge.default)({
    launcher: true,
    plugin: {
      network: true,
      error: true,
      router: true,
      uiCheck: true
    }
  }, options);
  if (options.launcher) _use.use.call(this, _pluginLauncher.default, options.launcher || {});
  if (options.plugin.network) _use.use.call(this, _pluginNetwork.default, options.plugin.network || {});
  if (options.plugin.error) _use.use.call(this, _pluginError.default, options.plugin.error || {});
  if (options.plugin.router) _use.use.call(this, _pluginRouter.default, options.plugin.router || {});
  if (options.plugin.uiCheck) _use.use.call(this, _plugin.default, options.plugin.uiCheck || {});
  return this;
}