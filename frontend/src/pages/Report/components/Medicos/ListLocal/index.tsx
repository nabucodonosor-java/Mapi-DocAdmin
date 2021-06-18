import React, { useState, useCallback, useEffect } from 'react';
import { Local, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import MedicosLocalFilters  from 'core/components/Filters/MedicosLocalFilters';
import './styles.scss';

const ListLocal = () => {
    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [nome, setNome] = useState('');
    const [local, setLocal] = useState<Local>();

    const getLocais = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome,
            localId: local?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/medicos/local', params })
       .then(response => setMedicoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome, local]);

    useEffect(() => {
        getLocais();    
    }, [getLocais]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const handleChangeLocal = (local: Local) => {
        setActivePage(0);
        setLocal(local);
    }

    const clearFilters = () => {
        setActivePage(0);
        setLocal(undefined);
        setNome('');
    }

    return (
        <div className="report-div">
            <h3 className="report-title">Pesquisas Avançadas - Médicos (as)</h3>
            <div className="d-flex justify-content-between admin-div-btn">
                <MedicosLocalFilters
                    nome={nome}
                    local={local}
                    handleChangeLocal={handleChangeLocal}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    medicoResponse?.content.map(medico => (
                        <Card medico={medico} key={medico.id} />
                    ))
                )}
                {medicoResponse && (
                <Pagination 
                totalPages={medicoResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default ListLocal;