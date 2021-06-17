import React from 'react';
import { Especialidade } from 'core/types/Medico';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    especialidade: Especialidade;
    onRemove: (especialidadeId: number) => void;
} 

const Card = ({ especialidade, onRemove }: Props) => {

    return ( 
        <div className="card-base especialidade-card-admin">
                <div className="col-9 py-3">
                   <h6>{especialidade.nome}</h6>
                         
                </div>
                <div className="col-3 especialidade-card-btn">
                    <Link
                    to={`/admin/especialidade/${especialidade.id}`}
                    type="button"
                    className="btn btn-outline-secondary border-radius-10 mr-5"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger border-radius-10"
                    onClick={() => onRemove(especialidade.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
    )
}

export default Card;