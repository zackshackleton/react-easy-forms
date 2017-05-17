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

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RadioGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      attempted: false,
      error: _this.props.error,
      isValid: false,
      value: _this.props.value || null,
      type: 'radio'
    }, _this._onChange = function (event) {
      if (_this.state.isValid) {
        _this.setState({ isValid: false });
      }

      if (_this.props.onChange) {
        _this.props.onChange(event.target.value);
      }

      _this.setState({ value: event.target.value });

      if (_this.state.attempted) {
        _this.validate(event.target.value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RadioGroup, [{
    key: 'validate',
    value: function validate() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;

      var isValid = void 0;

      if (this.props.validate) {
        isValid = value ? true : false;
      } else {
        isValid = true;
      }

      this.setState({
        attempted: true,
        isValid: isValid
      });

      return {
        isValid: isValid,
        value: value
      };
    }
  }, {
    key: 'removeFocus',
    value: function removeFocus() {
      this.refs.radioGroup.blur();
    }
  }, {
    key: 'renderRadios',
    value: function renderRadios() {
      var _this2 = this;

      var groupClass = (0, _classHelper.classHelper)('RadioGroup-group', [['RadioGroup-group--inline', this.props.inline], ['RadioGroup-group--error', this.state.error || !this.state.isValid && this.state.attempted]]);

      var groupName = this.props.name ? this.props.name : this.props.labels.join();

      return this.props.labels.map(function (label, index) {
        return _react2.default.createElement(
          'div',
          { className: groupClass, key: index },
          _react2.default.createElement('input', { className: 'RadioGroup-radioInput', id: label + '-' + index, name: groupName, onChange: _this2._onChange, type: 'radio', value: label }),
          _react2.default.createElement(
            'label',
            { className: 'RadioGroup-radioLabel', htmlFor: label + '-' + index },
            label
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var newRadioClass = (0, _classHelper.classHelper)('RadioGroup', [['RadioGroup--noTitle', !this.props.title]]);

      return _react2.default.createElement(
        'div',
        { className: newRadioClass, ref: 'radioGroup' },
        this.props.title ? _react2.default.createElement(
          'label',
          { className: 'RadioGroup-title' },
          this.props.title
        ) : null,
        this.props.subTitle ? _react2.default.createElement(
          'p',
          { className: 'RadioGroup-subTitle' },
          this.props.subTitle
        ) : null,
        this.renderRadios()
      );
    }
  }]);

  return RadioGroup;
}(_react.Component);

exports.default = RadioGroup;


RadioGroup.propTypes = {
  error: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  labels: _propTypes2.default.array.isRequired,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  subTitle: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  title: _propTypes2.default.string,
  validate: _propTypes2.default.bool,
  value: _propTypes2.default.string
};

RadioGroup.defaultProps = {
  error: false,
  inline: true,
  name: null,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: true
};
module.exports = exports['default'];