import { Link } from 'react-router-dom'
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
        <table className='table table-striped '>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Salari</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employee.length > 0 ? (
              employee.map(e => (
                <tr>
                  <td><img src={`http://localhost:3000/Image/`+e.image} className='employeeImage' /></td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.salary}</td>
                  <td>{e.address}</td>
                  <td>
                    <button className='btn btn-info btn-sm me-2'>Edit</button>
                    <button className='btn btn-warning  btn-sm'>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className='text-center'>No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Employee