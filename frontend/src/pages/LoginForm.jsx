import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const { login, error } = useAuth();
  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login.mutate({ email, password });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-full max-w-sm pt-11 ml-48 mt-16">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="backdrop-blur-lg bg-white/10 shadow-lg  px-8 pt-6 pb-8 rounded-3xl"
        >
          <p className="text-3xl mb-7 font-bold text-gray-600 ">Sign in</p>
          <div className="mb-4">
            <label className="block text-gray-600 text-xs font-semibold mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border  w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl"
              id="email"
              type="text"
              placeholder="Enter your Email"
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-xs font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl"
              id="password"
              placeholder="Enter your Password"
            ></input>
          </div>
          {!!error && (
            <p className="text-orange-700 text-xs font-semibold mb-3">
              {error}
            </p>
          )}
          <div className="flex justify-between mb-6">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 text-sm rounded-xl"
              type="submit"
            >
              Login
            </button>
            <p className="text-xs font-semibold text-orange-700 mt-3">
              <Link>forget password?</Link>
            </p>
          </div>
          <p className="text-xs font-semibold text-gray-600 text-center">
            {" "}
            Do not have Account?{" "}
            <Link className="font-bold" to="/register">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      <img
        src="../src/assets/th__1_-removebg-preview.png"
        className="h-44 mt-80 ml-24"
      />
      <img src="../src/assets/3D-uv-04-removebg-preview.png" alt="" />
    </div>
  );
}
