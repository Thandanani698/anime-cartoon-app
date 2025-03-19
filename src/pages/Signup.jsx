import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Signup successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSignup}>
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input type="text" className="border p-2 w-full mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" className="border p-2 w-full mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
