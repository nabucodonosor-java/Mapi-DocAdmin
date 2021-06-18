import React, { useState, useCallback, useEffect } from 'react';
import { Cidade, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import MedicosCidadeFilters  from 'core/components/Filters/MedicosCidadeFilters';
import './styles.scss';

const ListCidade = () => {
    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState<Cidade>();

    const getLocais = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome,
            cidadeId: cidade?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/medicos/cidade', params })
       .then(response => setMedicoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome, cidade]);

    useEffect(() => {
        getLocais();    
    }, [getLocais]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const handleChangeCidade = (cidade: Cidade) => {
        setActivePage(0);
        setCidade(cidade);
    }

    const clearFilters = () => {
        setActivePage(0);
        setCidade(undefined);
        setNome('');
    }

    return (
        <div className="report-div">
            <h3 className="report-title">Pesquisas Avançadas - Médicos (as)</h3>
            <div className="d-flex justify-content-between admin-div-btn">
                <MedicosCidadeFilters
                    nome={nome}
                    cidade={cidade}
                    handleChangeCidade={handleChangeCidade}
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

export default ListCidade;