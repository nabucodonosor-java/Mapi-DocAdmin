import React from 'react';
import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import './styles.scss';

const Home = () => (
    <div className="home-container">
       
        <div className="home-content card-base border-radius-20">       
            <div className="home-text">
                <h1 className="text-title">
                    Base de Médicos
                </h1>
                <p className="text-subtitle">
                    Base de Dados de visitação de Ribeirão Preto e região, Araraquara/São Carlos e micro região.
                </p>
                <Link to="/medicos" className="btn-search">
                    <ButtonIcon text="inicie agora a sua busca" />
                </Link>
            </div>
            <div className="col-6">
            <h1 className="text-title">
                    Laboratório
                </h1>
                <p className="text-subtitle">
                    Análise via dashboard dos serviços do laboratório ortopédico com gráficos por técnico ortopédico
                </p>
               
                <Link to="/dashboard" className="btn-search">
                    <ButtonIcon text="DashBoard Laboratório" />
                </Link>
            </div>
        </div>
    </div>
);

export default Home;