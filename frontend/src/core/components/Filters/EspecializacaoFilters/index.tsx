import React, { useEffect, useState } from 'react';
import { Especializacao } from 'core/types/Medico';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select'; 
import './styles.scss';


type Props = {
    nome?: string;
    handleChangeName: (nome: string) => void;
    handleChangeEspecializacao: (especializacao: Especializacao) => void;
    clearFilters: () => void;
    especializacao?: Especializacao; 
}

const EspecializacaoFilters = ({ nome, handleChangeName, especializacao, handleChangeEspecializacao, clearFilters }: Props) => {

    const [isLoadingEspecializacao, setIsLoadingEspecializacao] = useState(false);
    const [especializacoes, setEspecializacoes] = useState<Especializacao[]>([]);

    useEffect(() => { 
        setIsLoadingEspecializacao(true);
        makePrivateRequest({ url: '/especializacao' })
            .then(response => setEspecializacoes(response.data.content))
            .finally(() => setIsLoadingEspecializacao(false));
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
                name="especializacoes"
                key={`select-${especializacao?.id}`}
                value={especializacao}
                isLoading={isLoadingEspecializacao}
                options={especializacoes}
                getOptionLabel={(option: Especializacao) => option.nome}
                getOptionValue={(option: Especializacao) => String(option.id)}
                className="medico-filter-select-container"
                classNamePrefix="medico-especializacoes-select"
                placeholder="Pesquisar por Especialização"
                inputId="especializacoes"
                onChange={value => handleChangeEspecializacao(value as Especializacao)}
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

export default EspecializacaoFilters;