"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    display: block;\n    opacity: 0;\n    border-radius: 50%;\n    position: absolute;\n    width: ", ";\n    height: ", ";\n    cursor: pointer;\n    z-index: 2;\n"], ["\n    display: block;\n    opacity: 0;\n    border-radius: 50%;\n    position: absolute;\n    width: ", ";\n    height: ", ";\n    cursor: pointer;\n    z-index: 2;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Uploader = _styledComponents2.default.input(_templateObject, function (props) {
    return props.size ? props.size + 'px' : '150px';
}, function (props) {
    return props.size ? props.size + 'px' : '150px';
});

var UploaderComponent = function UploaderComponent(_ref) {
    var fileType = _ref.fileType,
        disabled = _ref.disabled,
        onChange = _ref.onChange;
    return _react2.default.createElement(Uploader, { onChange: onChange, disabled: disabled, type: "file", accept: fileType || "image/*" });
};

exports.default = UploaderComponent;