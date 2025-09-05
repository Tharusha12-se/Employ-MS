import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import{BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './Components/Dashboard';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
