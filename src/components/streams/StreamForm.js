import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }
  renderInput = ({ input, label, id, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input type="text" {...input} id={id} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          component={this.renderInput}
          label="Enter Title"
          id="title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
          id="description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'streamForm',
})(StreamForm);