import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Especialidade, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import MedicoCard from './components/MedicoCard';
import MedicoCardLoader from './components/Loaders/MedicoCardLoader';
import Pagination from 'core/components/Pagination';
import MedicoFilters from 'core/components/Filters/MedicosFilters';
import './styles.scss';

const Catalog = () => {

    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [nome, setNome] = useState('');
    const [especialidade, setEspecialidade] = useState<Especialidade>();

    const getMedicos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 15,
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
        <div className="catalog-container">
            <div className="catalog-filter-container">

                <MedicoFilters
                    nome={nome}
                    especialidade={especialidade}
                    handleChangeEspecialidade={handleChangeEspecialidade}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                />
            </div>
            <div className="catalog-medicos">
                {isLoading ? <MedicoCardLoader /> : (
                    medicoResponse?.content.map(medico => (
                        <Link to={`/medicos/${medico.id}`} key={medico.id}>
                            <MedicoCard medico={medico} />
                        </Link>
                    ))
                )}
            </div>
            {medicoResponse && (
                <Pagination
                    totalPages={medicoResponse.totalPages}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default Catalog;