import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <div>
        <nav className="py-2 h-10 bg-black text-white text-center">
          <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
          <span>ShopNow</span>
          <span>English</span>
        </nav>

        <nav className="p-4 border-b flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/register">Sign Up</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route
            path="*"
            element={
              <div className="p-10 text-red-500">404 - Page Not Found</div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
