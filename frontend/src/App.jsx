import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar/>
      <div className="flex">
      <Outlet/>
      <img src="../src/assets/3D-uv-04-removebg-preview.png" alt="" className="ml-32"  />
      <img src="../src/assets/th__1_-removebg-preview.png" className="h-44 mt-80 pr-7"/>
      </div>
    </div>
  )
}

