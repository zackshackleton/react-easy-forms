import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { classHelper } from './classHelper';

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
    let isValid = this.refs.website.value.length ? false : true;

    React.Children.map(this.props.children, (child, index) => {
      let current = `input${index}`;

      let currentState = this.refs[current].validate();
      this.refs[current].removeFocus();

      if (currentState.isValid) {
        payload.push({
          value: currentState.value,
          name: child.props.title ? child.props.title.toLowerCase() : `${child.state.type}-input${index}`
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
    return React.Children.map(this.props.children, (child, index) => {
      child = cloneElement(child, {
        id: `input${index}`,
        ref: `input${index}`,
        tabIndex: index + 1
      });

      return child;
    });
  }

  render () {
    const buttonClass = classHelper('Form-btn', [
      ['Form-btn--isLoading', this.state.isLoading]
    ]);

    return (
      <form className="Form" onSubmit={this.submitForm}>
        {this.props.title ? <h1 className="Form-title">{this.props.title}</h1> : null}
        {this.props.subTitle ? <h2 className="Form-subTitle">{this.props.subTitle}</h2> : null}
        <input type="text" className="Form-isHidden" name="website" ref="website" defaultValue="" />
        {this.boundChildren()}
        {this.state.errorMessage ? <p className="Form-error">{this.state.errorMessage}</p> : null}
        <div className="Form-buttonRow">
          <button className={buttonClass} type="submit">{this.props.submitText}</button>
          {this.props.secondButtonText ? <button className="Form-btn Form-btn--secondButton" type="button" onClick={this.props.secondButtonSubmit}>{this.props.secondButtonText}</button> : null}
          {this.props.thirdButtonText ? <button className="Form-btn Form-btn--thirdButton" type="button" onClick={this.props.thirdButtonSubmit}>{this.props.thirdButtonText}</button> : null}
        </div>
      </form>
    );
  }
};

Form.propTypes = {
  secondButtonSubmit: PropTypes.func,
  secondButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  subTitle: PropTypes.string,
  thirdButtonSubmit: PropTypes.func,
  thirdButtonText: PropTypes.string,
  title: PropTypes.string,
};

Form.defaultProps = {
  secondButtonSubmit: () => { console.log("Add secondButtonSubmit prop to react-easy-forms")},
  secondButtonText: '',
  submitText: 'Submit',
  subTitle: '',
  thirdButtonSubmit: () => { console.log("Add thirdButtonSubmit prop to react-easy-forms")},
  thirdButtonText: '',
  title: '',
};

export default Form;
