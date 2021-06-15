import React, { useEffect, useState } from 'react';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout(); 
    }

    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location]);
    
    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/" className="nav-logo-text">
                    <img 
                    src="https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/logo.png" 
                    alt="Foto"
                    className="navbar-logo" />
                    <h4>DocAdmin</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="main-menu">
                    <li>
                        <NavLink className="nav-link" to="/" activeClassName="active" exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/medicos" activeClassName="active" exact>MÉDICOS (AS)</NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-link" to="/admin" activeClassName="active" exact>ADMIN</NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right">
               { currentUser && (
                   <>
                    {currentUser}
                    <a href="logout" className="nav-link active d-inline" onClick={handleLogout}>
                        LOGOUT
                    </a>
                   </>
               )}
                { !currentUser && (
                    <Link className="nav-link active" to="/auth/login">
                    LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
};

export default Navbar;