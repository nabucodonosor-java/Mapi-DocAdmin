import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const NavbarAdmin = () => (
    <nav className="admin-nav-admin-container">
        <ul>
            <li>
                <NavLink to="/admin/medicos" className="admin-nav-admin-item">
                    Médicos
                </NavLink> 
            </li>
            <li>
                <NavLink to="/admin/atendimento" className="admin-nav-admin-item">
                    Horários e Períodos
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/cidade" className="admin-nav-admin-item">
                    Cidades
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/especialidade" className="admin-nav-admin-item">
                    Especialidades
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/especializacao" className="admin-nav-admin-item">
                    Especializações
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/local" className="admin-nav-admin-item">
                    Locais
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/servico" className="admin-nav-admin-item">
                    Serviços
                </NavLink>
            </li>           
        </ul>
    </nav>
);

export default NavbarAdmin;