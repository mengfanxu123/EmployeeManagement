"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: center;\n    width: ", ";\n    height: ", ";\n    border: 2px dashed #9b9b9b;\n    border-radius: 50%;\n    cursor: pointer;\n    background-color: #f7f7f7;\n    background-position: center center;\n    background-repeat: no-repeat;\n    overflow: hidden;\n    background-size: 60% 60%;\n    background-image: url(", ");\n"], ["\n    display: flex;\n    justify-content: center;\n    width: ", ";\n    height: ", ";\n    border: 2px dashed #9b9b9b;\n    border-radius: 50%;\n    cursor: pointer;\n    background-color: #f7f7f7;\n    background-position: center center;\n    background-repeat: no-repeat;\n    overflow: hidden;\n    background-size: 60% 60%;\n    background-image: url(", ");\n"]);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Uploader = require("./Uploader");

var _Uploader2 = _interopRequireDefault(_Uploader);

var _ImagePreview = require("./ImagePreview");

var _ImagePreview2 = _interopRequireDefault(_ImagePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Avatar = _styledComponents2.default.div(_templateObject, function (props) {
    return props.size + 'px';
}, function (props) {
    return props.size + 'px';
}, function (props) {
    return props.placeholder;
});

Avatar.Uploader = _Uploader2.default;
Avatar.Preview = _ImagePreview2.default;

exports.default = Avatar;