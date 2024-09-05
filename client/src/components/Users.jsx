import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = () => {
    axios
      .get("https://deploy-api-gold.vercel.app/")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  };

  // Function to handle delete
  const handleDelete = (id) => {
    axios
      .delete("https://deploy-api-gold.vercel.app/deleteUser/" + id)
      .then((result) => {
        console.log(result);

        // Show success toast notification
        toast.success("Successfully deleted!");

        // Update the users list by removing the deleted user
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
        // Show error toast notification if something goes wrong
        toast.error("Error deleting user.");
      });
  };

  return (
    <div className="h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white h-72 w-[34rem] p-5">
        <Link
          to="/createuser"
          className="bg-green-800 font-semibold text-white px-2 py-1 rounded-lg"
        >
          Add+
        </Link>
        <table className="w-full mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Age</th>
              <th className="p-3 w-48">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.age}</td>
                  <td className="p-3 flex justify-around">
                    <Link
                      to={`/update/${user._id}`}
                      className="bg-green-600 font-semibold text-white px-2 py-1 rounded-sm"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 font-semibold text-white px-2 py-1 rounded-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Users;
