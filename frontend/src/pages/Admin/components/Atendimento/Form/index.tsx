import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import BaseForm from '../../BaseForm';
import './styles.scss';

export type FormState = {
    id: number;
    nome: string;
}

type ParamsType = {
    atendimentoId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { atendimentoId } = useParams<ParamsType>();
    
    const isEditing = atendimentoId !== 'create';
    const formTitle = isEditing ? 'Editar Atendimento' : 'Cadastrar Atendimento';

    useEffect(() => {
       if (isEditing) {
        makePrivateRequest({ url: `/atendimento/${atendimentoId}`})
        .then(response => {
            setValue('nome', response.data.nome);
        })
       }
    }, [atendimentoId, isEditing, setValue]);  

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }
        makePrivateRequest({
            url: isEditing ? `/atendimento/${atendimentoId}` : '/atendimento',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
        .then(() => {
            toast.info('Atendimento salvo com sucesso!'); 
            history.push('/admin/atendimento');
        })
        .catch(() => {
            toast.error('Erro ao salvar atendimento!');
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <input 
                        ref={register({required: "Campo obrigatório"})}
                        name="nome"
                        type="text" 
                        className="form-control input-base"
                        placeholder="Especialidade"
                    />
                    {errors.nome && (
                        <div className="invalid-feedback d-block">
                            {errors.nome.message}
                        </div>
                    )}
                </div>     
            </BaseForm>
        </form>
    )
}
export default Form;