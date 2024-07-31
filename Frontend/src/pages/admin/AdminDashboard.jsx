import React, { useState, useMemo, useEffect } from 'react';
import UserTable from './UserTable';
import EditUserModal from './EditUserModal';
import CreateUserModal from './CreateUserModal';
import AdminHeader from '../../components/AdminHeader';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/getData');
        const data = await response.json();
        setUsers(data.userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsEditModalOpen(false);
  };

  const handleCreateUser = (newUser) => {
    setUsers([...users, newUser]);
    setIsCreateModalOpen(false);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Create New User
          </button>
        </div>

        <UserTable 
          users={filteredUsers} 
          onEditUser={handleEditUser} 
          onDeleteUser={handleDeleteUser} 
        />

        {isEditModalOpen && (
          <EditUserModal
            user={editingUser}
            onClose={() => setIsEditModalOpen(false)}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {isCreateModalOpen && (
          <CreateUserModal
            onClose={() => setIsCreateModalOpen(false)}
            onCreateUser={handleCreateUser}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
