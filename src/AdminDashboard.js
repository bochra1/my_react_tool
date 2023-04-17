import React, { useState, useEffect } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

function AdminDashboard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

 
  useEffect(() => {
    fetch('http://localhost:8000/user')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);
  const handleEdit = (id) => {
    // Find the user with the matching ID in the data array
    const userToEdit = {...data.find(user => user.id === id)};
    // Open the modal
    setUserToEdit(userToEdit);
    setShowModal(true);
    console.log(`Editing user: ${userToEdit.name} (${userToEdit.email})`);
  };
  
  
  const handleModalClose = () => {
    setShowModal(false);
    setUserToEdit(null);
  };
  const handleRemove = (id) => {
   // Filter out the user with the matching ID from the data array
  const updatedData = data.filter(user => user.id !== id);

  // Send a DELETE request to the API to remove the user from the JSON file
  fetch(`http://localhost:8000/user/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`User with ID ${id} has been deleted`);
    })
    .catch(error => console.log(error));

  // Update the state with the new data array
  setData(updatedData);

  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.username?.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
    item.email?.toLowerCase().includes(searchTerm?.toLowerCase() || '') 
);



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-3">
          <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={handleSearch} />
        </div>
      </div>
      <table className="table">   
        <thead>
          <tr>
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
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td>{item.role}</td>
              <td>
                <button className='btn btn-link'>    
                  <BsPencilSquare onClick={() => handleEdit(item.id)} />
                </button>
                <button className="btn btn-link" onClick={() => handleRemove(item.id)}>
                  <BsTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Modal */}
    {userToEdit && showModal && (
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form fields */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
    
}

export default AdminDashboard;
