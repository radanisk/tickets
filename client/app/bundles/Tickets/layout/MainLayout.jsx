import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import BaseComponent from 'libs/components/BaseComponent';
import * as sessionsActionCreators from '../actions/sessionsActionCreators';

class MainLayout extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, [
      'handleSignOut',
    ]);
  }

  handleSignOut(e) {
    e.preventDefault();
    console.log(this.props);
    this.props.dispatch(sessionsActionCreators.signOut());
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="/">Tickets</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <a href="/"><span className="glyphicon glyphicon-list"></span>&nbsp;Tickets</a>
                </li>
                <li>
                  <a href="/tickets/new"><span className="glyphicon glyphicon-pencil"></span>&nbsp;New ticket</a>
                </li>
                <li>
                  <a href="#" onClick={this.handleSignOut}><span className="glyphicon glyphicon-log-out"></span>&nbsp;Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default connect()(MainLayout);