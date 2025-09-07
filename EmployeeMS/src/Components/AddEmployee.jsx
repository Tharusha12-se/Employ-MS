import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
    image: null
  });

  const [category, setCategory] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
      if(result.data.Status){
        setCategory(result.data.Result);
      } else {
        setError(result.data.Error);
      }
    }).catch(err => {
      console.log(err);
      setError('Failed to fetch categories');
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('salary', employee.salary);
    formData.append('address', employee.address);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);
    
       axios.post('http://localhost:3000/auth/add_employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(result => {
       if(result.data.Status){
         alert("Employee added successfully!");
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error)
            }
    })
    .catch(err => {
      console.log(err);
      setError("Error adding employee. Please check console for details.");
    });
  };

  return (
    <div className='add_category_box d-flex justify-content-center align-items-center mt-3'>
      <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Add Employee</h3>
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
            />
          </div>

          <div className='col-12'>
            <label htmlFor='inputPassword' className='form-label'><strong>Password:</strong></label>
            <input
              type="password"
              className='form-control rounded-0'
              id='inputPassword' 
              placeholder='Enter Password'
              value={employee.password}
              onChange={(e) => setEmployee({...employee, password: e.target.value})}
              autoComplete="new-password" // Prevents auto-fill
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
            />
          </div>

          <div className='col-12'>
            <label htmlFor='category' className='form-label'><strong>Category:</strong></label>
            <select 
              name="category" 
              id="category" 
              className='form-select'
              value={employee.category_id}
              onChange={(e) => setEmployee({...employee, category_id: e.target.value})}
            >
              <option value="">Select Category</option>
              {category.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className='col-12 mb-3'>
            <label htmlFor='inputGroupFile01' className='form-label'><strong>Image:</strong></label>
            <input
              type="file"
              className='form-control rounded-0'
              id='inputGroupFile01' 
              name='image'
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>

          <button type='submit' className='btn btn-success w-100 mt-3 rounded-0 mb-2'>Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;