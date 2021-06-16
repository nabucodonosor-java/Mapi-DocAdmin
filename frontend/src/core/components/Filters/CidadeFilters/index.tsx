import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';
import { Especialidade } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select';
import './styles.scss';

type Props = {
    nome?: string;
    handleChangeName: (nome: string) => void;
    handleChangeEspecialidade: (especialidade: Especialidade) => void;
    clearFilters: () => void;
    especialidade?: Especialidade; 
}

const MedicoFilters = ({ nome, handleChangeName, especialidade, handleChangeEspecialidade, clearFilters }: Props) => {

    const [isLoadingEspecialidade, setIsLoadingEspecialidade] = useState(false);
    const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

    useEffect(() => { 
        setIsLoadingEspecialidade(true);
        makePrivateRequest({ url: '/especialidade' })
            .then(response => setEspecialidades(response.data.content))
            .finally(() => setIsLoadingEspecialidade(false));
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
                name="especialidades"
                key={`select-${especialidade?.id}`}
                value={especialidade}
                isLoading={isLoadingEspecialidade}
                options={especialidades}
                getOptionLabel={(option: Especialidade) => option.nome}
                getOptionValue={(option: Especialidade) => String(option.id)}
                className="medico-filter-select-container"
                classNamePrefix="medico-especializacoes-select"
                placeholder="Pesquisar por Especialidade"
                inputId="especialidades"
                onChange={value => handleChangeEspecialidade(value as Especialidade)}
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

export default MedicoFilters;