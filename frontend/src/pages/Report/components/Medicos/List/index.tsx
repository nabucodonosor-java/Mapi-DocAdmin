import React, { useState, useCallback, useEffect } from 'react';
import { Especialidade, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
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
            linesPerPage: 10,
            direction: 'ASC',
            orderBy: 'nome',
            nome,
            especialidadeId: especialidade?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: `/medicos?page=${activePage}`, params })
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
                    <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Especialidade</th>
                                <th>CRM</th>
                                <th>Nome</th>
                                <th>Especializações</th>
                                <th>Dias de Atendimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicoResponse?.content.map(item => (
                                <tr key={item.id}>
                                    <td>{item.especialidades.map(e => e.nome)}</td>
                                    <td>{item.crm}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.especializacoes.map(e => e.nome)}</td>
                                    <td>{item.atendimentos.map(a => a.nome + " ")}</td>
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

export default List;