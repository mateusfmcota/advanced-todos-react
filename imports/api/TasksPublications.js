import { Meteor } from 'meteor/meteor';
import { TasksCollection } from "../db/TaskCollection";

Meteor.publish('tasks', function publishTasks(){
   return TasksCollection.find({$or: [{pessoal: false}, {userId: Meteor.user()._id}]});
});