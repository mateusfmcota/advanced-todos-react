import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import {Box, Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {TasksCollection} from "../../db/TaskCollection";


export const TelaEditarTarefa = () => {
    const {id} = useParams();
    const [visualizando, setVisualizando] = React.useState(true);
    const [taskState, setTaskState] = React.useState();

    const {task, isLoading} = useTracker(() => {
        const noDataAvailable = { task: [], pendingTasksCount: 0 };

        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()){
            return {...noDataAvailable, isLoading: true};
        }
        const task = TasksCollection.findOne({_id : id});

        return { task ,isLoading: false};
    });

    console.log('render');

    // React.useEffect(() => {
    //     setTaskState(task);
    // }, [task]);

    const handleChange = (event) => {

    };

    const submitHandle = (event) => {

    }

    return (
        <Box className="task-box">
            {
                isLoading ? <h1> is loading...</h1> :
                    <div className="editar-tarefa">
                        <form onSubmit={submitHandle}>
                            <div>
                                <TextField
                                    required
                                    disabled={visualizando}
                                    id="outlined-required"
                                    label="Nome"
                                    defaultValue={taskState.text}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    disabled={visualizando}
                                    id="outlined-required"
                                    multiline
                                    label="Descrição"
                                    defaultValue={taskState.description}
                                />
                            </div>
                            <div>
                                <InputLabel id="demo-simple-select-label">Situação</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    disabled={visualizando}
                                    value={task.situacao}
                                    label="Situação"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Cadastrada'}>Cadastrada</MenuItem>
                                    <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                                    <MenuItem value={'Concluída'}>Concluídas</MenuItem>
                                </Select>
                            </div>
                            <div>
                                <TextField
                                    required
                                    disabled={visualizando}
                                    id="outlined-required"
                                    multiline
                                    label="Data de Criação"
                                    defaultValue={task.createdAt}
                                    type="datetime"
                                />
                            </div>
                            <div>
                                <Button onClick={(_) => setVisualizando(false)} variant="outlined">{!visualizando? 'salvar' : 'editar'}</Button>
                                <Button onClick={(_) => setVisualizando(true)} variant="outlined">Cancelar</Button>
                            </div>
                        </form>
                    </div>
            }
        </Box>
    );

}