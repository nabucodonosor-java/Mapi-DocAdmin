import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { Servico } from 'core/types/Servico';
import { formatLocalDate } from 'core/utils/format';

type Props = {
    servico: Servico;
    onRemove: (servicoId: number) => void;
} 

const Card = ({ servico, onRemove }: Props) => {

    return ( 
        <div className="card-base especialidade-card-admin">
                <div className="col-9 py-1">
                    <span>{`Data: ${formatLocalDate(servico.date, "dd/MM/yyyy")}`}</span>
                    <div className="label-card">
                        <label>Nome do Funcionário: <strong>{servico.funcionario.nome}</strong></label>
                    </div>
                   
                    <span className="mr-5">{`Qtde de Serviços do dia: ${servico.qtdeServico}`}</span>
                    <span>{`Qtde de Serviços Finalizados: ${servico.qtdeFinalizado}`}</span> <br/>
                </div>
                <div className="col-3 especialidade-card-btn">
                    <Link
                    to={`/admin/servico/${servico.id}`}
                    type="button"
                    className="btn btn-outline-secondary border-radius-10 mr-5"
                    >
                    EDITAR
                    </Link>

                    <button
                    type="button"
                    className="btn btn-outline-danger border-radius-10"
                    onClick={() => onRemove(servico.id)}
                    >
                    EXCLUIR
                    </button>
                </div>
            </div>
    )
}

export default Card;