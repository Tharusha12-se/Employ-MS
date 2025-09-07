import { useEffect } from 'react';
import './style.css'
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecord();
  }, []);

  const AdminRecord = () => {
    axios.get('http://localhost:3000/auth/admin_record')
      .then(result => {
        console.log("Admin record response:", result.data);
        if (result.data.Status) {
          setAdmin(result.data.Result);
        } else {
          alert(result.data.err)
        }
      })
  }

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        console.log("Admin count response:", result.data);
        if (result.data.Status) {
          // CORRECTED: Use Result instead of Status
          setAdminTotal(result.data.Result[0].admin);
        }
      })
      .catch(err => {
        console.log("Admin count error:", err);
        setError("Failed to load admin count");
      });
  }

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        console.log("Employee count response:", result.data);
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      })
      .catch(err => {
        console.log("Employee count error:", err);
        setError("Failed to load employee count");
      });
  }

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_sum')
      .then(result => {
        console.log("Salary sum response:", result.data);
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].total_salary);
        }
      })
      .catch(err => {
        console.log("Salary sum error:", err);
        setError("Failed to load salary data");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <div className='dashboard-home'>
        <div className='p-3 d-flex justify-content-center mt-3'>
          <div>Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='dashboard-home'>
        <div className='p-3 d-flex justify-content-center mt-3'>
          <div className='alert alert-danger'>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard-home'>
      <div className='p-3 d-flex justify-content-around mt-3 flex-wrap'>
        {/* Admin Card */}
        <div className='stat-card admin-card'>
          <div className='card-icon'>
            <i className='fas fa-user-shield'></i>
          </div>
          <div className='card-content'>
            <h3>Admin</h3>
            <h2>{adminTotal}</h2>
            <p>Total Administrators</p>
          </div>
        </div>

        {/* Employee Card */}
        <div className='stat-card employee-card'>
          <div className='card-icon'>
            <i className='fas fa-users'></i>
          </div>
          <div className='card-content'>
            <h3>Employees</h3>
            <h2>{employeeTotal}</h2>
            <p>Total Employees</p>
          </div>
        </div>

        {/* Salary Card */}
        <div className='stat-card salary-card'>
          <div className='card-icon'>
            <i className='fas fa-money-bill-wave'></i>
          </div>
          <div className='card-content'>
            <h3>Salary</h3>
            <h2>${salaryTotal.toLocaleString()}</h2>
            <p>Total Monthly Salary</p>
          </div>
        </div>
      </div>

      <div className='container-fluid mt-3'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-8 col-lg-6'>
            <h3 className='text-center mb-3'>List Of Admin</h3>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admin.length > 0 ? (
                  admin.map(a => (
                    <tr key={a.id}>
                      <td>{a.email}</td>
                      <td>
                        <button className='btn btn-info btn-sm me-2'>Edit</button>
                        <button className='btn btn-warning btn-sm'>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className='text-center'>No admin found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;