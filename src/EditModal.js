import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios, { Axios } from "axios";

const EditModal = ({ user ,handleClose, handleEdit,show }) => {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [gender, setGender] = useState(user.gender);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  
  const handleFormSubmit = (event) => {

    axios.put(`http://localhost:3002/api/update/${user.id}`, {
      username: username,
      name: name,
      password:password,
      email: email,
      role: role,
      phonenumber: phonenumber,
      id_publique: user.id_publique
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
    handleEdit({
      id: user.id,
      username,
      name,
      password,
      email,
      role,
      gender,
      phonenumber,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} style={{ top: '70px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>
         
          <Form.Group controlId="formPhonenumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
