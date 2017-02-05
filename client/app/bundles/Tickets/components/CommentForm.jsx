import React from 'react';
import ReactDOM from 'react-dom';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import BaseComponent from '../../../libs/components/BaseComponent';

export default class CommentForm extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, [
      'handleSubmit',
      'closeTicket',
    ]);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { content } = this.refs;
    const { ticket } = this.props;
    const { submitComment } = this.props.actions;
    submitComment(ticket.get("id"), content.value);
    ReactDOM.findDOMNode(content).value = '';
  }

  closeTicket(e) {
    const { ticket } = this.props;
    const { closeTicket } = this.props.actions;
    closeTicket(ticket.get("id"));
  }

  renderErrors() {
    const { ticket } = this.props;

    if (ticket.get('errors')) {
      return (
        <div className="alert alert-danger">{data.get('errors')}</div>
      );
    } else {
      return false;
    }
  }

  render() {
    const { ticket } = this.props;

    return (
    <Form onSubmit={this.handleSubmit}>
      {this.renderErrors()}
      <FormGroup>
        <label htmlFor="new-comment-content">Comment</label>
        <textarea className="form-control" id="new-comment-content" ref="content" />
      </FormGroup>
      <div className="text-right">
        <button className="btn btn-primary" type="submit">Add</button>&nbsp;
        { ticket.get("status") === 'open' &&
          <button className="btn btn-danger" type="button" onClick={this.closeTicket}>Close ticket</button>
        }
      </div>
    </Form>
    );
  }
}
