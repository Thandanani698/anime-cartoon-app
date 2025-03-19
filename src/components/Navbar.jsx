import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Anime App</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/signup" className="mx-2">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
