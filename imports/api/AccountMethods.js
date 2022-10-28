import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
    'user.insert'(username, password, profile){
        check(username, String);
        check(password, String);
        check(profile, Object);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

        Accounts.createUser({
            username: username,
            password: password,
            profile: profile,
        });
    },
    'user.update'(userId,username, password, profile){
        check(userId, String);
        check(username, String);
        check(password, String);
        check(profile, Object);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

        const user = Accounts.findUserByUsername(username);
        if (!user){
            throw new Meteor.Error('not your user');
        }


        Meteor.users.update(userId,
            {$set: {
                    username: username,
                    password: password,
                    profile: profile,
                }
            });
    },
});