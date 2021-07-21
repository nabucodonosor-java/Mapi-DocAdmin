import React from "react"
import Loading from 'core/assets/images/loading.gif';
import './styles.scss';

const HomeLoader = () => {

    return (
        <div className="home-loader">
            <img className="home-img-loading" src={Loading} alt="Carregando ..." />
        </div>
    )
}

export default HomeLoader