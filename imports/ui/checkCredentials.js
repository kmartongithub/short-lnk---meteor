import {Meteor} from 'meteor/meteor';


export default checkCredentials = () => {
  console.log('Checking Credentials');
  if (Meteor.userId()) {
    return Link1;
  }
};
