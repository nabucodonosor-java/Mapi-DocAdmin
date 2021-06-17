import React, { useState, useCallback, useEffect } from 'react';
import { EspecializacaoResponse } from 'core/types/Medico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import EspecializacaoFilters  from 'core/components/Filters/EspecializacaoFilters';
import './styles.scss';

const List = () => {
    const [especializacaoResponse, setEspecializacaoResponse] = useState<EspecializacaoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [nome, setNome] = useState('');

    const getEspecializacoes = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/especializacao', params })
       .then(response => setEspecializacaoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome]);

    useEffect(() => {
        getEspecializacoes();    
    }, [getEspecializacoes]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setNome('');
    }

    const handleCreate = () => { 
        history.push('/admin/especializacao/create'); 
    }

    const onRemove = (especializacaoId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta especialização?');

        if (confirm) {
            makePrivateRequest({ url: `/especializacao/${especializacaoId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Especialização deletada com sucesso!');
                getEspecializacoes();
            })
            .catch(() => {
                toast.error('Erro ao deletar especialização');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-3" onClick={handleCreate}>
                    ADICIONAR
                </button>

                <EspecializacaoFilters
                nome={nome}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    especializacaoResponse?.content.map(especializacao => (
                        <Card especializacao={especializacao} key={especializacao.id} onRemove={onRemove} />
                    ))
                )}
                {especializacaoResponse && (
                <Pagination 
                totalPages={especializacaoResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;