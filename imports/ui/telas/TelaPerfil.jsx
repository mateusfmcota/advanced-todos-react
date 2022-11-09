import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Avatar, Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const addUser = (Component, data) => {

    return class extends React.Component {

        render() {
            const user = Meteor.user();
            return( <Component user={user} data={data}/>);
        };
    }
}

const TelaPerfilComponent = (props) => {
    const [usuario, setUsuario] = useState();
    const profile = usuario && usuario.profile;

    const navigate = useNavigate();

    if(Meteor.user() === undefined){
        navigate('/');
    }

    React.useEffect(() => {
        setUsuario(props.user);
    },[props.user]);

    const changeCampoProfile = (campo, value) => {
        setUsuario(prevState => ({
            ...prevState,
            profile: {
                ...prevState.profile,
                [campo]: value
            },
        }));
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const updateProfileImage = (event) => {
        getBase64(event.target.files[0]).then(data => Meteor.call('user.updateProfileImage', usuario._id, data));
    }

    const submitHandle = (event) => {
        event.preventDefault();
        Meteor.call("user.updateProfile", usuario._id, usuario.profile);
    }

    return (
        usuario === undefined ? <h1> loading...</h1> :
        <form className='login-form' onSubmit={submitHandle}>
            <label htmlFor="file-input">
                <div className="avatar">
                    <Avatar src={profile.image} style={{ width: '80px', height: '80px' }} onSubmit={updateProfileImage}>M</Avatar>
                </div>
            </label>
            <input type="file" id="file-input" onChange={updateProfileImage}/>

            <div>
                <label className='welcome-label'>Perfil: </label>
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Nome"
                    value={profile.nome}
                    variant="outlined"
                    onChange={(event) => changeCampoProfile('nome', event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    // type="password"
                    value={profile.email}
                    label="e-mail"
                    variant="outlined"
                    onChange={(event) => changeCampoProfile('email', event.target.value)}
                />
            </div>

            <div>
                <TextField
                    id="outlined-basic"
                    value={profile.dtNasc}
                    // type="password"
                    label="Data de nascimento"
                    variant="outlined"
                    onChange={(event) => changeCampoProfile('dtNasc', event.target.value)}
                />
            </div>

            <div>
                <InputLabel>Situação</InputLabel>
                <Select
                    labelId="sexo"
                    id="sexo"
                    value={profile.sexo}
                    label="Sexo"
                    onChange={(event) => changeCampoProfile('sexo', event.target.value)}
                >
                    <MenuItem value={'M'}>Masculino</MenuItem>
                    <MenuItem value={'F'}>Feminino</MenuItem>
                </Select>
            </div>

            <div>
                <TextField
                    id="outlined-basic"
                    // type="password"
                    label="Empresa:"
                    value={profile.empresa}
                    variant="outlined"
                    onChange={(event) => changeCampoProfile('empresa', event.target.value)}
                />
            </div>

            <div>
                <Button variant="contained" onClick={() => navigate('/tasks')} style={{margin: '10px'}} >Cancelar</Button>
                <Button variant="contained" type="submit">Salvar</Button>
            </div>
        </form>
    );

}

export const TelaPerfil = addUser(TelaPerfilComponent);