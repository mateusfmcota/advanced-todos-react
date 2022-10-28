import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {TasksCollection} from "../../db/TaskCollection";
import {Box, Button, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {ListaTarefas} from "../widgets/ListaTarefas";

export const TelaTarefas = () => {
    const [offset, setOffset] = React.useState(0);

    const { tasks, pendingTasksCount, isLoading} = useTracker(() => {
        console.log(offset);
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };


        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()){
            return {...noDataAvailable, isLoading: true};
        }

        const tasks = TasksCollection.find({},{limit: 4, skip: offset });

        const pendingTasksCount = TasksCollection.find({}).count();
        return {tasks, pendingTasksCount };

    });

    return (

        <Box className="task-box">
            {
                isLoading ? <h1> is loading...</h1> :
                    <div>
                        <ListaTarefas tasks={tasks} />
                        <Button onClick={(_) => setOffset(offset+4)} variant="outlined">Proxima pagina</Button>
                        <Button onClick={(_) => setOffset(offset-4)} variant="outlined">Pagina anterior</Button>
                    </div>
            }
        </Box>

    );

}