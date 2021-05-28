"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveAreaHelper = void 0;

var _index = _interopRequireDefault(require("../../libs/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = _index.default.store;

class MoveAreaHelper {
  constructor() {
    this.systemInfo = store.sys.get();
  }

  getLeft() {
    return this.systemInfo.safeArea.left;
  }

  getWidth() {
    return this.systemInfo.safeArea.width;
  }

  getTop(reservedDistance) {
    const {
      windowHeight,
      screenHeight
    } = this.systemInfo;
    return windowHeight - screenHeight - reservedDistance;
  }

  getHeight(reservedDistance) {
    const {
      screenHeight
    } = this.systemInfo;
    return screenHeight + reservedDistance * 2;
  }

}

exports.MoveAreaHelper = MoveAreaHelper;