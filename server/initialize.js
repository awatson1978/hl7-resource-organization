// import { grocers } from './grocers.json'

// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  // console.log('grocers', grocers)

  if (process.env.INITIALIZE) {
    console.log('INITIALZING');
    if (Organizations.find().count() === 0) {
    console.log('No Organizations found.  Creating some...');



    }
  }
});


