import logo from './logo.svg';
import './App.css';
import Sidenav from "./Sidenav";
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AppHeader from './AppHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './AdminDashboard';

function App() {
  return(
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <AppHeader></AppHeader>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>

      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
  
}

export default App;
