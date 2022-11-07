import React from "react";
import { useParams } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data';
import {Box, Button, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField} from "@mui/material";
import {TasksCollection} from "../../db/TaskCollection";


export const TelaEditarTarefa = () => {
    const {id} = useParams();
    const [visualizando, setVisualizando] = React.useState(true);
    const [taskState, setTaskState] = React.useState();

    const user = useTracker(() => Meteor.user());

    const {task, isLoading} = useTracker(() => {
        const noDataAvailable = { task: [], pendingTasksCount: 0 };

        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()){
            return {...noDataAvailable, isLoading: true};
        }
        const task = TasksCollection.findOne({_id : id});

        return { task ,isLoading: false};
    },[id]);


    React.useEffect(() => {
        setTaskState(task);
    }, [task]);

    const submitHandle = (event) => {
        event.preventDefault();
        if(visualizando){
            setVisualizando(!visualizando);
            return;
        }

        Meteor.call('tasks.update', task._id ,taskState);
    }

    const setText = (event) => {
        setTaskState(prevState => ({
            task: {...prevState, text: event.target.value},
        }))
    }

    const setDesc = (event) => {
        setTaskState(prevState => ({
            task: {...prevState, description: event.target.value},
        }))
    }

    const setSituacao = (event) => {
        console.log(event.target.value);
        setTaskState(prevState => ({
            task: {...prevState, situacao: event.target.value},
        }))
    }

    const setPessoal = (event) => {
        setTaskState(prevState => ({
            task: {...prevState, pessoal: event.target.value},
        }))
    }

    return (
        <Box className="task-box">
            {
                isLoading || taskState === undefined ? <h1> is loading...</h1> :
                    <div className="editar-tarefa">
                        <form onSubmit={submitHandle}>
                            <div>
                                <TextField
                                    required
                                    disabled={visualizando}
                                    id="outlined-required"
                                    label="Nome"
                                    value={taskState.text}
                                    onChange={setText}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    disabled={visualizando}
                                    id="outlined-required"
                                    multiline
                                    label="Descrição"
                                    value={taskState.description}
                                    onChange={setDesc}
                                />
                            </div>
                            <div>
                                <InputLabel>Situação</InputLabel>
                                <Select
                                    labelId="situacao"
                                    id="situacao"
                                    disabled={visualizando}
                                    value={taskState.situacao}
                                    defaultValue={task.situacao}
                                    label="Situação"
                                    onChange={setSituacao}
                                >
                                    <MenuItem value={'Cadastrada'}>Cadastrada</MenuItem>
                                    <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                                    <MenuItem value={'Concluída'}>Concluídas</MenuItem>
                                </Select>
                            </div>
                            <div>
                                <FormControlLabel
                                    value="pessoal"
                                    control={
                                    <Switch
                                        disabled={visualizando}
                                        checked={taskState.pessoal}
                                        color="primary"
                                        onChange={setPessoal}
                                    />}
                                    label="É pessoal"
                                    labelPlacement="start"
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    disabled
                                    id="outlined-required"
                                    multiline
                                    label="Data de Criação"
                                    value={taskState.createdAt}
                                    type="datetime"
                                />
                            </div>
                            <div>
                                <Button type="submit" variant="outlined">{!visualizando? 'salvar' : 'editar'}</Button>
                                <Button onClick={(_) => setVisualizando(true)} variant="outlined">Cancelar</Button>
                            </div>
                        </form>
                    </div>
            }
        </Box>
    );

}