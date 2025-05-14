import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";

function Signup() {
  const navigate = useNavigate();
    const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hendleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    } else {
      setError("");
    }

    if (!validatePassword(password)) {
      setError(`Password must be between 6 and 30 characters in length.`);
      return;
    } else {
      setError("");
    }
    if (!validateFirstName(name)) {
      setError("Name must be between 3 and 20 characters in length.");
      return;
    } else {
      setError("");
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        email: email,
        name: name,
        password: password,
      });
      login(response.data.token);

      console.log(response.status);
      if (response.status === 201) {
        alert("Sign Up successful!");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email is already taken. Please use a different email.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^[A-Za-z0-9@#]*$/;
    return passwordPattern.test(password);
  };
  const validateFirstName = (name) => {
    return /^[A-Za-z\s]{3,20}$/.test(name);
  };

  return (
    <div
      className="p-20 bg-image bg-[50%] bg-cover}"
      style={{
        backgroundImage: "url(https://blog.hubspot.com/hubfs/To_Do_List.png)",
        height: "400px",
      }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="bg-white px-20 py-5 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
          <h2 className="font-bold text-2xl mb-5 text-center">Sign Up </h2>
          <input
            className="w-full p-2 border rounded-md mt-4"
            value={name}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Full Name"
            type="text"
            required
          />
          <input
            className="w-full p-2 border rounded-md mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="w-full p-2 border rounded-md mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />

          <button
            className="w-full p-2 bg-teal-600 text-white rounded-3xl mt-4 "
            onClick={hendleSignUp}
          >
            Sign up
          </button>
          {error && !error.email && !error.password && (
            <p className="text-red-600 mt-2">{error}</p>
          )}
          <p className="text-center text-sm text-gray-500">
            Already have an account ?
            <Link to={"/login"}>
              <button className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">
                Login
              </button>
              .
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
