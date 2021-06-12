import React, { useState, useCallback, useEffect } from 'react';
import { Especializacao, MedicoResponse } from 'core/types/Medico';
import { useHistory } from 'react-router-dom';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import CardLoader from '../Loaders/MedicoCardLoader';
import Card from '../Card';
import Pagination from 'core/components/Pagination';
import MedicosFilters  from 'core/components/MedicosFilters';

const List = () => {
    const [medicoResponse, setMedicoResponse] = useState<MedicoResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const history = useHistory();
    const [nome, setNome] = useState('');
    const [especializacao, setEspecializacao] = useState<Especializacao>();

    const getMedicos = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            direction: 'DESC',
            orderBy: 'id',
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

    const handleCreate = () => { 
        history.push('/admin/medicos/create'); 
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
                <button className="btn btn-primary btn-lg mr-5" onClick={handleCreate}>
                    ADICIONAR
                </button>
                <MedicosFilters
                    nome={nome}
                    especializacao={especializacao}
                    handleChangeEspecializacao={handleChangeEspecializacao}
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

export default List;