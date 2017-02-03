import React, { PropTypes } from 'react';
import { FormattedRelative } from 'react-intl';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import BaseComponent from 'libs/components/BaseComponent';

export default class TicketsList extends BaseComponent {
  componentDidMount() {
    const { fetch } = this.props.actions;
    fetch();
  }

  render() {
    const { actions, data } = this.props;

    return (
      <div className="container">
        <Row>
          <Col xs={12}>
            <h1>Tickets</h1>
            {data.get('$$tickets') ? (
              <table className="table table-default">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Open</th>
                    <th>Updated at</th>
                    <th>Created at</th>
                  </tr>
                </thead>
                <tbody>
                  {data.get('$$tickets').map(function(ticket) {
                    return (
                      <tr key={ticket.get('id')}>
                        <td><a href={'/tickets/' + ticket.get('id')}>{ticket.get('title')}</a></td>
                        <td>{ticket.get('status')}</td>
                        <td><FormattedRelative value={ticket.get('updated_at')} /></td>
                        <td><FormattedRelative value={ticket.get('created_at')} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              'Loading...'
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
