import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Especializacao, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import MedicoCard from './components/MedicoCard';
import MedicoCardLoader from './components/Loaders/MedicoCardLoader';
import Pagination from 'core/components/Pagination';
import MedicoFilters from 'core/components/MedicosFilters';
import './styles.scss';

const Catalog = () => {

    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [nome, setNome] = useState('');
    const [especializacao, setEspecializacao] = useState<Especializacao>();

    const getMedicos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 15,
            nome,
            especializacaoId: especializacao?.id
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/medicos', params })
       .then(response => setMedicoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome, especializacao]);

    useEffect(() => {
        getMedicos();
    }, [getMedicos]);

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const handleChangeEspecializacao = (especializacao: Especializacao) => {
        setActivePage(0);
        setEspecializacao(especializacao);
    }

    const clearFilters = () => {
        setActivePage(0);
        setEspecializacao(undefined);
        setNome('');
    }

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className="catalog-title">
                    Catálogo de Médicos(as)
                </h1>
                <MedicoFilters
                    nome={nome}
                    especializacao={especializacao}
                    handleChangeEspecializacao={handleChangeEspecializacao}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            <div className="catalog-medicos">
                {isLoading ? <MedicoCardLoader /> : (
                    medicoResponse?.content.map(medico => (
                        <Link to={`/medicos/${medico.id}`} key={medico.id}>
                            <MedicoCard medico={medico}/>
                        </Link> 
                     ))
                )}           
            </div>
            {medicoResponse && (
                <Pagination 
                totalPages={medicoResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default Catalog;