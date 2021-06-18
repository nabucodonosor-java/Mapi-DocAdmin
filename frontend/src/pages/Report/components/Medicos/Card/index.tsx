import React from 'react';
import { Medico } from 'core/types/Medico';
import './styles.scss';

type Props = {
    medico: Medico;
}

const Card = ({ medico }: Props) => {

    return (
        <div className="card-base medico-card-report">
            <div className="text-center border-right col-1">
                <img src={medico.imgUrl}
                    alt={medico.nome} className="medico-card-img-report" />
            </div>
            <div className="medico-card-report">
                <h6 className="mr-2 col-3">{medico.especialidades.map(e => e.nome)}</h6>

                <h6 className="card-content mr-2 col-9">{medico.nome}</h6>

                <span className="badge rounded-pill bg-secondary ml-2 mr-2 report-card-medico-especializacoes">
                        {medico?.especializacoes.map(c => " - " + c.nome + " - ")}
                </span>

            </div>

        </div>
    )
}

export default Card;