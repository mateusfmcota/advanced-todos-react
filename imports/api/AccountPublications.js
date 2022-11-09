import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function publishTasks(){
    return Meteor.users.find({}, {'username': 1, 'profile': '1'})
});