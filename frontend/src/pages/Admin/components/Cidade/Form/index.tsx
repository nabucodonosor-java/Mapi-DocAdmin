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
    uf: string;
}

type ParamsType = {
    cidadeId: string;
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { cidadeId } = useParams<ParamsType>();
    
    const isEditing = cidadeId !== 'create';
    const formTitle = isEditing ? 'Editar Cidade' : 'Cadastrar Cidade';

    useEffect(() => {
       if (isEditing) {
        makePrivateRequest({ url: `/cidade/${cidadeId}`})
        .then(response => {
            setValue('nome', response.data.nome);
            setValue('uf', response.data.uf);
        })
       }
    }, [cidadeId, isEditing, setValue]);  

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data
        }
        makePrivateRequest({
            url: isEditing ? `/cidade/${cidadeId}` : '/cidade',
            method: isEditing ? 'PUT' : 'POST',
            data: payload
            })
        .then(() => {
            toast.info('Cidade salva com sucesso!'); 
            history.push('/admin/cidade');
        })
        .catch(() => {
            toast.error('Erro ao salvar cidade!');
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="admin-cidade-form">
                    <input 
                        ref={register({required: "Campo obrigatório"})}
                        name="nome"
                        type="text" 
                        className="form-control input-base mr-2"
                        placeholder="Cidade"
                    />
                    {errors.nome && (
                        <div className="invalid-feedback d-block">
                            {errors.nome.message}
                        </div>
                    )}
               
                    <input 
                        ref={register({required: "Campo obrigatório"})}
                        name="uf"
                        type="text" 
                        className="form-control input-base input-uf"
                        placeholder="UF"
                    />
                    {errors.uf && (
                        <div className="invalid-feedback d-block">
                            {errors.uf.message}
                        </div>
                    )}
                </div> 
            </BaseForm>
        </form>
    )
}
export default Form;