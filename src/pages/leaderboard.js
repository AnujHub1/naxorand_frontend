import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrophy } from "react-icons/fa";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserHistory, setSelectedUserHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [rank, setRank] = useState(1);
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
        console.error("Expected an array of users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserHistory = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/v1/your-history",
        { username }
      );
      if (Array.isArray(response.data.data)) {
        setSelectedUserHistory(response.data.data);
        setSelectedUsername(username);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  const sortedUsers = [...users].sort((a, b) => b.Points - a.Points);

  return (
    <div className="container mx-auto p-4 bg-indigo-500 mt-10 h-full my-6">
      <h1 className="text-3xl text-white font-semibold text-center mb-6">
        Leaderboard
      </h1>

      <div className="flex justify-center mb-4">
        <button className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-950 transition duration-200">
          Daily
        </button>
        <button className="mx-2 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-950 transition duration-200">
          Weekly
        </button>
        <button className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 transition duration-200">
          Monthly
        </button>
      </div>

      <ul className=" space-y-3">
        {sortedUsers.map((user, index) => (
          <li
            key={user._id}
            className="cursor-pointer p-3 rounded-lg bg-white hover:bg-gray-100 transition duration-150 ease-in-out"
            onClick={() => fetchUserHistory(user.username)}
          >
            {/* Displaying rank */}
            <div className="flex items-center">
              <span className="font-medium text-lg font-robotoCondensed font-semibold">
                Rank : {index + 1}
              </span>
              <FaTrophy className="ml-2 text-yellow-500 font-medium" />
            </div>
            {user.firstName} {user.lastName}
            <span className="ml-3 text-base text-gray-600  font-medium">
              Points: {user.Points}
            </span>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50  transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform scale-100 transition-transform duration-300 ease-out">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Point History of {selectedUsername}
            </h2>
            <ul className="space-y-2">
              {selectedUserHistory.map((entry, index) => (
                <li key={index} className="text-gray-700">
                  {entry.date}:{" "}
                  <span className="font-semibold">
                    {entry.pointsAwarded} points
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="mt-6 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
