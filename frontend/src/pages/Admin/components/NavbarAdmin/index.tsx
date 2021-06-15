import React from 'react';
import { NavLink } from 'react-router-dom';
import { isAllowebByRole } from 'core/utils/auth';
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
                <NavLink to="/admin/busca-especializacao" className="admin-nav-admin-item">
                    Busca Especializações
                </NavLink>
            </li>
            <li>
                <NavLink to="/admin/busca-atendimento" className="admin-nav-admin-item">
                    Busca Cidade
                </NavLink>
            </li>
            {isAllowebByRole(['ROLE_ADMIN']) && (
                <li>
                <NavLink to="/admin/users" className="admin-nav-admin-item">
                    Usuários
                </NavLink>
            </li>
            )}              
        </ul>
    </nav>
);

export default NavbarAdmin;