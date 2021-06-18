import React, { useState, useCallback, useEffect } from 'react';
import { Especialidade, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import MedicosFilters  from 'core/components/Filters/MedicosFilters';
import './styles.scss';

const List = () => {
    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [nome, setNome] = useState('');
    const [especialidade, setEspecialidade] = useState<Especialidade>();

    const getMedicos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome,
            especialidadeId: especialidade?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/medicos', params })
       .then(response => setMedicoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome, especialidade]);

    useEffect(() => {
        getMedicos();    
    }, [getMedicos]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const handleChangeEspecialidade = (especialidade: Especialidade) => {
        setActivePage(0);
        setEspecialidade(especialidade);
    }

    const clearFilters = () => {
        setActivePage(0);
        setEspecialidade(undefined);
        setNome('');
    }

    return (
        <div className="report-div">
            <h3 className="report-title">Pesquisas Avançadas - Médicos (as)</h3>
            <div className="d-flex justify-content-between admin-div-btn">
                <MedicosFilters
                    nome={nome}
                    especialidade={especialidade}
                    handleChangeEspecialidade={handleChangeEspecialidade}
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

export default List;