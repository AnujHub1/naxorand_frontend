import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // New state for popup visibility
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLeaderboardClick = () => {
    if (user) {
      router.push("/leaderboard");
    } else {
      setIsPopupVisible(true); // Show styled popup if user is not logged in
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    router.push("/login"); // Redirect to login page when popup is closed
  };

  return (
    <nav className="p-4 h-24 fixed z-50 w-full bg-white flex justify-between items-center text-gray-900 hover:text-black border border-b-2">
      <h1 className="text-xl md:text-3xl font-bold font-robotoCondensed text-indigo-600">
        Nexorand
      </h1>

      <ul className="flex flex-row gap-2 text-sm sm:text-base md:gap-4 lg:gap-8 p-3 md:text-lg lg:text-xl font-robot font-medium">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <button onClick={handleLeaderboardClick} className="cursor-pointer">
            Leaderboard
          </button>
        </li>
        <li>
          {user ? (
            ""
          ) : (
            <Link
              href="/register"
              className="border border-black p-2 rounded-lg hover:bg-gray-200"
            >
              Register
            </Link>
          )}
        </li>

        {user ? (
          <div className="relative">
            {/* User Icon with Dropdown */}
            <button onClick={toggleDropdown} className="focus:outline-none">
              <Image
                src="/images.png"
                alt="User Icon"
                width={100}
                height={100}
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-20 right-0 bg-white text-gray-700 p-4 shadow-xl z-50 w-80 border border-gray-300 rounded-lg">
                <p className="font-semibold">
                  Hello, {user.userData.firstName}!
                </p>
                <p className="text-base">
                  <b>Email:</b> {user.userData.email}
                </p>
                <p>
                  <b>Points:</b> {user.userData.Points}
                </p>
                <button
                  onClick={logout}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <li>
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Styled Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Please Log In
            </h2>
            <p className="text-gray-700 mb-6">
              You need to log in to access the leaderboard.
            </p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
