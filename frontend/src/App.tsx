import React , { }from 'react';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './core/assets/styles/custom.scss';
import './app.scss';


const App = () => {

    return (
        <>
            <Routes />
            <ToastContainer />
        </>
    );
}

export default App;