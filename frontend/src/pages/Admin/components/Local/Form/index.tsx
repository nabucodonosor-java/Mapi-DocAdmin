import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import InputMask from 'react-input-mask';
import axios from 'axios';

import './styles.scss';

export type FormState = {
    id: number;
    nome: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    firstPhone: string;
    secondPhone: string;
}

type ParamsType = {
    localId: string;
}

const BASE_URL = 'https://viacep.com.br/ws';

type Address = {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { localId } = useParams<ParamsType>();

    const isEditing = localId !== 'create';
    const formTitle = isEditing ? 'Editar Local' : 'Cadastrar Local';

    const [searchValue, setSearchValue] = useState('');
    const [addressData, setAddressData] = useState<Address>();

    const handleSubmitCep = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAddressData(undefined);

        axios(`${BASE_URL}/${searchValue}/json`)
            .then(response => setAddressData(response.data))
            .catch(() => console.error('ERRO!'))
    }

    useEffect(() => {
        if (isEditing) {
            makePrivateRequest({ url: `/local/${localId}` })
                .then(response => { 

                setValue('nome', response.data.nome);
                setValue('searchValue', searchValue);
                setValue('cep', response.data.cep);
                setValue('logradouro', response.data.logradouro);
                setValue('complemento', response.data.complemento);
                setValue('bairro', response.data.bairro);
                setValue('localidade', response.data.localidade);
                setValue('uf', response.data.uf);
                setValue('firstPhone', response.data.firstPhone);
                setValue('secondPhone', response.data.secondPhone);
            })
        }
    }, [localId, isEditing, setValue, searchValue]);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }
        makePrivateRequest({
            url: isEditing ? `/local/${localId}` : '/local',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
            .then(() => {
                toast.info('Local salvo com sucesso!');
                history.push('/admin/local');
            })
            .catch(() => {
                toast.error('Erro ao salvar local!');
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmitCep}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">

                            <input
                                ref={register({ required: "Campo obrigatório" })}
                                name="nome"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do médico"
                            />
                            {errors.nome && (
                                <div className="invalid-feedback d-block">
                                    {errors.nome.message}
                                </div>
                            )}
                        </div>

                        <Controller
                            as={InputMask}
                            name="firstPhone"
                            rules={{ required: false }}
                            control={control}
                            mask="(99) 9999-9999"
                            id="firstPhone"
                            className="form-control input-base input-celular"
                            defaultValue=""
                            placeholder="Telefone 1"
                        />

                        <Controller
                            as={InputMask}
                            name="secondPhone"
                            rules={{ required: false }}
                            control={control}
                            mask="(99) 9999-9999"
                            id="secondPhone"
                            className="form-control input-base input-celular"
                            defaultValue=""
                            placeholder="Telefone 2"
                        />

                    </div>

                    <div className="margin-bottom-30">

                    <h6>Informações sobre Local de Visita</h6>
                                <div className="d-flex mt-2">
                                    <span className="admin-local-title mr-2">Busca CEP: </span>
                                    <input
                               
                                        ref={register({required: false})}
                                        name="searchValue"
                                        type="text" 
                                        className="form-control input-base input-busca-cep mr-2"
                                        placeholder="Informe o CEP"
                                        value={searchValue}
                                        onChange={event => setSearchValue(event.target.value)}
                                        id="searchValue"
                                    />
                                </div>
                        <div className="d-flex">

                        <input
                               
                                    ref={register({required: false})}
                                    name="cep"
                                    type="text" 
                                    className="form-control input-base input-cep mr-2"
                                    placeholder="CEP"
                                    value={searchValue}
                                    id="cep"
                                    />


                            <input
                                ref={register({ required: false })}
                                name="logradouro"
                                type="text" 
                                className="form-control input-base mr-2"
                                placeholder="Logradouro"
                                value={addressData?.logradouro}
                                id="logradouro"
                            />

                            <input
                                ref={register({ required: false })}
                                name="complemento"
                                type="text"
                                className="form-control input-base input-complemento"
                                placeholder="Compl"
                                id="complemento"
                            />

                        </div>

                        <div className="d-flex mt-2 mb-4">

                            <input
                                ref={register({ required: false })}
                                name="bairro"
                                type="text"
                                className="form-control input-base mr-2"
                                placeholder="Bairro"
                                value={addressData?.bairro}
                                id="bairro"
                            />

                            <input
                                ref={register({ required: false })}
                                name="localidade"
                                type="text"
                                className="form-control input-base mr-2"
                                placeholder="Cidade"
                                value={addressData?.localidade}
                                id="localidade"
                            />

                            <input
                                ref={register({ required: false })}
                                name="uf"
                                type="text"
                                className="form-control input-base input-uf"
                                placeholder="Uf"
                                value={addressData?.uf}
                                id="uf"
                            />
                        </div>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;