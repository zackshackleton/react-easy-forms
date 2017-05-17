'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classHelper = require('./classHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmailInput = function (_Component) {
  _inherits(EmailInput, _Component);

  function EmailInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EmailInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmailInput.__proto__ || Object.getPrototypeOf(EmailInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      attempted: false,
      error: _this.props.error,
      isValid: false,
      value: _this.props.value || '',
      type: 'email'
    }, _this._onChange = function (event) {
      if (_this.state.isValid) {
        _this.setState({ isValid: false });
      }

      _this.setState({ value: event.target.value });

      if (_this.state.attempted) {
        _this.validate(event.target.value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EmailInput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.value !== nextState.value) return true;
      if (this.state.isValid !== nextState.isValid) return true;
      if (this.state.attempted !== nextState.attempted) return true;
      if (this.state.error !== nextState.error) return true;
      return false;
    }
  }, {
    key: 'validate',
    value: function validate() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

      var isValid = false;

      if (this.props.validate) {
        isValid = this.props.regex.test(value);
      } else {
        isValid = true;
      }

      this.setState({
        attempted: true,
        isValid: isValid
      });

      return {
        isValid: isValid,
        value: this.state.value
      };
    }
  }, {
    key: 'removeFocus',
    value: function removeFocus() {
      this.refs.textInput.blur();
    }
  }, {
    key: 'inputProps',
    value: function inputProps() {
      var textClass = (0, _classHelper.classHelper)('TextInput-field', [['TextInput-field--noTitle', !this.props.title], ['TextInput-field--isError', this.state.error || !this.state.isValid && this.state.attempted]]);

      return {
        className: textClass,
        value: this.state.value,
        disabled: this.props.disabled,
        id: this.props.id,
        onChange: this._onChange,
        placeholder: this.props.placeholder,
        tabIndex: this.props.tabIndex,
        type: this.state.type,
        ref: 'textInput'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'TextInput' },
        this.props.title ? _react2.default.createElement(
          'label',
          { className: 'TextInput-title', htmlFor: this.props.id },
          this.props.title
        ) : null,
        this.props.subTitle ? _react2.default.createElement(
          'p',
          { className: 'TextInput-subTitle' },
          this.props.subTitle
        ) : null,
        _react2.default.createElement('input', this.inputProps())
      );
    }
  }]);

  return EmailInput;
}(_react.Component);

EmailInput.propTypes = {
  disabled: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  subTitle: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  title: _propTypes2.default.string,
  validate: _propTypes2.default.bool,
  value: _propTypes2.default.string
};

EmailInput.defaultProps = {
  disabled: false,
  error: false,
  placeholder: '',
  regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: true
};

exports.default = EmailInput;
module.exports = exports['default'];