import React, { useState, useCallback, useEffect } from 'react';
import { LocalResponse } from 'core/types/Medico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import LocalFilters  from 'core/components/Filters/LocalFilters';
import './styles.scss';

const List = () => {
    const [localResponse, setLocalResponse] = useState<LocalResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [nome, setNome] = useState('');

    const getLocais = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/local', params })
       .then(response => setLocalResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome]);

    useEffect(() => {
        getLocais();    
    }, [getLocais]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setNome('');
    }

    const handleCreate = () => { 
        history.push('/admin/local/create'); 
    }

    const onRemove = (localId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este local?');

        if (confirm) {
            makePrivateRequest({ url: `/local/${localId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Local deletado com sucesso!');
                getLocais();
            })
            .catch(() => {
                toast.error('Erro ao deletar local');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-5" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <LocalFilters
                    nome={nome}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    localResponse?.content.map(local => (
                        <Card local={local} key={local.id} onRemove={onRemove} />
                    ))
                )}
                {localResponse && (
                <Pagination 
                totalPages={localResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;