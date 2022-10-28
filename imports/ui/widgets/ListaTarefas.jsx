import React from 'react';
import {List} from "@mui/material";
import {TarefaTile} from "./TarefaTile";

export const ListaTarefas = (props) => {
    const { tasks } = props;
    return(
    <div>
        <label className='welcome-label'>Tarefas cadastradas</label>
        <List>
            {tasks.map(task => <TarefaTile task={task} />)}
        </List>
    </div>);
}