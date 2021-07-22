import React, { useState, useCallback, useEffect } from 'react';
import { ServicoResponse } from 'core/types/Servico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import './styles.scss';
import CardLoader from '../Loaders/MedicoCardLoader';

const List = () => {
    const [servicoResponse, setServicoResponse] = useState<ServicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();

    const getServicos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 5,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        
        makePrivateRequest({ url: '/servicos', params })
       .then(response => setServicoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage]);

    useEffect(() => {
        getServicos();    
    }, [getServicos]);

    const handleCreate = () => { 
        history.push('/admin/servico/create'); 
    }

    const onRemove = (servicoId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este serviço?');

        if (confirm) {
            makePrivateRequest({ url: `/servicos/${servicoId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Serviço deletado com sucesso!');
                getServicos();
            })
            .catch(() => {
                toast.error('Erro ao deletar serviço');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-5" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    servicoResponse?.content.map(servico => (
                        <Card servico={servico} key={servico.id} onRemove={onRemove} />
                    ))
                )}
                {servicoResponse && (
                <Pagination 
                totalPages={servicoResponse.totalPages}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;