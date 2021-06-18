import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';
import { Cidade } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select';
import './styles.scss';

type Props = {
    nome?: string;
    handleChangeName: (nome: string) => void;
    handleChangeCidade: (cidade: Cidade) => void;
    clearFilters: () => void;
    cidade?: Cidade; 
}

const MedicosCidadeFilters = ({ nome, handleChangeName, cidade, handleChangeCidade, clearFilters }: Props) => {

    const [isLoadingCidade, setIsLoadingCidade] = useState(false);
    const [cidades, setCidades] = useState<Cidade[]>([]);

    useEffect(() => { 
        setIsLoadingCidade(true);
        makePrivateRequest({ url: '/cidade' })
            .then(response => setCidades(response.data.content))
            .finally(() => setIsLoadingCidade(false));
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
                name="cidades"
                key={`select-${cidade?.id}`}
                value={cidade}
                isLoading={isLoadingCidade}
                options={cidades}
                getOptionLabel={(option: Cidade) => option.nome}
                getOptionValue={(option: Cidade) => String(option.id)}
                className="medico-filter-select-container"
                classNamePrefix="medico-especializacoes-select"
                placeholder="Pesquisar por Cidade"
                inputId="cidades"
                onChange={value => handleChangeCidade(value as Cidade)}
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

export default MedicosCidadeFilters;