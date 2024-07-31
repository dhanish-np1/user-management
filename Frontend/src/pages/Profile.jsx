import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice.js";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState("");
  const [formImg, setFormImage] = useState("");
  const [editing, setEditing] = useState(false);
  const { currentUser, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.username);
  const dispatch = useDispatch();
  const imagePath = `../uploads/${currentUser?.profile}`;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      setFormImage(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const toggleEditing = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const formData = new FormData();
      formData.append("images", formImg);
      formData.append("username", username);
      const userId = currentUser._id;
      const response = await fetch(`http://localhost:3000/update/${userId}`, {
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
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setEditing(false);
    } catch (error) {
      console.error("Error uploading profile:", error);
    }
  };

  const handleSignOut = async () => {
    await fetch("http://localhost:3000/signOut", {
      credentials: "include",
    });
    dispatch(signOut());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative ml-28">
              <img
                src={profileImage || imagePath}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
              />
              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              )}
            </div>
            <div className="mt-4 w-full text-center">
              {editing ? (
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className="text-lg font-medium border-b-2 border-gray-300 focus:outline-none w-full"
                  placeholder="Enter your username"
                />
              ) : (
                <h2 className="text-lg font-medium">{username}</h2>
              )}
            </div>
            <p className="text-red-600 mt-5">
              {error ? error.message || "Something went wrong!" : ""}
            </p>
            <p className="text-gray-600 text-center mt-2">
              {currentUser.email}
            </p>
            <div className="mt-4 flex flex-col space-y-2 w-full">
              {!editing ? (
                <button
                  type="button"
                  onClick={toggleEditing}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save
                </button>
              )}
              <button
                type="button"
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
