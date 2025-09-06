import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Category = () => {

  const [category, setCategory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
        if(result.data.Status){
          setCategory(result.data.Result)
        }else{
          alert(result.data.Error)
        }
    }).catch(err => console.log(err))

  }, [] )

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to='/dashboard/add_category' className='btn btn-success mb-3'>Add Category</Link>

    <div className='mt-3'>
        <table className='table table-striped '>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
            </tr>
          </thead>

          <tbody>
            {category.length > 0 ? (
              category.map(c => (
                <tr key={c.id || c.name}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
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

export default Category