import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Projects', to: '/projects' },
  { name: 'Blogs', to: '/blogs' },
  { name: 'Contact', to: '/contact' },
];

const navItemClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
    isActive ? 'text-[#FFD700] bg-white/10' : 'text-[#E0E0E0] hover:text-[#FFD700] hover:bg-white/5'
  }`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#31194D]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-[#FFD700] hover:text-white transition-colors"
          >
            Issam
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.to} className={navItemClass}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden text-[#E0E0E0] hover:text-[#FFD700] p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#31194D] border-t border-white/10">
          <div className="px-3 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={navItemClass}
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
