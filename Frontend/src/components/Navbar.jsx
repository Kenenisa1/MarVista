import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { 
  FaPlus, 
  FaSignInAlt, 
  FaUserPlus, 
  FaBars, 
  FaTimes, 
  FaProductHunt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { styles } from '../styles';
import { useUserStore } from "../Store/user";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, signout } = useUserStore();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-slate-900 via-gray-900 to-slate-900 shadow-2xl border-b border-slate-800">
      <nav className={`${styles.container} ${styles.flexBetween} py-4`}>
        
        {/* Logo and Brand */}
        <Link 
          to="/" 
          className={`${styles.flexStart} space-x-3 cursor-pointer group`}
        >
          <img 
            src={logo} 
            alt="Product Store" 
            className="w-30 h-20 md:w-12 md:h-12 object-contain transition-transform duration-500 group-hover:rotate-6"
          />
          <span className="hidden md:inline text-2xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
            Product Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/Products" 
            className={`${styles.flexCenter} relative px-4 py-2 ${styles.transition} group`}
          >
            <AiOutlineAppstoreAdd className="text-white text-xl mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-white font-medium">Products</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link 
            to="/CreatePage" 
            className={`${styles.flexCenter} px-5 py-2.5 ${styles.roundedLg} ${styles.transition} bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25`}
          >
            <FaPlus className="text-white mr-2" />
            <span className="text-white font-semibold">Add Product</span>
          </Link>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`${styles.flexCenter} space-x-2 px-4 py-2.5 ${styles.roundedLg} ${styles.transition} border border-slate-700 hover:border-indigo-500 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm`}
              >
                <div className={`${styles.flexCenter} w-9 h-9 bg-linear-to-r from-indigo-500 to-purple-500 ${styles.roundedFull} text-white font-bold text-lg shadow-lg`}>
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{user.username}</p>
                  <p className="text-xs text-slate-400 truncate max-w-[120px]">{user.email}</p>
                </div>
                <FaUserCircle className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
              </button>

              {isProfileOpen && (
                <div className={`absolute right-0 mt-3 w-64 bg-slate-900/95 backdrop-blur-xl ${styles.roundedXl} ${styles.shadowXl} border border-slate-800 py-3 z-50 animate-fadeIn`}>
                  <div className="px-4 py-3 border-b border-slate-800">
                    <p className="text-white font-semibold">{user.username}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>

                  {['/profile', '/orders', '/settings'].map((path, index) => {
                    const icons = [FaUserCircle, FaShoppingCart, FaCog];
                    const labels = ['My Profile', 'My Orders', 'Settings'];
                    const Icon = icons[index];
                    
                    return (
                      <Link 
                        key={path}
                        to={path} 
                        onClick={() => setIsProfileOpen(false)}
                        className={`${styles.flexStart} px-4 py-3 text-slate-300 hover:text-indigo-400 hover:bg-slate-800/50 ${styles.transition} cursor-pointer group/item`}
                      >
                        <Icon className={`${styles.iconMd} mr-3 group-hover/item:scale-110 transition-transform`} />
                        <span>{labels[index]}</span>
                        <div className="ml-auto w-1 h-5 bg-indigo-500 scale-y-0 group-hover/item:scale-y-100 transition-transform"></div>
                      </Link>
                    );
                  })}

                  <div className="border-t border-slate-800 my-2"></div>

                  <button
                    onClick={handleSignOut}
                    className={`${styles.flexStart} w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 ${styles.transition} cursor-pointer group/item`}
                  >
                    <FaSignOutAlt className={`${styles.iconMd} mr-3 group-hover/item:rotate-12 transition-transform`} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={`${styles.flexCenter} space-x-4`}>
              <Link 
                to="/SignIn" 
                className={`${styles.flexCenter} px-5 py-2.5 ${styles.roundedLg} ${styles.transition} border border-slate-700 text-white hover:border-indigo-500 hover:text-indigo-400`}
              >
                <FaSignInAlt className="mr-2" />
                <span>Sign In</span>
              </Link>

              <Link 
                to="/SignUp" 
                className={`${styles.flexCenter} px-5 py-2.5 ${styles.roundedLg} ${styles.transition} bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-indigo-500/25`}
              >
                <FaUserPlus className="mr-2" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2.5 ${styles.roundedLg} hover:bg-slate-800 ${styles.transition} cursor-pointer border border-slate-800`}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-indigo-400 text-xl" />
          ) : (
            <FaBars className="text-white text-xl" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-2xl animate-slideDown">
          <div className="px-5 py-4 space-y-3">
            {user && (
              <div className={`px-4 py-3 bg-linear-to-r from-slate-800 to-slate-900 ${styles.roundedLg} mb-3 border border-slate-800`}>
                <div className={`${styles.flexStart} space-x-3`}>
                  <div className={`${styles.flexCenter} w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-500 ${styles.roundedFull} text-white font-bold text-xl shadow-lg`}>
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.username}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <Link 
              to="/Products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-slate-800/50 text-white hover:text-indigo-400 ${styles.transition} cursor-pointer group`}
            >
              <FaProductHunt className="text-xl mr-3 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Products</span>
              <div className="ml-auto w-1 h-5 bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform"></div>
            </Link>

            <Link 
              to="/CreatePage" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white ${styles.transition} cursor-pointer`}
            >
              <FaPlus className="text-xl mr-3" />
              <span className="font-semibold">Add Product</span>
            </Link>

            {user ? (
              <>
                {['/profile', '/orders', '/settings'].map((path, index) => {
                  const icons = [FaUserCircle, FaShoppingCart, FaCog];
                  const labels = ['My Profile', 'My Orders', 'Settings'];
                  const Icon = icons[index];
                  
                  return (
                    <Link 
                      key={path}
                      to={path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-slate-800/50 text-slate-300 hover:text-indigo-400 ${styles.transition} cursor-pointer group`}
                    >
                      <Icon className="text-xl mr-3 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{labels[index]}</span>
                    </Link>
                  );
                })}

                <button
                  onClick={handleSignOut}
                  className={`${styles.flexStart} w-full px-4 py-3 ${styles.roundedLg} text-red-400 hover:bg-red-900/20 hover:text-red-300 ${styles.transition} cursor-pointer`}
                >
                  <FaSignOutAlt className="text-xl mr-3" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/SignIn" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} border border-slate-700 text-white hover:border-indigo-500 hover:text-indigo-400 ${styles.transition} cursor-pointer`}
                >
                  <FaSignInAlt className="text-xl mr-3" />
                  <span className="font-medium">Sign In</span>
                </Link>

                <Link 
                  to="/SignUp" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white ${styles.transition} cursor-pointer`}
                >
                  <FaUserPlus className="text-xl mr-3" />
                  <span className="font-semibold">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;