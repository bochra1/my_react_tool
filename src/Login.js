import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from './images/logo.svg'
const Login = () =>{
    const [email,usernameupdate]= useState('');
    const [password,userpasswordupdate]= useState('');
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
    else  fetch("http://localhost:8000/user/" + email).then((res) => {
        return res.json();
    }).then((resp) => {
        //console.log(resp)
        if (Object.keys(resp).length === 0) {
            toast.error('Please Enter valid username');
        } else {
            if (resp.password === password) {
                toast.success('Success');
                sessionStorage.setItem('username',resp.username);
                sessionStorage.setItem('userrole',resp.role);
                if (resp.role === "admin") {
                    usenavigate("/admindashboard");
                  } else {
                    usenavigate("/");
                  }  }else{
                toast.error('Please Enter valid credentials');
            }
        }
    }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
    });
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
                                <label style={{color:'red'}}>Email: <span className="errmsg">*</span></label>
                                <input value={email} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>

                            <div className="form-group">
                                <label style={{color:'red'}}>Password: <span className="errmsg">*</span></label>
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