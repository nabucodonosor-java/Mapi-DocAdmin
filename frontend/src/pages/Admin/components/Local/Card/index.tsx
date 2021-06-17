import React from 'react';
import { Local } from 'core/types/Medico';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    local: Local;
    onRemove: (localId: number) => void;
} 

const Card = ({ local, onRemove }: Props) => {

    return ( 
        <div className="card-base especialidade-card-admin">
                <div className="col-9 py-3">
                   <h6>{local.nome}</h6>
                    <span>{`${local.logradouro} ${local.complemento}`}</span> <br/>
                    <span>{`${local.localidade} / ${local.uf}`}</span>
                </div>
                <div className="col-3 especialidade-card-btn">
                    <Link
                    to={`/admin/local/${local.id}`}
                    type="button"
                    className="btn btn-outline-secondary border-radius-10 mr-5"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger border-radius-10"
                    onClick={() => onRemove(local.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
    )
}

export default Card;