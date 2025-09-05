import React from 'react'
import './style.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    // for cookie
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
           navigate('/dashboard');
        })
        .catch(err => console.log(err)); 
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
               <div className='mb-3'>
                 <label htmlFor="email"><strong>Email:</strong></label>
                <input type="email"  name="email" autoComplete='off' placeholder='Enter Email' required
                 onChange={(e) => setValues({...values, email: e.target.value})} className='form-control rounded-0' />
               </div>

                <div className='mb-3'>
                 <label htmlFor="password"><strong>Password:</strong></label>
                <input type="password"  name="password" autoComplete='off' placeholder='Enter Password' required
                 onChange={(e) => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
               </div>

               <button type='submit' className='btn btn-primary w-100 mt-3 rounded-0 mb-2'>Login</button>

               <div className='mb-1'>
                <input type="checkbox"  name="tick" id='tick' className='me-2' />
                 <label htmlFor="password"><strong>Agree with terms & condition</strong></label>
               </div>

            </form>
        </div>
    </div>
  )
}

export default Login