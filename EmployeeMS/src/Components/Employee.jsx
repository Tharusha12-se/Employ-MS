import { Link} from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Employee = () => {
  const [employee, setEmployee] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployee(result.data.Result)
          console.log("Employees loaded:", result.data.Result)
        } else {
          setError(result.data.Error || "Failed to load employees")
        }
      })
      .catch(err => {
        console.log("Error fetching employees:", err)
        setError("Failed to connect to server")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_employee/'+id)
      .then(result => {
        if(result.data.Status){
          alert("Employee delete successfully!");
            window.location.reload()
        }else{
          alert(result.data.Error)
        }
      })
  }

  if (loading) {
    return <div className='px-5 mt-3'>Loading employees...</div>
  }

  if (error) {
    return (
      <div className='px-5 mt-3'>
        <div className='alert alert-danger'>{error}</div>
        <Link to='/dashboard/add_employee' className='btn btn-success mb-3'>Add Employee</Link>
      </div>
    )
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <Link to='/dashboard/add_employee' className='btn btn-success mb-3'>Add Employee</Link>

      <div className='mt-3'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employee.length > 0 ? (
              employee.map(e => (
                <tr key={e.id}>
                  <td>
                    <img 
                      src={`http://localhost:3000/Image/${e.image}`} 
                      className='employeeImage' 
                      alt={e.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'inline';
                      }}
                    />
                    <span style={{display: 'none'}}>No image</span>
                  </td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>${e.salary}</td>
                  <td>{e.address}</td>
                  <td>
                    <Link to={`/dashboard/edit_employee/${e.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm' 
                    onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className='text-center'>No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee