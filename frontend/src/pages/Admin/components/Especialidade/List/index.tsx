import React, { useState, useCallback, useEffect } from 'react';
import { EspecialidadeResponse } from 'core/types/Medico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import EspecialidadesFilters  from 'core/components/Filters/EspecialidadesFilters';
import './styles.scss';

const List = () => {
    const [especialidadeResponse, setEspecialidadeResponse] = useState<EspecialidadeResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [nome, setNome] = useState('');

    const getEspecialidades = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/especialidade', params })
       .then(response => setEspecialidadeResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome]);

    useEffect(() => {
        getEspecialidades();    
    }, [getEspecialidades]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setNome('');
    }

    const handleCreate = () => { 
        history.push('/admin/especialidade/create'); 
    }

    const onRemove = (especialidadeId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta especialidade?');

        if (confirm) {
            makePrivateRequest({ url: `/especialidade/${especialidadeId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Médico deletado com sucesso!');
                getEspecialidades();
            })
            .catch(() => {
                toast.error('Erro ao deletar especialidade');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between admin-div-btn">
                <button className="btn btn-primary btn-lg admin-btn-add mr-3" onClick={handleCreate}>
                    ADICIONAR
                </button>

                <EspecialidadesFilters
                nome={nome}
                handleChangeName={handleChangeName}
                clearFilters={clearFilters}
                />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    especialidadeResponse?.content.map(especialidade => (
                        <Card especialidade={especialidade} key={especialidade.id} onRemove={onRemove} />
                    ))
                )}
                {especialidadeResponse && (
                <Pagination 
                totalPages={especialidadeResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default List;