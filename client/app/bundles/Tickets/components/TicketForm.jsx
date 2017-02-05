import React from 'react';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Row from 'react-bootstrap/lib/Row';

import BaseComponent from '../../../libs/components/BaseComponent';

export default class TicketForm extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, [
      'handleSubmit',
    ]);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, description } = this.refs;
    const { createTicket } = this.props.actions;
    createTicket(title.value, description.value);
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
        <Row>
          <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <h1>New ticket</h1>
            <Form onSubmit={this.handleSubmit}>
              {this.renderError()}
              <FormGroup>
                <label htmlFor="new-ticket-title">Title</label>
                <input type="text" className="form-control" id="new-ticket-title" ref="title" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="new-ticket-description">Description</label>
                <textarea className="form-control" id="new-ticket-description" ref="description" />
              </FormGroup>
              <div className="text-right">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </Form>
          </div>
        </Row>
      </div>
    );
  }
}
