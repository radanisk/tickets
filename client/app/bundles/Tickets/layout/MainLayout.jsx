import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { IntlProvider } from 'react-intl';

import BaseComponent from 'libs/components/BaseComponent';

export default class Layout extends BaseComponent {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button
                                type="button"
                                className="navbar-toggle"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                            >
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
                                    <a href="#"><span className="glyphicon glyphicon-log-out"></span>&nbsp;Sign out</a>
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
