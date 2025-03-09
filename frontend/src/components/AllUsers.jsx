import { ALL_USERS_API } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(ALL_USERS_API, {
            withCredentials: true
        });
        setUsers(response.data.users); // Ensure backend returns users array
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.fullname} - {user.email}
              <button onClick={() => navigate(`/profile/${user._id}`)}>
                Visit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;
