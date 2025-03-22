import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" }
];

export default function Client() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
     <nav className="bg-[#0D0E22] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-white text-2xl font-bold">Daffodil Convent School</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {pages.map(({ name, path }) => (
            <Link key={name} to={path} className="text-white hover:text-gray-200">
              {name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {pages.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="block text-white text-center py-2 bg-[#23243D]"
              onClick={() => setNavOpen(false)}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
    <div className="w-full h-auto bg-[#1B1C30]">
    <Outlet/>
    </div>
    </>
  );
}
