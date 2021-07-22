import React, { useState, useCallback, useEffect } from 'react';
import { Local, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
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
        makePrivateRequest({ url: `/medicos?page=${activePage}`, params })
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
                    <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Especialidade</th>
                                <th>CRM</th>
                                <th>Nome</th>
                                <th>Especializações</th>
                                <th>Locais de Atuação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicoResponse?.content.map(item => (
                                <tr key={item.id}>
                                    <td>{item.especialidades.map(e => e.nome)}</td>
                                    <td>{item.crm}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.especializacoes.map(e => e.nome)}</td>
                                    <td>{item.locais.map(l => l.nome + " ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
                {medicoResponse && (
                <Pagination 
                totalPages={medicoResponse.totalPages}
                onChange={page => setActivePage(page)}
                />
            )}             
            </div>
        </div>
    )
}

export default ListLocal;