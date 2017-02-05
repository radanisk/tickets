import React from 'react';
import { FormattedRelative } from 'react-intl';

import BaseComponent from '../../../libs/components/BaseComponent';

export default class Comment extends BaseComponent {
  render() {
    const { comment } = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">
            <strong>{comment.get('user_name')}</strong> added a comment - <FormattedRelative value={comment.get('created_at')} />
          </div>
          <div className="panel-body">{comment.get('content')}</div>
        </div>
      </div>
    );
  }
}
