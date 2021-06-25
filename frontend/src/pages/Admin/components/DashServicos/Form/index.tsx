import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import Select from 'react-select';
import { Funcionario } from 'core/types/Funcionario';

export type FormState = {
    id: number;
    qtdeServico: number;
    qtdeFinalizado: number;
    date: string;
    descricao: string;
    funcionario: Funcionario;
}

type ParamsType = {
    servicoId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { servicoId } = useParams<ParamsType>();

    const [isLoadingFuncionario, setIsLoadingFuncionario] = useState(false);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

    const isEditing = servicoId !== 'create';
    const formTitle = isEditing ? 'Editar Serviço' : 'Cadastrar Serviço';

    useEffect(() => {
        if (isEditing) {
            makePrivateRequest({ url: `/servicos/${servicoId}` })
                .then(response => {
                    

                    setValue('qtdeServico', response.data.qtdeServico);
                    setValue('qtdeFinalizado', response.data.qtdeFinalizado);
                    setValue('date', response.data.date);
                    setValue('descricao', response.data.descricao);

                    setValue('funcionario', response.data.funcionario);
                })
        }
    }, [servicoId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingFuncionario(true);
        makePrivateRequest({ url: '/funcionarios' })
            .then(response => setFuncionarios(response.data.content))
            .finally(() => setIsLoadingFuncionario(false));
    }, []);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }
        makePrivateRequest({
            url: isEditing ? `/servicos/${servicoId}` : '/servicos',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
        })
            .then(() => {
                toast.info('Serviço salvo com sucesso!');
                history.push('/admin/servico');
            })
            .catch(() => {
                toast.error('Erro ao salvar serviço!');
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                ref={register({ required: false })}
                                name="date"
                                type="date"
                                className="form-control input-base input-crm"
                                placeholder="Data"
                            />

                            <Controller
                                as={Select}
                                name="funcionario"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingFuncionario}
                                options={funcionarios}
                                getOptionLabel={(option: Funcionario) => option.nome}
                                getOptionValue={(option: Funcionario) => String(option.id)}
                                classNamePrefix="especializacoes-select"
                                className="input-select"
                                placeholder="Funcionário"
                                inputId="funcionario"
                                defaultValue=""
                            />
                            {errors.funcionario && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório!
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30 d-flex">

                            <input
                                ref={register({ required: false })}
                                name="qtdeServico"
                                type="number"
                                className="form-control input-base input-crm"
                                placeholder="Qtde de serviços no dia"
                            />

                            <input
                                ref={register({ required: false })}
                                name="qtdeFinalizado"
                                type="number"
                                className="form-control input-base input-crm"
                                placeholder="Qtde de serviços finalizados do dia"
                            />
                        </div>

                    </div>
                </div>
                <div className="col-6 medicos-descricoes">
                    <h6>Descrição do serviço</h6>
                    <textarea
                        ref={register({ required: false })}
                        name="descricao"
                        className="form-control input-base mt-2"
                        placeholder="Descrição do serviço"
                        cols={30}
                        rows={10}
                    />
                </div>
            </BaseForm>
        </form>
    )
}
export default Form;