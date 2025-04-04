import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user?._id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-violet-600 text-white p-2 flex justify-between sticky top-0 z-50 shadow-md">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {userId && <Link to={`/profile/${userId}`} className="hover:underline">Profile</Link>}
      </div>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
