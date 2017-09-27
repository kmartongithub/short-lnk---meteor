import {Meteor} from 'meteor/meteor';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

//import checkCredentials from './checkCredentials';
/**
 * Higher-order component (HOC) to wrap restricted pages
 */
export function BaseComponent() {
    class routeCheck extends Component {
        componentWillMount() {
            this.checkAuthentication(this.props);
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location) {
                this.checkAuthentication(nextProps);
            }
        }
        checkAuthentication(params) {
            const { history } = params;
            // checkCredentials()
            //     .catch(e => history.replace({ pathname: '/login' }));
            if (Meteor.userId()) {
              history.replace({ pathname: '/links' });
            }
        }
        render() {
            return <BaseComponent {...this.props} />;
        }
    }
    return withRouter(routeCheck);
}
