import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { IntlProvider } from 'react-intl';

import BaseComponent from 'libs/components/BaseComponent';

export default class Layout extends BaseComponent {
    render() {
        return (
            <IntlProvider locale={navigator.language}>
                {this.props.children}
            </IntlProvider>
        );
    }
}
