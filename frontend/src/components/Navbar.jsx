import {Link, NavLink} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='sticky top-0'>
        <nav className='flex justify-between font-bold items-center p-4 pl-20 pr-20 bg-transparent '>
            <div>
                <h1 className='font-bold text-2xl text-orange-500'>E-commerce</h1>
            </div>

            <ul className='flex space-x-11 text-sm font-bold text-gray-600 '>
                <li><Link to="/" className='hover:text-orange-500'>Home</Link></li>
                <li><Link to="/" className='hover:text-orange-500'>Home</Link></li>
                <li><Link to="/" className='hover:text-orange-500'>Home</Link></li>
                <li><Link to="/" className='hover:text-orange-500'>Home</Link></li>
            </ul>
          
          <NavLink to='/login'><button className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-5 text-sm rounded-xl">Login</button></NavLink>
        </nav>
    </div>
  )
}
