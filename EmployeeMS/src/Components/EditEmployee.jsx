import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmployee = () => {
    const {id} = useParams()
    const [category, setCategory] = useState([])
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary: '',
    address: '',
    category_id: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
        if(result.data.Status){
          setCategory(result.data.Result)
        }else{
          alert(result.data.Error)
        }
    }).catch(err => console.log(err))

    axios.get('http://localhost:3000/auth/employee/'+id)
    .then(result =>{
       console.log(result.data)
       setEmployee({
        ...employee,
        name: result.data.Result[0].name,
        email: result.data.Result[0].email,
        address: result.data.Result[0].address,
        salary: result.data.Result[0].salary,
       })
    })

  }, [] );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/auth/edit_employee/'+id, employee)
    .then(result => {
      if(result.data.Status){
        alert("Employee Edit successfully!");
        navigate('/dashboard/employee')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => {console.log(err)})
  }

  return (
     <div className='add_category_box d-flex justify-content-center align-items-center mt-3'>
      <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Edit Employee</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className='row g-1' onSubmit={handleSubmit}>
          <div className='col-12'>
            <label htmlFor='inputName' className='form-label'><strong>Name:</strong></label>
            <input
              type="text"
              className='form-control rounded-0'
              id='inputName' 
              placeholder='Enter Name'
              value={employee.name}
              onChange={(e) => setEmployee({...employee, name: e.target.value})}
              autoComplete="off"
              required
            />
          </div>

          <div className='col-12'>
            <label htmlFor='inputEmail' className='form-label'><strong>Email:</strong></label>
            <input
              type="email"
              className='form-control rounded-0'
              id='inputEmail' 
              placeholder='Enter Email'
              value={employee.email}
              onChange={(e) => setEmployee({...employee, email: e.target.value})}
              autoComplete="new-email" // Prevents auto-fill
              required
            />
          </div>

          <div className='col-12'>
            <label htmlFor='inputSalary' className='form-label'><strong>Salary:</strong></label>
            <input
              type="text"
              className='form-control rounded-0'
              id='inputSalary' 
              placeholder='Enter Salary'
              value={employee.salary}
              onChange={(e) => setEmployee({...employee, salary: e.target.value})}
              autoComplete="off"
              required
            />
          </div>

          <div className='col-12'>
            <label htmlFor='inputAddress' className='form-label'><strong>Address:</strong></label>
            <input
              type="text"
              className='form-control rounded-0'
              id='inputAddress' 
              placeholder='Enter Address'
              value={employee.address}
              onChange={(e) => setEmployee({...employee, address: e.target.value})}
              autoComplete="off"
              required
            />
          </div>

          <div className='col-12'>
            <label htmlFor='category' className='form-label'><strong>Category:</strong></label>
            <select 
              name="category" 
              id="category" 
              className='form-select'
              value={employee.category_id}
              required 
              onChange={(e) => setEmployee({...employee, category_id: e.target.value})}
            >
              <option value="">Select Category</option>
              {category.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>


          <button type='submit' className='btn btn-success w-100 mt-3 rounded-0 mb-2'>Edit Employee</button>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee