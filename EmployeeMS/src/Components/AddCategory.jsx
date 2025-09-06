import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {

    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/category')
            }else{
                alert(result.data.Error)
            }
        } )
        .catch(err => console.log(err))
    }

  return (
     <div className='add_category_box d-flex justify-content-center align-items-center h-75 '>
        <div className='p-3 rounded w-25 border '>

            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
               <div className='mb-3'>
                 <label htmlFor="category" className='mt-2'><strong>Category:</strong></label>
                <input type="category"  name="category" autoComplete='off' placeholder='Enter Category' required
                 onChange={(e) => setCategory(e.target.value) } className='form-control rounded-0 mt-2' />
               </div>

               <button type='submit' className='btn btn-success w-100 mt-3 rounded-0 mb-2'>Add Category</button>

            </form>
        </div>
    </div>
  )
}

export default AddCategory