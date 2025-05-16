export default function Login() {
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
            onChange={(e) => setName(e.target.value)}
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
          <input
            className="w-full p-2 border rounded-md mt-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            type="number"
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
