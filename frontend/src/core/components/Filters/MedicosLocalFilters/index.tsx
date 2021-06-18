import React, { useEffect, useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/lupa.svg';
import { Local } from 'core/types/Medico';
import { makePrivateRequest } from 'core/utils/request';
import Select from 'react-select';
import './styles.scss';

type Props = {
    nome?: string;
    handleChangeName: (nome: string) => void;
    handleChangeLocal: (local: Local) => void;
    clearFilters: () => void;
    local?: Local; 
}

const MedicosLocalFilters = ({ nome, handleChangeName, local, handleChangeLocal, clearFilters }: Props) => {

    const [isLoadingLocal, setIsLoadingLocal] = useState(false);
    const [locais, setLocais] = useState<Local[]>([]);

    useEffect(() => { 
        setIsLoadingLocal(true);
        makePrivateRequest({ url: '/local' })
            .then(response => setLocais(response.data.content))
            .finally(() => setIsLoadingLocal(false));
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
                name="locais"
                key={`select-${local?.id}`}
                value={local}
                isLoading={isLoadingLocal}
                options={locais}
                getOptionLabel={(option: Local) => option.nome}
                getOptionValue={(option: Local) => String(option.id)}
                className="medico-filter-select-container"
                classNamePrefix="medico-especializacoes-select"
                placeholder="Pesquisar por Local"
                inputId="locais"
                onChange={value => handleChangeLocal(value as Local)}
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

export default MedicosLocalFilters;