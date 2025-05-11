import React from "react";
import { useAuth } from "../App";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="text-gray-700">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address || "Not provided"}</p>
        <p><strong>Role:</strong> {user.role || "Not provided"}</p>
      </div>
    </div>
  );
};

export default Profile;
