import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <>
     <div className="w-full max-w-xs pt-11 ml-48">
      <form className="backdrop-blur-sm bg-white/30 shadow-lg rounded px-8 pt-6 pb-8 rounded-3xl">
        <p className="text-3xl mb-7 font-bold text-gray-600 " >Sign in</p>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-2">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="email" type="text" placeholder="Enter your Email"></input>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-2">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="password" type="text" placeholder="Enter your Password"></input>
        </div>
        <div className="flex justify-between mb-6">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 text-sm rounded-xl">Login</button>
        <p className="text-xs font-semibold text-orange-400">forget password?</p>
        </div>
        <p className="text-xs font-semibold text-gray-600 text-center"> Do not have Account? <Link className="font-bold" to='/register'>Sign Up</Link></p>
      </form>
     </div>
    </>
  )
}

