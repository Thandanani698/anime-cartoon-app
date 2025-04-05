import { useState } from "react";

const ParentalControl = ({ onSetRestricted }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = "parent123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      onSetRestricted(false);
    } else {
      alert("Incorrect password. Try again!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-100">
      {isAuthenticated ? (
        <p className="text-green-600 font-semibold">Restrictions Disabled ✅</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-medium mb-2">
            Enter Parental Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Unlock Content
          </button>
        </form>
      )}
    </div>
  );
};

export default ParentalControl;
