import React from 'react';
import { Medico } from 'core/types/Medico';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    medico: Medico;
    onRemove: (medicoId: number) => void;
} 

const Card = ({ medico, onRemove }: Props) => {

    return ( 
        <div className="card-base medico-card-admin">
                <div className="text-center border-right py-3">
                    <img src={medico.imgUrl}
                    alt={medico.nome} className="medico-card-img-admin" />
                </div>
                <div className="col-7 py-3">
                    {medico.especialidades.map(e => e.nome)}
                    <h3 className="card-content medico-card-name-admin mt-2 mb-2">
                        {medico.nome}
                    </h3>
                    <div>
                        
                        <span className="badge rounded-pill bg-secondary mr-2">
                                {medico?.especializacoes.map(c => " - " + c.nome + " - ")}
                        </span>
                         
                    </div>
                         
                </div>
                <div className="col-3 pt-3 pr-5">
                    <Link
                    to={`/admin/medicos/${medico.id}`}
                    type="button"
                    className="btn btn-outline-secondary btn-block border-radius-10 mb-3"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger btn-block border-radius-10"
                    onClick={() => onRemove(medico.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
    )
}

export default Card;