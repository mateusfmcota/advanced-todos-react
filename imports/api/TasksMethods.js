import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {TasksCollection} from "../db/TaskCollection";

Meteor.methods({
    'tasks.insert'(text){
        check(text, String);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

        TasksCollection.insert({
            text,
            createdAt: new Date(),
            userId: this.userId,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        if (!task){
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.remove(taskId);
    },
    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        if (!task){
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId,
            {$set: {
                    isChecked
                }
            });
    },'tasks.update'(taskId, taskUp) {
        check(taskId, String);
        check(taskUp, Object);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        if (!task){
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId,
            {$set: {
                    ...taskUp
                }
            });
    }
    ,
    'tasks.setIsPessoal'(taskId, isPessoal) {
        check(taskId, String);
        check(isPessoal, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        if (!task){
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId,
            {$set: {
                    isPessoal
                }
            });
    },
    'tasks.setSituacao'(taskId, situacao) {
        check(taskId, String);
        check(situacao, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
        if (!task){
            throw new Meteor.Error('Access denied.');
        }

        TasksCollection.update(taskId,
            {$set: {
                    situacao
                }
            });
    }
});