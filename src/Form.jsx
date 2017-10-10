import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { classHelper } from './classHelper';
require('./less/Form.less');

class Form extends Component {
  state = {
    attempted: false,
    errorMessage: '',
    isLoading: false,
    isValid: false,
  }

  submitForm = (event) => {
    event.preventDefault();

    let payload = [];
    let contentCount = 0;
    let isValid = this.refs.website.value.length ? false : true;

    React.Children.map(this.props.children, (child, index) => {
      if (child.props.type === 'content') {
        contentCount++;
        return;
      }

      let current = `input${index - contentCount}`;

      let currentState = this.refs[current].validate();
      this.refs[current].removeFocus();

      if (currentState.isValid) {
        payload.push({
          value: currentState.value,
          name: child.props.title ? child.props.title.toLowerCase() : `${child.state.type}-input${index - contentCount}`
        });
      }

      isValid = isValid && currentState.isValid;
    });

    this.setState({
      attempted: true,
      errorMessage: '',
      isValid: isValid,
    });

    if (isValid) {
      this.setState({ isLoading: true });
      this.props.onSubmit({
        data: payload,
        error: (errorMessage) => {
          this.setState({
            errorMessage,
            isLoading: false
          });
        }
      });
    }
  }

  boundChildren () {
    let contentCount = 0;

    return React.Children.map(this.props.children, (child, index) => {
      if (child.props.type === 'content') {
        contentCount++;
        return child;
      } else {
        child = cloneElement(child, {
          id: `input${index - contentCount}`,
          ref: `input${index - contentCount}`,
          tabIndex: index + 1 - contentCount
        });

        return child;
      }
    });
  }

  render () {
    const buttonClass = classHelper('refForm-btn', [
      ['refForm-btn--isLoading', this.state.isLoading]
    ]);

    return (
      <form className={`refForm ${this.props.className ? this.props.className : ''}`} onSubmit={this.submitForm}>
        {this.props.title ? <div className="refForm-title">{this.props.title}</div> : null}
        {this.props.subTitle ? <div className="refForm-subTitle">{this.props.subTitle}</div> : null}
        <input type="text" className="refForm-isHidden" name="website" ref="website" defaultValue="" />
        {this.boundChildren()}
        {this.state.errorMessage ? <p className="refForm-error">{this.state.errorMessage}</p> : null}
        <div className="refForm-buttonRow">
          <button className={buttonClass} type="submit">{this.props.submitButtonText}</button>
          {this.props.secondButtonText ? <button className="refForm-btn refForm-btn--secondButton" type="button" onClick={this.props.secondButtonSubmit}>{this.props.secondButtonText}</button> : null}
          {this.props.thirdButtonText ? <button className="refForm-btn refForm-btn--thirdButton" type="button" onClick={this.props.thirdButtonSubmit}>{this.props.thirdButtonText}</button> : null}
        </div>
      </form>
    );
  }
};

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  secondButtonSubmit: PropTypes.func,
  secondButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  subTitle: PropTypes.string,
  thirdButtonSubmit: PropTypes.func,
  thirdButtonText: PropTypes.string,
  title: PropTypes.string,
};

Form.defaultProps = {
  className: null,
  secondButtonSubmit: () => { console.log("Add secondButtonSubmit prop to react-easy-forms")},
  secondButtonText: null,
  submitButtonText: 'Submit',
  subTitle: null,
  thirdButtonSubmit: () => { console.log("Add thirdButtonSubmit prop to react-easy-forms")},
  thirdButtonText: null,
  title: null,
};

export default Form;
