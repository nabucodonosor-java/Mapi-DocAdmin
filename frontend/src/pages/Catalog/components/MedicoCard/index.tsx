import { Medico } from 'core/types/Medico';
import React from 'react';
import './styles.scss';

type Props = {
    medico: Medico;
}

const MedicoCard = ({ medico }: Props) => (
    <div className="card-base border-radius-10 medico-card">
        <img src={medico.imgUrl} alt={medico.nome} className="medico-card-image"/>
        <div className="medico-card-info">
            <h6 className="medico-card-name">
                {medico.nome}
            </h6>
            <div className="medico-card-especialidade">
                {medico.especialidades.map(e => e.nome)}
            </div>
            <div className="medico-card-especializacao">
                        
                <span className="badge rounded-pill bg-secondary mr-2">
                        {medico?.especializacoes.map(c => " - " + c.nome + " - ")}
                </span>
                         
            </div>  
        </div>
    </div>
);

export default MedicoCard;