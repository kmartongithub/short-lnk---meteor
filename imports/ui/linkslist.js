import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';
// import { Accounts } from 'meteor/accounts-base';
// import history from './history';
// import PropTypes from 'prop-types';

import { Links } from '../api/links';
import LinksListItem from './linkslistitem';

export default class LinksList extends React.Component {
  // necessary to track "state" in the class
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    this.linkTracker = Tracker.autorun(() => {
      Meteor.subscribe('linkPub');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    this.linkTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No links found.</p>
        </div>
      );
    } else {
        return this.state.links.map((link) => {
          const shortUrl = Meteor.absoluteUrl(link._id);
          return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
          // return <p key={link._id}>{link.url}</p>;
        });
      }
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
};
