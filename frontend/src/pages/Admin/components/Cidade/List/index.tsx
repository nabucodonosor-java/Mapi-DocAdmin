import React, { useState, useCallback, useEffect } from 'react';
import { CidadeResponse } from 'core/types/Medico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import CidadeFilters  from 'core/components/Filters/CidadeFilters';
import './styles.scss';

const List = () => {
    const [cidadeResponse, setCidadeResponse] = useState<CidadeResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [nome, setNome] = useState('');

    const getCidades = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/cidade', params })
       .then(response => setCidadeResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome]);

    useEffect(() => {
        getCidades();    
    }, [getCidades]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setNome('');
    }

    const handleCreate = () => { 
        history.push('/admin/cidade/create'); 
    }

    const onRemove = (cidadeId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta cidade?');

        if (confirm) {
            makePrivateRequest({ url: `/cidade/${cidadeId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Cidade deletada com sucesso!');
                getCidades();
            })
            .catch(() => {
                toast.error('Erro ao deletar cidade');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-3" onClick={handleCreate}>
                    ADICIONAR
                </button>

                <CidadeFilters
                nome={nome}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    cidadeResponse?.content.map(cidade => (
                        <Card cidade={cidade} key={cidade.id} onRemove={onRemove} />
                    ))
                )}
                {cidadeResponse && (
                <Pagination 
                totalPages={cidadeResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;