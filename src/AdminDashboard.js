import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsTrash,BsPlusCircle  } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Register from './Register';
import EditModal from './EditModal';
import axios from 'axios';
import { toast } from "react-toastify";
function AdminDashboard() {
  const [idtoremove, setidtoremove] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [edit, setedit] = useState(false);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const confirm = window.confirm;

  useEffect(()=>{

    axios.get('http://localhost:3002/api/users')
  .then(response => {        setUsers(response.data);

    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

  },[])
 
  {/*useEffect(() => {
    fetch('http://localhost:8000/user')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);*/}
  const handleEdit = (id) => {
    // Find the user with the matching ID in the data array
    const userToEdit = {...users.find(user => user.id === id)};
    // Open the modal
    setUserToEdit(userToEdit);
    setedit(true);
    setShowModal(true);
    console.log(`Editing user: ${userToEdit.name} (${userToEdit.email})`);
  };
  
  const handleSave = (updatedUser) => {
    // Find the index of the updated user in the data array
    const index = users.findIndex(user => user.id === updatedUser.id);
    // Update the user in the data array
   
    const newData = [...users];
    newData[index] = updatedUser;
    // Update the state with the new data array
    setUsers(newData);
    // Close the modal
    setShowModal(false);
    setUserToEdit(null);
    console.log(`User with ID ${updatedUser.id} has been updated`);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setUserToEdit(null);
  };
  const handleRemove = (id) => {


    if (confirm('Are you sure you want to delete this user?')) {
     // Filter out the user with the matching ID from the data array
  const updatedData = users.filter(user => user.id !== id);

  // Send a DELETE request to the API to remove the user 
  fetch(`http://localhost:3002/api/users/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toast.warning(`User has been deleted`);

    })
    .catch(error => console.log(error));

  // Update the state with the new data array
  setUsers(updatedData);
  }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    user.email?.toLowerCase().includes(searchTerm?.toLowerCase() || '') 
);



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-3">
          <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch} />
        </div>
      </div>
      <div className="col-md-6 mb-3">
   <Link to='/register'>
      <button>
      <BsPlusCircle size={20} />
      Add
    </button></Link></div>
      <table className="table">   
        <thead>
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((user) => (
            <tr key={user.id}>
            <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.gender}</td>
              <td>{user.phonenumber}</td>
              <td>
                <button className='btn btn-link'>    
                  <BsPencilSquare   title="Edit" onClick={() => handleEdit(user.id)} />
                </button>
                <button className="btn btn-link" title="Delete" onClick={() => handleRemove(user.id)}>
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Modal */}
       {showModal && <EditModal user={userToEdit} handleClose={handleModalClose} handleEdit={handleSave} show={edit
       } />
     
}
    
  </div>   
);
    
}

export default AdminDashboard;
