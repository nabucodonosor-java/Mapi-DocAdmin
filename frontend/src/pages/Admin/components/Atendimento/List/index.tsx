import React, { useState, useCallback, useEffect } from 'react';
import { AtendimentoResponse } from 'core/types/Medico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import AtendimentoFilters  from 'core/components/Filters/AtendimentoFilters';
import './styles.scss';

const List = () => {
    const [atendimentoResponse, setAtendimentoResponse] = useState<AtendimentoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [nome, setNome] = useState('');

    const getAtendimentos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'id',
            nome
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/atendimento', params })
       .then(response => setAtendimentoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome]);

    useEffect(() => {
        getAtendimentos();    
    }, [getAtendimentos]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setNome('');
    }

    const handleCreate = () => { 
        history.push('/admin/atendimento/create'); 
    }

    const onRemove = (atendimentoId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este atendimento?');

        if (confirm) {
            makePrivateRequest({ url: `/atendimento/${atendimentoId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Atendimento deletado com sucesso!');
                getAtendimentos();
            })
            .catch(() => {
                toast.error('Erro ao deletar atendimento');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-3" onClick={handleCreate}>
                    ADICIONAR
                </button>

                <AtendimentoFilters
                nome={nome}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    atendimentoResponse?.content.map(atendimento => (
                        <Card atendimento={atendimento} key={atendimento.id} onRemove={onRemove} />
                    ))
                )}
                {atendimentoResponse && (
                <Pagination 
                totalPages={atendimentoResponse.totalPages}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;