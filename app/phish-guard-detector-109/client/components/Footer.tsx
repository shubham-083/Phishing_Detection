import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-neon-green/20 bg-gradient-to-t from-black/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent mb-4">
              PhishGuard
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Advanced phishing detection powered by AI to keep your inbox safe.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-neon-green/20 flex items-center justify-center text-neon-green smooth-transition"
                title="Twitter"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-neon-green/20 flex items-center justify-center text-neon-green smooth-transition"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-neon-green/20 flex items-center justify-center text-neon-green smooth-transition"
                title="GitHub"
              >
                ⚙
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Features
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-neon-green smooth-transition text-sm"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neon-green/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-500 text-sm flex items-center justify-center sm:justify-start gap-1">
              © {currentYear} PhishGuard. All rights reserved. Made with{" "}
              <Heart size={14} className="text-neon-red" /> for your security.
            </p>
            <p className="text-gray-500 text-sm mt-4 sm:mt-0">
              Stay vigilant, stay safe.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
