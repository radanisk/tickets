import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import _ from 'lodash';

import BaseComponent from '../../../libs/components/BaseComponent';

export default class SignIn extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, [
      'handleSubmit',
    ]);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signIn } = this.props.actions;
    const { email, password } = this.refs;
    signIn(email.value, password.value);
  }

  renderError() {
    const { data } = this.props;
    if (data.get('error')) {
      return (
        <div className="alert alert-danger">{data.get('error')}</div>
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please sign in</h3>
              </div>
              <div className="panel-body">
                {this.renderError()}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <label htmlFor="sign-in-email">Email</label>
                    <input type="email" className="form-control" id="sign-in-email" ref="email"/>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="sign-in-password">Password</label>
                    <input type="password" className="form-control" id="sign-in-password" ref="password" />
                  </FormGroup>
                  <div className="text-right">
                    <button className="btn btn-primary" type="submit">Sign in</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
