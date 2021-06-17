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
    especializacaoId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { especializacaoId } = useParams<ParamsType>();
    
    const isEditing = especializacaoId !== 'create';
    const formTitle = isEditing ? 'Editar Especialização' : 'Cadastrar Especialização';

    useEffect(() => {
       if (isEditing) {
        makePrivateRequest({ url: `/especializacao/${especializacaoId}`})
        .then(response => {
            setValue('nome', response.data.nome);
        })
       }
    }, [especializacaoId, isEditing, setValue]);  

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }
        makePrivateRequest({
            url: isEditing ? `/especializacao/${especializacaoId}` : '/especializacao',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
        .then(() => {
            toast.info('Especialização salva com sucesso!'); 
            history.push('/admin/especializacao');
        })
        .catch(() => {
            toast.error('Erro ao salvar especialização!');
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