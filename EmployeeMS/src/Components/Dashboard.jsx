import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css'; 
import axios from 'axios';


const Dashboard = () => {

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
        .then(result => {
            if(result.data.Status){
                alert("Logout successfully!");
                navigate('/adminlogin')
            }
        })
    }

  return (
    <div className='container-fluid dashboard-container'>
        <div className='row flex-nowrap'>
            {/* Sidebar */}
            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar-gradient'>
                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 sidebar-scroll'>
                    {/* Brand Logo */}
                    <Link to='/dashboard' className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none mt-3'>
                        <i className="fs-4 bi bi-code-slash sidebar-brand-icon me-2"></i>
                        <span className='fs-5 d-none d-sm-inline sidebar-brand'>
                            Code With Yousof
                        </span>
                    </Link>
                    
                    {/* Navigation Menu */}
                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100' id='menu'>
                        <li className='nav-item-custom w-100'>
                            <Link to='/dashboard' className='nav-link px-3 py-3 align-middle text-white nav-link-custom nav-dashboard'>
                                <i className="fs-5 bi bi-speedometer2 me-3 icon-dashboard"></i>
                                <span className='d-none d-sm-inline'>Dashboard</span>
                            </Link>
                        </li>

                        <li className='nav-item-custom w-100'>
                            <Link to='/dashboard/employee' className='nav-link px-3 py-3 align-middle text-white nav-link-custom nav-employee'>
                                <i className="fs-5 bi bi-people-fill me-3 icon-employee"></i>
                                <span className='d-none d-sm-inline'>Manage Employee</span>
                            </Link>
                        </li>

                        <li className='nav-item-custom w-100'>
                            <Link to='/dashboard/category' className='nav-link px-3 py-3 align-middle text-white nav-link-custom nav-category'>
                                <i className="fs-5 bi bi-columns me-3 icon-category"></i>
                                <span className='d-none d-sm-inline'>Category</span>
                            </Link>
                        </li>

                        <li className='nav-item-custom w-100'>
                            <Link to='/dashboard/profile' className='nav-link px-3 py-3 align-middle text-white nav-link-custom nav-profile'>
                                <i className="fs-5 bi bi-person me-3 icon-profile"></i>
                                <span className='d-none d-sm-inline'>Profile</span>
                            </Link>
                        </li>

                        <li className='nav-item-custom w-100' onClick={handleLogout}>
                            <Link className='nav-link px-3 py-3 align-middle text-white nav-link-custom nav-logout'>
                                <i className="fs-5 bi bi-box-arrow-left me-3 icon-logout"></i>
                                <span className='d-none d-sm-inline'>Logout</span>
                            </Link>
                        </li>
                    </ul>

                    {/* Footer */}
                    <div className='sidebar-footer pb-4 text-center w-100'>
                        <hr />
                        <div>Employee Management System</div>
                        <div>v1.0.0</div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='col p-0 m-0 main-content'>
                <div className='p-3 d-flex justify-content-center content-header'>
                    <h4 className='m-0'>
                        <i className="bi bi-building me-2"></i>
                        Employee Management System
                    </h4>
                </div>
                <div className='p-4 content-animate'>
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard