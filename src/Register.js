import axios, { Axios } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {

    const [username, usernamechange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    //set id xwith email
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("female");
    const [role, setrole] = useState("");
    const [formData, setFormData] = useState({
        id_publique:'',
        username: '',
        name: '',
        password: '',
        email: '',
        role: '',
        gender: '',
        phonenumber: ''
      });
    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (username === null || username === '') {
            isproceed = false;
            errormessage += ' username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      }
      
const submitForm = (event)=>{
    event.preventDefault();
    //console.log(formData);
    axios.post('http://localhost:3002/api/insert', {
        username: formData.username,
        name: formData.name,
        password: formData.password,
        email: formData.email,
        role: formData.role,
        gender: formData.gender,
        phonenumber: formData.phonenumber,
        id_publique: uuidv4()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}
 {/*const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { username, name, password, id, phone, country, address, gender };
            if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:8000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }*/}
    return (


        
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={submitForm}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone <span className="errmsg"></span></label>
                                        <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>role <span className="errmsg"></span></label>
                                        <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>gender <span className="errmsg"></span></label>
                                        <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
                                    </div>
                                </div>
                                {/*<div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country <span className="errmsg">*</span></label>
                                        <select value={country} onChange={e => countrychange(e.target.value)} className="form-control">
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>*/}
                                {/*<div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div>*/}
                               {/*} <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
                                        <label>Female</label>
                                    </div>
                            </div>*/}

                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button> |
                            <Link to={'/login'} className="btn btn-danger">Close</Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;