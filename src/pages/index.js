import { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaUser } from "react-icons/fa"; // Importing React Icons

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupUser, setPopupUser] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/v1/get-users"
      );
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error(
          "Expected an array of users, but received:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const claimPoints = async (username) => {
    try {
      setIsPopupVisible(true); // Show popup before API call
      await axios.patch("http://localhost:7000/api/user/v1/claim-points", {
        username,
      });
      fetchUsers();
      setPopupUser(username);
    } catch (error) {
      console.error("Error claiming points:", error);
    } finally {
      setTimeout(() => setIsPopupVisible(false), 2000); // Hide popup after 2 seconds
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-600">
        Home Page
      </h1>

      {/* Ordered List for Numbered Items */}
      <ol className="list-decimal space-y-4 sm:space-y-6 md:space-y-8 border border-gray-300 text-indigo-500 w-full md:max-w-4xl pl-6">
        {users.slice(0, 10).map((user, index) => (
          <li
            key={user._id}
            className="p-4 rounded-lg transition duration-200 ease-in-out cursor-pointer text-lg sm:text-xl md:text-2xl flex items-center justify-between hover:bg-indigo-100 hover:border-gray-300"
            onClick={() => claimPoints(user.username)}
          >
            <div className="flex items-center space-x-2">
              {/* Person Icon for the User */}
              <FaUser className="text-indigo-700 text-xl" />
              <span className="font-semibold text-indigo-600">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <span className="text-lg text-blue-600">Points: {user.Points}</span>
          </li>
        ))}
      </ol>

      {/* Popup Notification */}
      {isPopupVisible && (
        <div className="fixed top-40 right-50 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 transition-opacity duration-300 opacity-90 max-w-sm w-full sm:max-w-xs md:max-w-md">
          <FaCheckCircle className="text-blue-500 text-2xl" />
          <span className="text-blue-600 font-medium text-sm sm:text-base">
            Points claimed successfully for {popupUser}...
          </span>
        </div>
      )}
    </div>
  );
};

export default Home;
