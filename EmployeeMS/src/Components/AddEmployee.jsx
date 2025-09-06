import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddEmployee = () => {

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
     <div className='add_category_box d-flex justify-content-center align-items-center mt-3 '>
        <div className='p-3 rounded w-50 border '>

            <h3 className='text-center'>Add Employee</h3>
            <form className='row g-1'>

               <div className='col-12'>
                 <label for='inputName' className='form-lable'><strong>Name:</strong></label>
                <input
                 type="test"
                 className='form-control rounded-0 '
                 id='inputName' 
                 placeholder='Enter Name'/>
               </div>

               <div className='col-12'>
                 <label for='inputEmail4' className='form-lable'><strong>Email:</strong></label>
                <input
                 type="email"
                 className='form-control rounded-0 '
                 id='inputEmail4' 
                 placeholder='Enter Email'
                 autoComplete='off'/>
               </div>

               <div className='col-12'>
                 <label for='inputPassword4' className='form-lable'><strong>Password:</strong></label>
                <input
                 type="password"
                 className='form-control rounded-0 '
                 id='inputPassword4' 
                 placeholder='Enter Password'/>
               </div>

               <div className='col-12'>
                 <label for='inputSalary' className='form-lable'><strong>Salary:</strong></label>
                <input
                 type="test"
                 className='form-control rounded-0 '
                 id='inputSalary' 
                 placeholder='Enter Salary'
                 autoComplete='off'/>
               </div>

               <div className='col-12'>
                 <label for='inputAddress' className='form-lable'><strong>Address:</strong></label>
                <input
                 type="test"
                 className='form-control rounded-0 '
                 id='inputAddress' 
                 placeholder='Enter Address'
                 autoComplete='off'/>
               </div>

               <div className='col-12'>
                 <label for='category' className='form-lable'><strong>Category:</strong></label>
                 <select name="category" id="category" className='form-select'>
                     {category.map(c => {
                        return <option value={c.name}>{c.name}</option>
                     })}
                 </select>
               </div>

               <div className='col-12 mb-3'>
                 <label for='inputGroupFeil01' className='form-lable'><strong>Name:</strong></label>
                <input
                 type="file"
                 className='form-control rounded-0 '
                 id='inputGroupFeil01' 
                  />
               </div>

               <button type='submit' className='btn btn-success w-100 mt-3 rounded-0 mb-2'>Add Employee</button>

            </form>
        </div>
    </div>
  )
}

export default AddEmployee