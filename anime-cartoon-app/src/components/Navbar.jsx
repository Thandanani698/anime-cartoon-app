import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">Anime Cartoon App</h1>
      <div>
        <Link className="mr-4" to="/">Home</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1">Logout</button>
        ) : (
          <>
            <Link className="mr-2" to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
