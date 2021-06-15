import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/arrow.svg';
import { makePrivateRequest } from 'core/utils/request';
import './styles.scss';
import { Medico } from 'core/types/Medico';
import MedicoInfoLoader from '../Loaders/MedicoInfoLoader';
import MedicoDescriptionLoader from '../Loaders/MedicoDescriptionLoader';

type ParamsType = {
    medicoId: string;
}

const MedicoDetails = () => { 

    const { medicoId } = useParams<ParamsType>();
    const [medico, setMedico] = useState<Medico>();
    const[isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        makePrivateRequest({ url: `/medicos/${medicoId}`})
        .then(response => setMedico(response.data))
        .finally(() => setIsLoading(false));
    }, [medicoId]);

    return (
        <div className="medico-details-container">
            <div className="card-base border-radius-20 medico-details">
                <Link to="/medicos" className="medico-details-goback">
                <ArrowIcon className="medico-details-icon-goback"/>
                <h1 className="medico-details-text-goback">voltar</h1>
                </Link>
                <div className="morador-details-div-info">
                        {isLoading ? <MedicoInfoLoader /> : (
                    <div className="medico-details-card">
                        <div className="text-center">
                                <img src={medico?.imgUrl} alt={medico?.nome} className="medico-details-image" />
                        </div>
                            <h1 className="medico-details-name">
                                {medico?.nome}
                            </h1>
                            <div className="medico-details-specialty">
                                <h6 className="medico-details-specialty-title">
                                    {medico?.especialidades.map(e => e.nome)}
                                </h6>
                            </div>
                        </div>
                        )}   
                    </div>
                    <div className="card-base border-radius-20 medico-details-info-card">
                        {isLoading ? <MedicoDescriptionLoader /> : (
                              <div className="morador-details-info-fields">
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">CRM</h6>
                                {medico?.crm}
                              </div>
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">NOME</h6>
                                {medico?.nome}
                              </div>
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">CELULAR</h6>
                                {medico?.celular}
                              </div>
                              <div className="mb-2">
                                <h6 className="medico-details-info-title">EMAIL</h6>
                                {medico?.email}
                              </div>
                              <h1 className="medico-details-large-text-title">
                                   Horários de Atendimento
                                   </h1>
                               <p className="medico-details-large-text-text">
                                   {medico?.horarioAtendimento}
                               </p>
                              <h1 className="medico-details-large-text-title">
                                   Observações
                                   </h1>
                               <p className="medico-details-large-text-text">
                                   {medico?.curriculo}
                               </p>

                              
                              </div>
                        )}   
                    </div>
                </div>
            </div>

    );
};

export default MedicoDetails;