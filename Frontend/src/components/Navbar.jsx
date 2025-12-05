import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaPlus, FaBookOpen, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { styles } from '../styles';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className={`${styles.container} ${styles.flexBetween} px-4 py-3`}>
        
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity cursor-pointer">
            <img 
              src={logo} 
              alt="Product Store Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className="hidden md:inline text-xl font-bold text-gray-900">
              Product Store
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={`${styles.primaryLink} flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer`}>
            <FaBookOpen className={styles.iconSize} />
            <span>Products</span>
          </Link>

          <Link to="/CreatePage" className={`${styles.secondaryButton} cursor-pointer`}>
            <FaPlus className={styles.iconSize} />
            <span>Add Product</span>
          </Link>

          <Link to="/SignIn" className={`${styles.primaryButton} cursor-pointer`}>
            <FaSignInAlt className={styles.iconSize} />
            <span>Sign In</span>
          </Link>

          <Link to="/SignUp" className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors cursor-pointer">
            <FaUserPlus className="inline mr-2" />
            <span>Sign Up</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6 text-gray-700" />
          ) : (
            <FaBars className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-slideDown">
          <div className="px-4 py-3 space-y-1">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <FaBookOpen className={styles.iconSize} />
              <span className="font-medium">Products</span>
            </Link>

            <Link 
              to="/CreatePage" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              <FaPlus className={styles.iconSize} />
              <span className="font-medium">Add Product</span>
            </Link>

            <Link 
              to="/SignIn" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <FaSignInAlt className={styles.iconSize} />
              <span className="font-medium">Sign In</span>
            </Link>

            <Link 
              to="/SignUp" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              <FaUserPlus className={styles.iconSize} />
              <span className="font-medium">Sign Up</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;