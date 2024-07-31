import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice.js";
const EditUserModal = ({ user, onClose, onUpdateUser }) => {
  const imagePath = `.././uploads/`;
  const [name, setName] = useState(user.username);
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(imagePath + user.profile);
  const fileInputRef = useRef(null);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const formData = new FormData();
      formData.append("images", image);
      formData.append("username", name);
      formData.append("id",user._id);
      const response = await fetch(`http://localhost:3000/admin/edit`, {
        method: "POST",
        headers: {},
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(updateUserFailure(errorData));
        return;
      }

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      onUpdateUser({ data, name, image });
      
    } catch (error) {
      console.error("Error uploading profile:", error);
    }
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center h-full w-full">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit User
        </h3>
        <div className="flex items-center justify-center mb-6">
          <div
            onClick={handleImageClick}
            className="w-24 h-24 cursor-pointer rounded-full overflow-hidden border-4 border-gray-300"
          >
            <img
              src={imagePreview}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-md appearance-none border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-red-600 mt-5">
            {error ? error.message || "Something went wrong!" : ""}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
