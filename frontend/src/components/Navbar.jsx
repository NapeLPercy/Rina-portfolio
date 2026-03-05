import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut, ChevronRight } from "lucide-react";
import Brand from "./Brand";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      logout();
      navigate("/");
    }
  };

  const guestNavItems = [
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog-posts" },
    { label: "Petitions", href: "/petitions" },
    { label: "Contact", href: "/contact-me" },
  ];

  const adminNavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Manage blogs", href: "/manage-blogs" },
    { label: "Manage resume", href: "/manage-resume" },
  ];

  const navItems = isLoggedIn ? adminNavItems : guestNavItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-plum-500 shadow-[0_10px_40px_rgba(154,91,255,0.3)]"
          : "bg-plum-400 shadow-[0_8px_30px_rgba(184,140,255,0.25)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="transform transition-all duration-500 hover:scale-105">
            <Brand variant="navbar" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => (
              <HashLink
                key={item.href}
                to={item.href}
                className="group relative px-5 py-2.5 rounded-xl font-body text-sm font-medium text-ink transition-all duration-300 hover:text-white hover:bg-white/15 hover:backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeSlideDown 0.6s ease-out backwards",
                }}
              >
                <span className="relative">
                  {item.label}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </span>
              </HashLink>
            ))}
          </div>

          {/* Desktop Auth Button */}
          <div
            className="hidden md:block"
            style={{ animation: "fadeSlideDown 0.6s ease-out 400ms backwards" }}
          >
            <Button
              variant={isLoggedIn ? "logout" : "login"}
              onClick={handleAuthClick}
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 animate-[spin_0.3s_ease-out]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-plum-500/95 backdrop-blur-xl border-t border-white/10 shadow-inner">
          <div className="px-6 py-6 space-y-1">
            {navItems.map((item, index) => (
              <div key={item.href}>
                <HashLink
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="group flex items-center justify-between px-5 py-4 rounded-xl text-white/90 font-body text-base font-medium transition-all duration-300 hover:bg-white/15 hover:text-white hover:translate-x-2 active:scale-[0.98]"
                  style={{
                    animation: isMobileMenuOpen
                      ? `slideInRight 0.4s ease-out ${index * 80}ms backwards`
                      : "none",
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </HashLink>

                {/* Divider line between items */}
                {index < navItems.length - 1 && (
                  <div className="mx-5 my-1 h-px bg-white/10" />
                )}
              </div>
            ))}

            {/* Mobile Auth Button */}
            <div
              className="pt-6"
              style={{
                animation: isMobileMenuOpen
                  ? `slideInRight 0.4s ease-out ${navItems.length * 80}ms backwards`
                  : "none",
              }}
            >
              <Button
                variant={isLoggedIn ? "logout" : "login"}
                onClick={() => {
                  closeMobileMenu();
                  /*onAuthClick?.();*/
                  handleAuthClick();
                }}
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
