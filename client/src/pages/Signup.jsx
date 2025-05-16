import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";
import API from "../api/axios";
import ps5Cart from "../assets/ps5 stick Image May 14, 2025, 10_21_50 PM.png";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const hendleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateName(name)) {
      setError("Name must be between 3 and 20 characters in length.");
      return;
    } else {
      setError("");
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    } else {
      setError("");
    }

    if (!validatePassword(password)) {
      setError("Password must be 6–30 characters long and contain only letters, numbers, @ or #.");
      return;
    } else {
      setError("");
    }

    if (!validatePhone(phone)) {
      setError("Phone No must be between 10 and 15 digits.");
      return;
    } else {
      setError("");
    }

    try {
      const response = await API.post("/register", {
        email: email,
        name: name,
        password: password,
        phone: phone,
      });
      login(response.data.access_token);

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

  const validateName = (name) => {
    return /^[A-Za-z\s]{3,20}$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^[A-Za-z0-9@#]{6,30}$/;
    return passwordPattern.test(password);
  };

  const validatePhone = (phone) => {
    return /^\d{10,15}$/.test(phone);
  };

  return (
    <div className="flex justify-between items-center mt-7">
      <div>
        <img src={ps5Cart} alt="Left img" className="w-full h-[550px]" />
      </div>

      <div className="flex flex-col justify-center w-1/2 gap-2.5 items-center">
        <div className="flex flex-col justify-center w-1/2  gap-2.5">
          <h3>Create an account</h3>
          <p>Enter your details below</p>
          <input
            className="py-2 border-b "
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
          />
          <input
            className="py-2 border-b "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="py-2 border-b "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <input
            className="py-2 border-b"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            type="number"
            required
          />

          {error && !error.email && !error.password && (
            <p className="text-red-600 mt-2">{error}</p>
          )}

          <button
            className="py-2 border border-custom_red text-white bg-custom_red mt-4 rounded-md"
            onClick={hendleSignUp}
          >
            Create Account
          </button>

          <button
            className="rounded-md py-2 border border-black "
            // onClick={hendleGoogleLogin}
          >
            <i className="fab fa-google fa-1x mx-3"></i>
            <span>Signup With Google</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"}>
              <button
                className="py-1 border-b font-semibold text-gray-600
              focus:text-gray-800 focus:outline-none"
              >
                Login
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
