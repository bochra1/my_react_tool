import React, { useState } from "react";
import { Modal, Button ,Form} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const AddUserModal = ({ show, handleClose } ) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    role: "",
    gender: "",
    phonenumber: "",

  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const jwttoken = sessionStorage.getItem('jwttoken');

  axios.defaults.headers.common['Authorization'] = `Bearer ${jwttoken}`;
  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:7214/api/User   ", {
        ...formData,
        id_publique: uuidv4(),
      })
      .then((response) => {
        console.log(response);
        // Reset form data after successful submission
        setFormData({
          username: "",
          name: "",
          password: "",
          email: "",
          role: "",
          gender: "",
          phonenumber: "",

        });
        toast.success("Registered successfully.");
        handleClose(); // Close the modal after successful registration
      })
      .catch((error) => { if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data); 
        toast.error("Failed: " + error.response.data);
      }
       else{ console.log(error);
        toast.error("Failed: " + error);}
      });
  };

  return (
    <Modal show={show} onHide={handleClose} style={{ top: '70px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitForm}>
        <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />       </Form.Group>

           <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            />       </Form.Group>
          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />       </Form.Group>
         <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            />       </Form.Group>
          <Form.Group controlId="Role">
            <Form.Label>Role</Form.Label>
            <Form.Control
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            />       </Form.Group>
           <Form.Group controlId="Gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            />       </Form.Group>
          <Form.Group controlId="Phone_Number">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
            type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
            />       </Form.Group>
         
          <div>
            <button type="submit">Register</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
