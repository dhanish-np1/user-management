import React, { useEffect, useState } from "react";



function App() {
  const [data, setData] = useState([{ id: 1, name: "John Doe", email: "john.doe@example.com" },]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try
      {
        const response = await fetch('/api/admin/users');
        if (!response.ok)
        {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (error)
      {
        setError(error.message);
        setLoading(false);
      }
    };
    setfetchd(false);
    fetchUsers();
  }, [fetchd]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
  };

  const handleEdit = (id) => {
    setEditUserId(id);
  };

  const handleSave = () => {
    const updatedData = data.map((user) =>
      user.id === editUserId ? { ...user, name: newUser.name } : user
    );
    setData(updatedData);
    setEditUserId(null);
    setNewUser({ name: "", email: "", password: "" });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    const newUserData = {
      id: data.length + 1,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
    setData([...data, newUserData]);
    setNewUser({ name: "", email: "", password: "" });
    setIsModalOpen(false);
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin User Table</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                {editUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {editUserId === user.id ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        Create New User
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleNewUserChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleNewUserChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newUser.password}
                onChange={handleNewUserChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCreateUser}
              >
                Create User
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
