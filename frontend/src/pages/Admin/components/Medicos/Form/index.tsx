import React, { useEffect, useState } from 'react';
import { Especialidade, Especializacao } from 'core/types/Medico';
import './styles.scss';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import Select from 'react-select';
import ImageUpload from '../ImageUpload';
import InputMask from 'react-input-mask';

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
    especializacoes: Especializacao[];
    especialidades: Especialidade[];
}

type ParamsType = {
    medicoId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { medicoId } = useParams<ParamsType>();
    const [isLoadingEspecializacoes, setIsLoadingEspecializacoes] = useState(false);
    const [especializacoes, setEspecializacoes] = useState<Especializacao[]>([]);
    const [isLoadingEspecialidades, setIsLoadingEspecialidades] = useState(false);
    const [especialidades, setEspecialidades] = useState<Especializacao[]>([]);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [medicoImgUrl, setMedicoImgUrl] = useState('');
    const isEditing = medicoId !== 'create';
    const formTitle = isEditing ? 'Editar Médico' : 'Cadastrar Médico'

    useEffect(() => {
       if (isEditing) {
        makePrivateRequest({ url: `/medicos/${medicoId}`})
        .then(response => {
            setValue('especialidades', response.data.especialidades);
            setValue('crm', response.data.crm);
            setValue('nome', response.data.nome);
            setValue('celular', response.data.celular);
            setValue('email', response.data.email);
            setValue('curriculo', response.data.curriculo);
            setValue('horarioAtendimento', response.data.horarioAtendimento);
            setValue('especializacoes', response.data.especializacoes);

            setMedicoImgUrl(response.data.imgUrl);
        })
       }
    }, [medicoId, isEditing, setValue]);

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">

                            <div className="margin-bottom-30 d-flex">
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
                                className="input-select mr-2"
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
                                 <input 
                                ref={register({required: false})}
                                name="crm"
                                type="text" 
                                className="form-control input-base input-crm"
                                placeholder="CRM do médico"
                                />
                            </div>

                            <div className="margin-bottom-30">
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
                                    className="form-control input-base"
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
                        <label>Observações</label>
                        <textarea
                        ref={register({ required: false})}
                        name="curriculo"
                        className="form-control input-base mb-2"
                        placeholder="Currículo"
                        cols={30} 
                        rows={10}    
                        />
                        <label>Horários de Atendimento</label>
                        <textarea
                        ref={register({ required: false})}
                        name="horarioAtendimento"
                        className="form-control input-base"
                        placeholder="Horário de Atendimento"
                        cols={30} 
                        rows={10}    
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;