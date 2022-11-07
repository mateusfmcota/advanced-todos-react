import { Meteor } from 'meteor/meteor';
import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";

export const TelaLogin = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const submit = e => {
        e.preventDefault();
        Meteor.loginWithPassword(usuario, senha,(cb) => console.log(`cb: ${cb}`) );
        window.location.replace('tasks')
    }

    return (
      <form onSubmit={submit} className='login-form'>
          <div>
              <label className='welcome-label'>Bem vindo ao todo-list</label>
          </div>
          <div>
              <TextField
                  id="outlined-basic"
                  label="Usuário"
                  variant="outlined"
                  onChange={e => setUsuario(e.target.value)}
              />
          </div>
          <div>
              <TextField
                  id="outlined-basic"
                  type="password"
                  label="Senha"
                  variant="outlined"
                  onChange={e => setSenha(e.target.value)}
              />
          </div>

          <div>
              <Button variant="contained" type="submit">Entrar</Button>
          </div>
          <div>
              <Button variant="text">Cadastrar</Button>
          </div>
          <div>
              <Button variant="text">Recuperar Senha</Button>
          </div>
      </form>
    );

}