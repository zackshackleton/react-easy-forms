import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { classHelper } from './classHelper';

class CheckGroup extends Component {
  state = {
    attempted: false,
    error: this.props.error,
    isValid: false,
    checks: this.props.data,
    type: 'checks'
  }

  validate () {
    let result = [];

    this.state.checks.map((data, index) => {
      if (data.value) {
        result.push(data.label);
      }
    })

    let isValid;

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
    }
  }

  _onChange = (event) => {
    if (this.state.isValid) {
      this.setState({ isValid: false })
    }

    let isValid = false;
    let checks = this.state.checks;

    checks.map((check, index) => {
      if (check.label === event.target.value) {
        if (!check.value) isValid = true;
        check.value = !check.value;
      } else if (check.value === true) {
        isValid = true;
      }
    });

    if (this.props.onChange) {
      this.props.onChange(checks);
    }

    this.setState({ checks: checks });

    if (this.state.attempted) {
      this.setState({ isValid: isValid });
    }
  }

  removeFocus () {
    this.refs.CheckGroup.blur();
  }

  renderChecks () {
    const groupClass = classHelper('CheckGroup-group', [
      ['CheckGroup-group--inline', this.props.inline],
      ['CheckGroup-group--error', this.state.error || (!this.state.isValid && this.state.attempted)]
    ]);

    const groupName = this.props.name ? this.props.name : this.state.checks[0] + this.state.checks[this.state.checks.length - 1];

    return this.state.checks.map((data, index) => {
      return (
        <div className={groupClass} key={index}>
          <input className="CheckGroup-checkboxInput" id={`${data.label}-${index}`} name={groupName} onChange={this._onChange} type="checkbox" checked={data.value} value={data.label} />
          <label className="CheckGroup-checkboxLabel" htmlFor={`${data.label}-${index}`}>{data.label}</label>
        </div>
      )
    });
  }

  render () {
    const newCheckClass = classHelper('CheckGroup', [
      ['CheckGroup--noTitle', !this.props.title]
    ]);

    return (
      <div className={newCheckClass} ref="CheckGroup">
        {this.props.title ? <label className="CheckGroup-title">{this.props.title}</label> : null}
        {this.props.subTitle ? <p className="CheckGroup-subTitle">{this.props.subTitle}</p> : null}
        {this.renderChecks()}
      </div>
    )
  }
}

export default CheckGroup;

CheckGroup.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.bool,
  inline: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  subTitle: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  validate: PropTypes.bool
};

CheckGroup.defaultProps = {
  error: false,
  inline: true,
  name: null,
  subTitle: null,
  tabIndex: null,
  title: null,
  validate: true,
};
