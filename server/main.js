import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {

  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    //console.log(req.url, req.method, req.headers, req.query);
    // remove / from url and store in _id
    const _id = req.url.slice(1);
    // set link to result of search of link collection matching _id
    // findOne - find one or undefinded - use shorthand for {_id: _id}
    const link = Links.findOne({ _id });

    if (link) {
      // set HTTP statusCode
      res.statusCode = 302;
      // set res HTTP headers
      res.setHeader('Location', link.url);
      // set HTTP body

      //End HTTP request
      res.end();

      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }

  });
});
