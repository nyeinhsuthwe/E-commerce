import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirmed, setPasswordConfirmed] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const userRegister = async (e) => {
    e.preventDefault();
    await register.mutateAsync({
      name,
      email,
      password,
      passwordConfirmed,
    });

    navigate("/");
  };

  return (
    <div className="flex">
      <div className="w-full max-w-sm pt-11 ml-48 mt-16">
        <form
          onSubmit={(e) => userRegister(e)}
          className="backdrop-blur-lg bg-white/10 shadow-lg px-8 pt-6 pb-8 rounded-3xl"
        >
          <p className="text-3xl mb-4 font-bold text-gray-600 ">
            Register Form
          </p>

          <div className="mb-2">
            <label className="block text-gray-600 text-xs font-semibold mb-2">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl"
              id="name"
              type="text"
              placeholder="Enter your Name"
            ></input>
          </div>

          <div className="mb-2">
            <label className="block text-gray-600 text-xs font-semibold mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl"
              id="email"
              type="text"
              placeholder="Enter your Email"
            ></input>
          </div>

          <div className="mb-2">
            <label className="block text-gray-600 text-xs font-semibold mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="shadow appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl"
              id="password"
              placeholder="Enter your Password"
            ></input>
          </div>

          <div className="mb-2">
            <label className="block text-gray-600 text-xs font-semibold mb-2">
              confirm Password
            </label>
            <input
              value={passwordConfirmed}
              onChange={(e) => setPasswordConfirmed(e.target.value)}
              type="password"
              className="shadow appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl"
              placeholder="Confirm your Password"
            ></input>
          </div>
          <p className="text-orange-700 text-xs font-semibold mb-3"></p>
          <div className="flex justify-between mb-6 mt-4">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 text-sm rounded-xl"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <p className="text-xs font-semibold text-gray-600 text-center">
            {" "}
            Already have an Account?{" "}
            <Link className="font-bold" to="/login">
              Log in
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
