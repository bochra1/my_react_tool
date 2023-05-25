import logo from './logo.svg';

import './App.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import AppHeader from './AppHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './AdminDashboard';
import CreateScript from './CreateScript';
import ScheduleExecution from './ScheduleExecution';
import ExtentReportComponent from './ExtentReportComponent';
import EditModal from './EditModal';
import RunScheduleScript from './RunScheduleScript';
import UserDeleteModal from './UserDeleteModal';
function App() {
  
  return(
    <div className="App"style={{alignItems:'center',}}>

      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <AppHeader></AppHeader>
      <Routes>
     {/* <Route path='/home' element={<Home/>}></Route>*/}

        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
       {/* <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>
        <Route path='/CreateScript' element={<CreateScript/>}></Route>*/}
        <Route path='/ExtentReportComponent' element={<ExtentReportComponent/>}></Route>
        <Route path='/UserDeleteModal' element={<UserDeleteModal/>}></Route>

        <Route path='/RunScheduleScript' element={<RunScheduleScript/>}></Route>

        <Route path='/ScheduleExecution' element={<ScheduleExecution/>}></Route>
        <Route path='/EditModal' element={<EditModal/>}></Route>

      </Routes>
      
      </BrowserRouter>
      

    </div>
  );
  
}

export default App;
