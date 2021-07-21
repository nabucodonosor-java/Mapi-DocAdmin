import React from "react"
import Loading from 'core/assets/images/loading.gif';

const HomeLoader = () => {

    return (
        <div>
            <img src={Loading} alt="Carregando ..." />
        </div>
    )
}

export default HomeLoader