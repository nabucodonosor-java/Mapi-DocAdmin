import React from 'react';
import { Medico } from 'core/types/Medico';
import './styles.scss';

type Props = {
    medico: Medico;
}

const Card = ({ medico }: Props) => {

    return (
        <div className="card-base medico-card-report">
            <div className="text-center border-right">
                <img src={medico.imgUrl}
                    alt={medico.nome} className="medico-card-img-report" />
            </div>
            <div className="ml-2">
                <h6 className="mb-2">Especialidade: {medico.especialidades.map(e => e.nome)}</h6>
                
            <h6 className="card-content">Nome: {medico.nome}</h6>
            </div>
        </div>
    )
}

export default Card;