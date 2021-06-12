import React, { useState } from 'react';
import { makePrivateRequest } from 'core/utils/request';
import { toast } from 'react-toastify';
import { ReactComponent as UploadPlaceHolder} from 'core/assets/images/upload-placeholder.svg';
import './styles.scss';

type Props = {
    onUploadSuccess: (imgUrl: string) => void;
    medicoImgUrl: string; 
}

const ImageUpload = ({ onUploadSuccess, medicoImgUrl }: Props) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const imgUrl = uploadedImgUrl || medicoImgUrl;

    const onUploadProgress = (progressEvent: ProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        setUploadProgress(progress);
        
    }

    const uploadImage = (selectedImage: File) => {
        const payload = new FormData();
        payload.append('file', selectedImage);

        makePrivateRequest({ 
            url: '/medicos/image', 
            method: 'POST',
            data: payload,
            onUploadProgress
        })
        .then( response => {
            setUploadedImgUrl(response.data.uri);
            onUploadSuccess(response.data.uri);
        })
        .catch(() => {
            toast.error('Erro ao enviar arquivo');
            
        })
        .finally(() => setUploadProgress(0));
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];

        if (selectedImage) {
            uploadImage(selectedImage);
        }
    }

    return (
        <div className="row">
            <div className="col-6">
                <div className="upload-button-container">
                    <input 
                    type="file" 
                    id="upload"
                    accept="image/png, image/jpg"
                    onChange={handleChange}
                    hidden
                    />
                    <label htmlFor="upload">ADICIONAR IMAGEM</label>
                </div>
                <small className="upload-text-helper text-primary">
                    As imagens devem ser <strong>JPG</strong> ou <strong>PNG</strong> e não devem ultrapassar <strong>5MB</strong>
                </small>
            </div>
            <div className="col-6 upload-placeholder">
               {uploadProgress > 0 && (
                   <>
                    <UploadPlaceHolder />
                    <div className="upload-progress-container">
                        <div className="upload-progress" style={{ width: `${uploadProgress}%` }}>

                        </div>
                    </div>
                   </>
               )}
               {(imgUrl && uploadProgress === 0) && (
                   <img src={imgUrl} alt={imgUrl} className="uploaded-image" />
               )}
            </div>
        </div>
    )
}

export default ImageUpload;