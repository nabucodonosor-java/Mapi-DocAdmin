import React, { useState, useCallback, useEffect } from 'react';
import { Cidade, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import CardLoader from '../Loaders/MedicoCardLoader';
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
                    <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Especialidade</th>
                                <th>CRM</th>
                                <th>Nome</th>
                                <th>Especializações</th>
                                <th>Cidades de Atuação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicoResponse?.content.map(item => (
                                <tr key={item.id}>
                                    <td>{item.especialidades.map(e => e.nome)}</td>
                                    <td>{item.crm}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.especializacoes.map(e => e.nome + "  ")}</td>
                                    <td>{item.cidades.map(c =>c.nome + "  ")}</td>
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

export default ListCidade;