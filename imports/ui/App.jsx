import React, {Fragment} from 'react';
import {TelaLogin} from "./telas/TelaLogin";
import { useTracker } from 'meteor/react-meteor-data';
import {TelaTarefas} from "./telas/TelaTarefas";
import {Route, Routes} from "react-router-dom";
import {TelaEditarTarefa} from "./telas/TelaEditarTarefa";
import {TelaPerfil} from "./telas/TelaPerfil";

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <Fragment>
        <Routes>
            <Route index element={<TelaLogin />} />
            <Route path="/tasks" element={<TelaTarefas />} />
            <Route path="/editar/:id" element={<TelaEditarTarefa />} />
            <Route path="/perfil" element={<TelaPerfil />} />
        </Routes>
        </Fragment>
    );
};
