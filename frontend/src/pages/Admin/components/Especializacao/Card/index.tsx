import React from 'react';
import { Especializacao } from 'core/types/Medico';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    especializacao: Especializacao;
    onRemove: (especializacaoId: number) => void;
} 

const Card = ({ especializacao, onRemove }: Props) => {

    return ( 
        <div className="card-base especialidade-card-admin">
                <div className="col-9 py-3">
                   <h6>{especializacao.nome}</h6>
                         
                </div>
                <div className="col-3 especialidade-card-btn">
                    <Link
                    to={`/admin/especializacao/${especializacao.id}`}
                    type="button"
                    className="btn btn-outline-secondary border-radius-10 mr-5"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger border-radius-10"
                    onClick={() => onRemove(especializacao.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
    )
}

export default Card;