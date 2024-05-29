import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function LoginForm() {
  let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(null);
    let navigate = useNavigate();

    let login = async (e) => {
      try {
          e.preventDefault();
          setError(null);
          let data = {
              email,
              password
          }
          let res = await axios.post('http://localhost:8000/api/v1/users/login', data, {
              withCredentials: true
          });
          if (res.status === 200) {
              navigate('/');
          }
      } catch (e) {
          setError(e.response.data.error);
      }
  }

  return (
    <>
     <div className="w-full max-w-xs pt-11 ml-48 mt-16">
      <form  onSubmit={login} className="backdrop-blur-sm bg-white/30 shadow-lg rounded px-8 pt-6 pb-8 rounded-3xl">
        <p className="text-3xl mb-7 font-bold text-gray-600 " >Sign in</p>
        <div className="mb-4">
          <label className="block text-gray-600 text-xs font-semibold mb-2">Email</label>
          <input value={email} onChange={e=> setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl" id="email" type="text" placeholder="Enter your Email"></input>
          {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-xs font-semibold mb-2">Password</label>
          <input value={password} onChange={e=> setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs rounded-2xl" id="password" type="text" placeholder="Enter your Password"></input>
          {!!(error) && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex justify-between mb-6">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 text-sm rounded-xl" type="submit">Login</button>
        <p className="text-xs font-semibold text-orange-400">forget password?</p>
        </div>
        <p className="text-xs font-semibold text-gray-600 text-center"> Do not have Account? <Link className="font-bold" to='/register'>Sign Up</Link></p>
      </form>
     </div>
    </>
  )
}

