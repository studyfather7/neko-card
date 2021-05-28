"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;

var _utils = require("../base/utils");

const installedPlugins = [];

function use(plugin = {}, ...args) {
  if (installedPlugins.indexOf(plugin) > -1) {
    return this;
  }

  args.unshift(this);

  if ((0, _utils.isFunc)(plugin.install)) {
    plugin.install.apply(plugin, args);
  } else if ((0, _utils.isFunc)(plugin)) {
    plugin.apply(null, args);
  }

  installedPlugins.push(plugin);
  return this;
}