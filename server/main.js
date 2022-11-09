import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {TasksCollection} from "../imports/db/TaskCollection";
import '/imports/api/TasksPublications';
import '/imports/api/TasksMethods';
import '/imports/api/AccountMethods';

const SEED_USERNAME = 'teste';
const SEED_PASSWORD = 'teste';

const insertTask = (taskText, user) => TasksCollection.insert({
    text: taskText,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    userId: user._id,
    situacao: 'Cadastrada',
    pessoal: false,
    createdAt: new Date(),
});

Meteor.startup(() => {
    if(!Accounts.findUserByUsername(SEED_USERNAME)){
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
            profile: {
                nome: 'Mateus Felipe',
                email: 'mateus_cota@hotmail.com',
                dtNasc: '18/09/1995',
                sexo: 'M',
                empresa: 'Synergia',
                foto: 'asdasjhdçwqihdṕioqwhdíoqwhdóiqwahdóqih',
            }
        });
    }

    const user = Accounts.findUserByUsername(SEED_USERNAME);
    if(TasksCollection.find().count() === 0){
        [
            'Firasdst Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task',
            'oito Task',
            'nove Task'
        ].forEach((task) => insertTask(task, user));
    }
});
