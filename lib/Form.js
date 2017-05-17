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

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      attempted: false,
      errorMessage: '',
      isLoading: false,
      isValid: false
    }, _this.submitForm = function (event) {
      event.preventDefault();

      var payload = [];
      var isValid = _this.refs.website.value.length ? false : true;

      _react2.default.Children.map(_this.props.children, function (child, index) {
        var current = 'input' + index;

        var currentState = _this.refs[current].validate();
        _this.refs[current].removeFocus();

        if (currentState.isValid) {
          payload.push({
            value: currentState.value,
            name: child.props.title ? child.props.title.toLowerCase() : child.state.type + '-input' + index
          });
        }

        isValid = isValid && currentState.isValid;
      });

      _this.setState({
        attempted: true,
        errorMessage: '',
        isValid: isValid
      });

      if (isValid) {
        _this.setState({ isLoading: true });
        _this.props.submit({
          data: payload,
          error: function error(errorMessage) {
            _this.setState({
              errorMessage: errorMessage,
              isLoading: false
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'boundChildren',
    value: function boundChildren() {
      return _react2.default.Children.map(this.props.children, function (child, index) {
        child = (0, _react.cloneElement)(child, {
          id: 'input' + index,
          ref: 'input' + index,
          tabIndex: index + 1
        });

        return child;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var buttonClass = (0, _classHelper.classHelper)('Form-btn', [['Form-btn--isLoading', this.state.isLoading]]);

      return _react2.default.createElement(
        'form',
        { className: 'Form', onSubmit: this.submitForm },
        this.props.title ? _react2.default.createElement(
          'h1',
          { className: 'Form-title' },
          this.props.title
        ) : null,
        this.props.subTitle ? _react2.default.createElement(
          'h2',
          { className: 'Form-subTitle' },
          this.props.subTitle
        ) : null,
        _react2.default.createElement('input', { type: 'text', className: 'Form-isHidden', name: 'website', ref: 'website', defaultValue: '' }),
        this.boundChildren(),
        this.state.errorMessage ? _react2.default.createElement(
          'p',
          { className: 'Form-error' },
          this.state.errorMessage
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'Form-buttonRow' },
          _react2.default.createElement(
            'button',
            { className: buttonClass, type: 'submit' },
            this.props.submitText
          ),
          this.props.secondButtonText ? _react2.default.createElement(
            'button',
            { className: 'Form-btn Form-btn--secondButton', type: 'button', onClick: this.props.secondButtonSubmit },
            this.props.secondButtonText
          ) : null,
          this.props.thirdButtonText ? _react2.default.createElement(
            'button',
            { className: 'Form-btn Form-btn--thirdButton', type: 'button', onClick: this.props.thirdButtonSubmit },
            this.props.thirdButtonText
          ) : null
        )
      );
    }
  }]);

  return Form;
}(_react.Component);

;

Form.propTypes = {
  secondButtonSubmit: _propTypes2.default.func,
  secondButtonText: _propTypes2.default.string,
  submit: _propTypes2.default.func.isRequired,
  submitText: _propTypes2.default.string,
  subTitle: _propTypes2.default.string,
  thirdButtonSubmit: _propTypes2.default.func,
  thirdButtonText: _propTypes2.default.string,
  title: _propTypes2.default.string
};

Form.defaultProps = {
  secondButtonSubmit: function secondButtonSubmit() {
    console.log("Add secondButtonSubmit prop to react-easy-forms");
  },
  secondButtonText: '',
  submitText: 'Submit',
  subTitle: '',
  thirdButtonSubmit: function thirdButtonSubmit() {
    console.log("Add thirdButtonSubmit prop to react-easy-forms");
  },
  thirdButtonText: '',
  title: ''
};

exports.default = Form;
module.exports = exports['default'];