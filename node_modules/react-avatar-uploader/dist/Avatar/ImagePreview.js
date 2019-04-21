"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    height: auto;\n    width: 100%;\n    border-radius: 50%;\n    z-index: 1;\n"], ["\n    height: auto;\n    width: 100%;\n    border-radius: 50%;\n    z-index: 1;\n"]);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ImagePreview = _styledComponents2.default.img(_templateObject);

exports.default = ImagePreview;