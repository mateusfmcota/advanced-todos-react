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
    'user.updateProfile'(userId, profile){
        check(userId, String);
        check(profile, Object);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

        // const user = Accounts.findUserByUsername(username);
        // if (!user){
        //     throw new Meteor.Error('not your user');
        // }

        Meteor.users.update(userId,
            {$set: {
                    profile: profile,
                }
            });
    },
    'user.updateProfileImage'(userId, profileImage){
        check(userId, String);
        check(profileImage, String);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized');
        }

        const user = Meteor.users.findOne({_id :this.userId});
        if (!user){
            throw new Meteor.Error('not your user');
        }


        Meteor.users.update(userId,
            {$set: {
                    "profile.image" : profileImage
                }
            });
    },
});