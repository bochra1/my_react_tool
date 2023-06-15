import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from './images/logo.svg'
import axios, { Axios } from "axios";
const Login = () =>{
    const [email,usernameupdate]= useState('');
    const [password,userpasswordupdate]= useState('');
 const [token,settoken]= useState('');

    const usenavigate = useNavigate();
    useEffect(()=>{
        sessionStorage.clear();
            },[]);
const ProceedLogin = (e)=>{

    e.preventDefault();
    if (email === '' || email === null) {
        toast.warning('Please Enter Username');
    }
    if (password === '' || password === null) {
        toast.warning('Please Enter Password');
    }
   




    else   axios.post('https://localhost:7214/api/User/login', { email, password })
    .then(response => {
        if (response.status === 200) {
            toast.success('Login successful');
            settoken(response.data.token);
            sessionStorage.setItem('jwttoken', response.data.token);

            sessionStorage.setItem('username', response.data.username);
            sessionStorage.setItem('userrole', response.data.role);
            if (response.data.role === "admin") {
              usenavigate("/admindashboard");
            } else {
              usenavigate("/");
            }
          } 
          
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            toast.error('password');
          } else if (error.response && error.response.status === 404) {
            toast.error('Email does not exist');
          } else {
            toast.error('An error occurred. Please try again.');
          }    });
    
    
    
    

}
const validate = () => {
    let result = true;
    if (email === '' || email === null) {
        result = false;
        toast.warning('Please Enter email');
    }
    if (password === '' || password === null) {
        result = false;
        toast.warning('Please Enter Password');
    }
    return result;
}



return (
    <div className="row">
    <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
    <form onSubmit={ProceedLogin} className="container">
 <div className="card" style={{}}>
                        <div className="card-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'} }>
                        <img src={logo} alt="logo" style={{ height: '40px', marginRight: '10px' }} />
                        </div>

                        <div className="card-body">
                            <div className="form-group">
                                <label style={{color:'black'}}>Email: <span className="errmsg">*</span></label>
                                <input value={email} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>

                            <div className="form-group">
                                <label style={{color:'black'}}>Password: <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => userpasswordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#C8102E',width: '100%' }}>Login</button> 
                            {/*<Link className="btn btn-success" to={'/register'}>New User</Link>*/}
                        </div>
</div>
</form>

    </div>
    </div>
)
}
export default Login;