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

var CheckGroup = function (_Component) {
  _inherits(CheckGroup, _Component);

  function CheckGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CheckGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckGroup.__proto__ || Object.getPrototypeOf(CheckGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      attempted: false,
      error: _this.props.error,
      isValid: false,
      checks: _this.props.data,
      type: 'checks'
    }, _this._onChange = function (event) {
      if (_this.state.isValid) {
        _this.setState({ isValid: false });
      }

      var isValid = false;
      var checks = _this.state.checks;

      checks.map(function (check, index) {
        if (check.label === event.target.value) {
          if (!check.value) isValid = true;
          check.value = !check.value;
        } else if (check.value === true) {
          isValid = true;
        }
      });

      if (_this.props.onChange) {
        _this.props.onChange(checks);
      }

      _this.setState({ checks: checks });

      if (_this.state.attempted) {
        _this.setState({ isValid: isValid });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CheckGroup, [{
    key: 'validate',
    value: function validate() {
      var result = [];

      this.state.checks.map(function (data, index) {
        if (data.value) {
          result.push(data.label);
        }
      });

      var isValid = void 0;

      if (this.props.validate) {
        isValid = result.length ? true : false;
      } else {
        isValid = true;
      }

      this.setState({
        attempted: true,
        isValid: isValid
      });

      return {
        isValid: isValid,
        value: result
      };
    }
  }, {
    key: 'removeFocus',
    value: function removeFocus() {
      this.refs.CheckGroup.blur();
    }
  }, {
    key: 'renderChecks',
    value: function renderChecks() {
      var _this2 = this;

      var groupClass = (0, _classHelper.classHelper)('CheckGroup-group', [['CheckGroup-group--inline', this.props.inline], ['CheckGroup-group--error', this.state.error || !this.state.isValid && this.state.attempted]]);

      var groupName = this.props.name ? this.props.name : this.state.checks[0] + this.state.checks[this.state.checks.length - 1];

      return this.state.checks.map(function (data, index) {
        return _react2.default.createElement(
          'div',
          { className: groupClass, key: index },
          _react2.default.createElement('input', { className: 'CheckGroup-checkboxInput', id: data.label + '-' + index, name: groupName, onChange: _this2._onChange, type: 'checkbox', checked: data.value, value: data.label }),
          _react2.default.createElement(
            'label',
            { className: 'CheckGroup-checkboxLabel', htmlFor: data.label + '-' + index },
            data.label
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var newCheckClass = (0, _classHelper.classHelper)('CheckGroup', [['CheckGroup--noTitle', !this.props.title]]);

      return _react2.default.createElement(
        'div',
        { className: newCheckClass, ref: 'CheckGroup' },
        this.props.title ? _react2.default.createElement(
          'label',
          { className: 'CheckGroup-title' },
          this.props.title
        ) : null,
        this.props.subTitle ? _react2.default.createElement(
          'p',
          { className: 'CheckGroup-subTitle' },
          this.props.subTitle
        ) : null,
        this.renderChecks()
      );
    }
  }]);

  return CheckGroup;
}(_react.Component);

exports.default = CheckGroup;


CheckGroup.propTypes = {
  data: _propTypes2.default.array.isRequired,
  error: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  subTitle: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  title: _propTypes2.default.string,
  validate: _propTypes2.default.bool
};

CheckGroup.defaultProps = {
  error: false,
  inline: true,
  name: null,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: true
};
module.exports = exports['default'];