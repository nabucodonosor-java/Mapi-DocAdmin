import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const NavbarReport = () => (
    <nav className="admin-nav-admin-container">
        <ul>
            <li>
                <NavLink to="/report/medicos" className="admin-nav-admin-item">
                    Por Especialidade
                </NavLink> 
            </li>
            <li>
                <NavLink to="/report/especializacao" className="admin-nav-admin-item">
                    Por Especialização
                </NavLink>
            </li>
            <li>
                <NavLink to="/report/atendimento" className="admin-nav-admin-item">
                    Por Horários e Períodos
                </NavLink>
            </li>
            <li>
                <NavLink to="/report/cidade" className="admin-nav-admin-item">
                    Por Cidade
                </NavLink>
            </li>
            <li>
                <NavLink to="/report/local" className="admin-nav-admin-item">
                    Por Local
                </NavLink>
            </li>             
        </ul>
    </nav>
);

export default NavbarReport;