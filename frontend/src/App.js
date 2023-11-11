import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='w-[100vw] h-[100vh]  flex justify-center items-center'>



      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
