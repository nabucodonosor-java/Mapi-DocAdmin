import React, { useEffect, useState } from 'react';
import { Atendimento, Cidade, Especialidade, Especializacao, Local } from 'core/types/Medico';
import './styles.scss';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import Select from 'react-select';
import ImageUpload from '../ImageUpload';
import InputMask from 'react-input-mask';
import axios from 'axios';

export type FormState = {
    id: number;
    imgUrl: string;
    crm: string;
    nome: string;
    celular: string;
    email: string;
    dataNascimento: Date;
    curriculo: string;
    horarioAtendimento: string;
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    visitaAgendada: Date;
    especializacoes: Especializacao[];
    especialidades: Especialidade[];
    atendimentos: Atendimento[];
    locais: Local[];
    cidades: Cidade[];
}

type ParamsType = {
    medicoId: string;
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
    const { medicoId } = useParams<ParamsType>();
    const [isLoadingEspecializacoes, setIsLoadingEspecializacoes] = useState(false);
    const [especializacoes, setEspecializacoes] = useState<Especializacao[]>([]);
    const [isLoadingEspecialidades, setIsLoadingEspecialidades] = useState(false);
    const [especialidades, setEspecialidades] = useState<Especializacao[]>([]);
    const [isLoadingAtendimentos, setIsLoadingAtendimentos] = useState(false);
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

    const [isLoadingCidades, setIsLoadingCidades] = useState(false);
    const [cidades, setCidades] = useState<Cidade[]>([]);

    const [isLoadingLocais, setIsLoadingLocais] = useState(false);
    const [locais, setLocais] = useState<Local[]>([]);
    
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [medicoImgUrl, setMedicoImgUrl] = useState('');
    const isEditing = medicoId !== 'create';
    const formTitle = isEditing ? 'Editar Médico' : 'Cadastrar Médico';

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
        makePrivateRequest({ url: `/medicos/${medicoId}`})
        .then(response => {
            
            setValue('crm', response.data.crm);
            setValue('nome', response.data.nome);
            setValue('celular', response.data.celular);
            setValue('email', response.data.email);
            setValue('curriculo', response.data.curriculo);
            setValue('horarioAtendimento', response.data.horarioAtendimento);
            setValue('cep', response.data.cep = searchValue);
            setValue('logradouro', response.data.logradouro = addressData?.logradouro as string);
            setValue('complemento', response.data.complemento);
            setValue('bairro', response.data.bairro = addressData?.bairro as string);
            setValue('localidade', response.data.localidade = addressData?.localidade as string);
            setValue('uf', response.data.uf = addressData?.uf as string);

            setValue('especialidades', response.data.especialidades);
            setValue('especializacoes', response.data.especializacoes);
            setValue('atendimentos', response.data.atendimentos);
            setValue('cidades', response.data.cidades);
            setValue('locais', response.data.locais);

            setMedicoImgUrl(response.data.imgUrl);
        })
       }
    }, [medicoId, isEditing, setValue, searchValue, addressData?.logradouro,
        addressData?.bairro, addressData?.localidade, addressData?.uf]);

    useEffect(() => {
        setIsLoadingEspecialidades(true);
        makePrivateRequest({ url: '/especialidade' })
            .then(response => setEspecialidades(response.data.content))
            .finally(() => setIsLoadingEspecialidades(false));
    }, []);

    useEffect(() => {
        setIsLoadingEspecializacoes(true);
        makePrivateRequest({ url: '/especializacao' })
            .then(response => setEspecializacoes(response.data.content))
            .finally(() => setIsLoadingEspecializacoes(false));
    }, []);

    useEffect(() => {
        setIsLoadingAtendimentos(true);
        makePrivateRequest({ url: '/atendimento' })
            .then(response => setAtendimentos(response.data.content))
            .finally(() => setIsLoadingAtendimentos(false));
    }, []);

    useEffect(() => {
        setIsLoadingCidades(true);
        makePrivateRequest({ url: '/cidade' })
            .then(response => setCidades(response.data.content))
            .finally(() => setIsLoadingCidades(false));
    }, []);

    useEffect(() => {
        setIsLoadingLocais(true);
        makePrivateRequest({ url: '/local' })
            .then(response => setLocais(response.data.content))
            .finally(() => setIsLoadingLocais(false));
    }, []);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data,
            imgUrl: uploadedImgUrl || medicoImgUrl
        }
        makePrivateRequest({
            url: isEditing ? `/medicos/${medicoId}` : '/medicos',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
        .then(() => {
            toast.info('Médico salvo com sucesso!'); 
            history.push('/admin/medicos');
        })
        .catch(() => {
            toast.error('Erro ao salvar médico!');
        })
    }

    const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmitCep}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                            <div className="margin-bottom-30">
                            <Controller
                                as={Select}
                                name="especialidades"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingEspecialidades}
                                options={especialidades}
                                getOptionLabel={(option: Especialidade) => option.nome}
                                getOptionValue={(option: Especialidade) => String(option.id)}
                                classNamePrefix="especializacoes-select"
                                className="input-select"
                                placeholder="Especialidade médica"
                                inputId="especialidades"
                                defaultValue=""
                                isMulti
                                />
                                {errors.especialidades && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório!
                                </div>
                                )}
                            </div>

                            <div className="margin-bottom-30 d-flex">

                                <input 
                                ref={register({required: false})}
                                name="crm"
                                type="text" 
                                className="form-control input-base input-crm"
                                placeholder="CRM do médico"
                                />

                                <input 
                                ref={register({required: "Campo obrigatório"})}
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

                            <div className="margin-bottom-30 d-flex">
                                <input 
                                ref={register({required: "Campo obrigatório"})}
                                name="email"
                                type="email" 
                                className="form-control input-base mr-2"
                                placeholder="Email do médico"
                                />
                                {errors.email && (
                                <div className="invalid-feedback d-block">
                                    {errors.email.message}
                                </div>
                                )}                    

                                <Controller
                                    as={InputMask}
                                    name="celular"        
                                    rules={{ required: false }}
                                    control={control}
                                    mask="(99) 99999-9999"
                                    id="celular"
                                    className="form-control input-base input-celular"
                                    defaultValue=""
                                    placeholder="Celular"
                                />

                            </div>

                            <div className="margin-bottom-30">
                                <Controller
                                as={Select}
                                name="especializacoes"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingEspecializacoes}
                                options={especializacoes}
                                getOptionLabel={(option: Especializacao) => option.nome}
                                getOptionValue={(option: Especializacao) => String(option.id)}
                                classNamePrefix="especializacoes-select"
                                placeholder="Especializações médicas"
                                inputId="especializacoes"
                                defaultValue=""
                                isMulti
                                />
                                {errors.especializacoes && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório!
                                </div>
                                )}
                            </div>

                            <div className="margin-bottom-30">
                                <ImageUpload onUploadSuccess={onUploadSuccess} medicoImgUrl={medicoImgUrl}/>
                            </div>
                    </div>
                    <div className="col-6 medicos-descricoes">
                            <Controller
                                as={Select}
                                name="locais"
                                rules={{ required: false }}
                                control={control}
                                isLoading={isLoadingLocais}
                                options={locais}
                                getOptionLabel={(option: Local) => option.nome}
                                getOptionValue={(option: Local) => String(option.id)}
                                classNamePrefix="especializacoes-select"
                                className="input-select mb-4"
                                placeholder="Locais de Atendimento"
                                inputId="locais"
                                defaultValue=""
                                isMulti
                                />
                                <Controller
                                as={Select}
                                name="cidades"
                                rules={{ required: false }}
                                control={control}
                                isLoading={isLoadingCidades}
                                options={cidades}
                                getOptionLabel={(option: Cidade) => option.nome}
                                getOptionValue={(option: Cidade) => String(option.id)}
                                classNamePrefix="especializacoes-select"
                                className="input-select mb-4"
                                placeholder="Cidades de Atendimento"
                                inputId="cidades"
                                defaultValue=""
                                isMulti
                                />

                                <h6 className="admin-local-title">Informações sobre local de visita</h6>

                               <div className="d-flex">
                               
                               <input
                               
                                    ref={register({required: false})}
                                    name="cep"
                                    type="text" 
                                    className="form-control input-base input-cep mr-2"
                                    placeholder="CEP"
                                    value={searchValue}
                                    onChange={event => setSearchValue(event.target.value)}
                                    />


                                <input
                                    ref={register({required: false})}
                                    name="logradouro"
                                    type="text" 
                                    className="form-control input-base mr-2"
                                    placeholder="Logradouro"
                                    value={addressData?.logradouro}
                                    />

                                <input 
                                    ref={register({required: false})}
                                    name="complemento"
                                    type="text" 
                                    className="form-control input-base input-complemento"
                                    placeholder="Compl"
                                />
                               
                               </div>

                               <div className="d-flex mt-2 mb-4">

                                <input
                                    ref={register({required: false})}
                                    name="bairro"
                                    type="text" 
                                    className="form-control input-base mr-2"
                                    placeholder="Bairro"
                                    value={addressData?.bairro}
                                    />

                                <input
                                    ref={register({required: false})}
                                    name="localidade"
                                    type="text" 
                                    className="form-control input-base mr-2"
                                    placeholder="Cidade"
                                    value={addressData?.localidade}
                                    />

                                <input
                                    ref={register({required: false})}
                                    name="uf"
                                    type="text" 
                                    className="form-control input-base input-uf"
                                    placeholder="Uf"
                                    value={addressData?.uf}
                                    />

                                
                               
                               </div>
                               <Controller
                                as={Select}
                                name="atendimentos"
                                rules={{ required: false }}
                                control={control}
                                isLoading={isLoadingAtendimentos}
                                options={atendimentos}
                                getOptionLabel={(option: Atendimento) => option.nome}
                                getOptionValue={(option: Atendimento) => String(option.id)}
                                classNamePrefix="atendimentos-select"
                                className="input-select mr-2 mb-2"
                                placeholder="Dias e Períodos de Atendimento"
                                inputId="atendimentos"
                                defaultValue=""
                                isMulti
                                />
                               
                            
                    </div>

                    
                        <h6>Horários de Atendimento</h6>
                        <textarea
                        ref={register({ required: false})}
                        name="horarioAtendimento"
                        className="form-control input-base mb-3 mt-2"
                        placeholder="Horário de Atendimento"
                        cols={30} 
                        rows={10}    
                        />
     
                    <h6>Currículo e Observações</h6>
                            <textarea
                                ref={register({ required: false})}
                                name="curriculo"
                                className="form-control input-base mt-2"
                                placeholder="Currículo"
                                cols={30} 
                                rows={10}    
                                />
                    
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;