import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect-dark border-b border-neon-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              PhishGuard
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-300 hover:text-neon-green smooth-transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-neon-green smooth-transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-300 hover:text-neon-green smooth-transition"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-neon-green smooth-transition"
            >
              Contact
            </button>
          </div>

          {/* Right Side - Dark Mode Toggle & Auth Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 smooth-transition text-neon-green"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="hidden sm:flex gap-3">
              <button className="px-4 py-2 text-neon-green border border-neon-green/50 rounded-lg hover:bg-neon-green/10 smooth-transition">
                Login
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-black rounded-lg font-semibold hover-glow-green smooth-transition">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neon-green"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-neon-green hover:bg-white/5 rounded smooth-transition"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-neon-green hover:bg-white/5 rounded smooth-transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-neon-green hover:bg-white/5 rounded smooth-transition"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-neon-green hover:bg-white/5 rounded smooth-transition"
            >
              Contact
            </button>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 px-4 py-2 text-neon-green border border-neon-green/50 rounded-lg hover:bg-neon-green/10 smooth-transition">
                Login
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-black rounded-lg font-semibold hover-glow-green smooth-transition">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
