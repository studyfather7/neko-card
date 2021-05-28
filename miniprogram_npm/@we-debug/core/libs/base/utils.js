"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;
exports.noop = exports.isObj = exports.isNull = exports.isUndefined = exports.isArr = exports.isFunc = exports.isStr = void 0;

const isStr = v => typeof v === 'string';

exports.isStr = isStr;

const isFunc = fn => typeof fn === 'function';

exports.isFunc = isFunc;
const isArr = Array.isArray;
exports.isArr = isArr;

const isUndefined = v => v === undefined;

exports.isUndefined = isUndefined;

const isNull = v => v === null;

exports.isNull = isNull;

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

const isObj = isObject;
exports.isObj = isObj;

const noop = () => {};

exports.noop = noop;