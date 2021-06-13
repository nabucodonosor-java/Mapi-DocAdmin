import React, { useState, useCallback, useEffect } from 'react';
import { Atendimento, MedicoResponse } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import AtendimentosFilters from 'core/components/Filters/AtendimentoFilters';

const ListAtendimentos = () => {
    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [nome, setNome] = useState('');
    const [atendimento, setAtendimento] = useState<Atendimento>();

    const getMedicos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 20,
            direction: 'ASC',
            orderBy: 'nome',
            nome,
            atendimentoId: atendimento?.id
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/medicos/atendimento', params })
       .then(response => setMedicoResponse(response.data))
       .finally(() => {
        setIsLoading(false);
       })
    }, [activePage, nome, atendimento]);

    useEffect(() => {
        getMedicos();    
    }, [getMedicos]);
    
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setNome(name);
    }

    const handleChangeAtendimento = (atendimento: Atendimento) => {
        setActivePage(0);
        setAtendimento(atendimento);
    }

    const clearFilters = () => {
        setActivePage(0);
        setAtendimento(undefined);
        setNome('');
    }

    const onRemove = (medicoId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este produto?');

        if (confirm) {
            makePrivateRequest({ url: `/medicos/${medicoId}`, method: 'DELETE' })
            .then(() => {
                toast.info('Médico deletado com sucesso!');
                getMedicos();
            })
            .catch(() => {
                toast.error('Erro ao deletar médico');
            })
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <AtendimentosFilters
                    nome={nome}
                    atendimento={atendimento}
                    handleChangeAtendimento={handleChangeAtendimento}
                    handleChangeName={handleChangeName}
                    clearFilters={clearFilters}
                    />
            </div>
            
            <div className="admin-list-container">
                {isLoading ? <CardLoader /> : (
                    medicoResponse?.content.map(medico => (
                        <Card medico={medico} key={medico.id} onRemove={onRemove} />
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

export default ListAtendimentos;