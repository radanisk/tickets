import React from 'react';

import Row from 'react-bootstrap/lib/Row';

import BaseComponent from '../../../libs/components/BaseComponent';

import Comment from './Comment';
import CommentForm from './CommentForm';

export default class Ticket extends BaseComponent {
  componentDidMount() {
    const { data, routeParams } = this.props;
    const { fetchTicket, fetchComments } = this.props.actions;

    if (!data.get('$$ticket')) {
      fetchTicket(routeParams.id);
    }
    if (!data.get('$$comments')) {
      fetchComments(routeParams.id);
    }
  }

  componentWillUnmount() {
    const { resetTicket } = this.props.actions;
    resetTicket();
  }

  render() {
    const { data } = this.props;

    if (!data.get('$$ticket')) {
      return false;
    }

    return (
      <div className="container">
        <Row>
          <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <h1>{data.get('$$ticket').get('title')} ({data.get('$$ticket').get('status')})</h1>
            {data.get('$$comments') ? (
              <div>
                {data.get('$$comments').map(function(comment) {
                  return (
                    <div key={comment.get("id")}>
                      <Comment comment={comment} />
                    </div>
                  );
                })}
              </div>
            ) : (
              'Loading...'
            )}
            {data.get('$$ticket').get('status') === 'open' &&
              <CommentForm ticket={data.get('$$ticket')} actions={this.props.actions}/>
            }
          </div>
        </Row>
      </div>
    );
  }
}
