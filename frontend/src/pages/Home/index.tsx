import React from 'react';
import { ReactComponent as MainImage } from 'core/assets/images/main-image.svg';
import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import './styles.scss';

const Home = () => (
    <div className="home-container">
       <div className="row home-content card-base border-radius-20">
           <div className="col-6">
                <h1 className="text-title">Base de Médicos<br/> Jácomo Aricó</h1>
                <p className="text-subtitle"> 
                   Base de Dados de visitação de Ribeirão Preto e região, Araraquara/São Carlos e micro região.
                </p>
                <Link to="/medicos">
                    <ButtonIcon text="inicie agora a sua busca" />
                </Link>
           </div>
           <div className="col-6">
                <MainImage className="main-images" />
           </div>
       </div>
    </div>
);

export default Home;