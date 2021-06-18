import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';
import { Atendimento } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select';
import './styles.scss';

type Props = {
    nome?: string;
    handleChangeName: (nome: string) => void;
    handleChangeAtendimento: (atendimento: Atendimento) => void;
    clearFilters: () => void;
    atendimento?: Atendimento; 
}

const MedicosAtendimentoFilters = ({ nome, handleChangeName, atendimento, handleChangeAtendimento, clearFilters }: Props) => {

    const [isLoadingAtendimento, setIsLoadingAtendimento] = useState(false);
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

    useEffect(() => { 
        setIsLoadingAtendimento(true);
        makePrivateRequest({ url: '/atendimento' })
            .then(response => setAtendimentos(response.data.content))
            .finally(() => setIsLoadingAtendimento(false));
    }, []);  

    return (
        <div className="card-base medico-filters-container">
            <div className="medico-input-search">
                <input
                    type="text"
                    value={nome}  
                    className="form-control"
                    placeholder="Pesquisar médico"
                    onChange={event => handleChangeName(event.target.value)}                  
                />
                <SearchIcon />
            </div>
            <Select
                name="atendimentos"
                key={`select-${atendimento?.id}`}
                value={atendimento}
                isLoading={isLoadingAtendimento}
                options={atendimentos}
                getOptionLabel={(option: Atendimento) => option.nome}
                getOptionValue={(option: Atendimento) => String(option.id)}
                className="medico-filter-select-container"
                classNamePrefix="medico-especializacoes-select"
                placeholder="Pesquisar por Atendimento"
                inputId="atendimentos"
                onChange={value => handleChangeAtendimento(value as Atendimento)}
                isClearable
            />
            <button 
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
                >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default MedicosAtendimentoFilters;