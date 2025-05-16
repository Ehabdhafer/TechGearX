import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/Authcontext";
import { useGoogleLogin } from "@react-oauth/google";
import API from "../api/axios";
import axios from "axios";

import ps5Cart from "../assets/ps5 stick Image May 14, 2025, 10_21_50 PM.png";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [userGoogle, setUserGoogle] = useState([]);

  const loginbygoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUserGoogle(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (userGoogle.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`
        )
        .then(async (res) => {
          try {
            const response = await API.post("/google_login", res.data);
            const token = response.data.access_token;

            // Make sure the token is not undefined or null before storing it
            if (token) {
              login(token);
              navigate("/");
            }

            // Rest of your code...
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log("Google User Info Error:", err.message));
    }
  });

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
      setError(
        "Password must be 6–30 characters long and contain only letters, numbers, @ or #."
      );
      return;
    } else {
      setError("");
    }

    try {
      const response = await API.post("/login", {
        email: email,
        password: password,
      });
      login(response.data.access_token);

      if (response.status === 200) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Invalid Email or Password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^[A-Za-z0-9@#]{6,30}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className="lg:flex justify-between items-center mt-7">
      <div className="lg:block hidden">
        <img src={ps5Cart} alt="Left img" className="w-full h-[550px]" />
      </div>

      <div className="flex flex-col justify-center lg:w-1/2 gap-2.5 items-center">
        <div className="flex flex-col justify-center sm:w-1/2  gap-2.5">
          <h3>Log in to Exclusive</h3>
          <p>Enter your details below</p>
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

          {error && !error.email && !error.password && (
            <p className="text-red-600 mt-2">{error}</p>
          )}

          <div className="mt-4 flex justify-between items-center">
            <button
              className="py-2 border border-custom_red text-white bg-custom_red rounded-md w-40"
              onClick={hendleSignUp}
            >
              Login
            </button>
            <Link to={"/forget-password"}>
              <button
                className="py-1 font-semibold text-custom_red
              focus:text-gray-800 focus:outline-none ml-4"
              >
                Forget Password?
              </button>
            </Link>
          </div>

          <button
            className="rounded-md py-2 border border-black "
            onClick={() => loginbygoogle()}
          >
            <i className="fab fa-google fa-1x mx-3"></i>
            <span>Login With Google</span>
          </button>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <Link to={"/register"}>
              <button
                className="py-1 font-semibold text-gray-600
              focus:text-gray-800 focus:outline-none ml-4"
              >
                Register
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
