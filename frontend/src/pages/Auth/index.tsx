import React from 'react';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './styles.scss';

const Auth = () => ( 
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Base de Dados <br/> Jácomo Ortopedia
            </h1>
            <p className="auth-info-subtile">
                Base de visitação médica da Jácomo Ortopedia Técnica
            </p>
            <AuthImage />
        </div>
        <div className="auth-content">
            <Switch>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/auth/register">
                    <h1>PÁGINA EM CONSTRUÇÃO</h1>
                </Route>
                <Route path="/auth/recover">
                    <h1>PÁGINA EM CONSTRUÇÃO</h1>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Auth;