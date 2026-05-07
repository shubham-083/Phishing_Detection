import { useState, useRef } from "react";
import { Upload, Zap } from "lucide-react";
import { signupUser, sendOTP, verifyOTP } from "@/api/auth";

interface HeroProps {
  onScan: (content: string) => void;
  isLoading: boolean;
}

export default function Hero({ onScan, isLoading }: HeroProps) {
  const [emailContent, setEmailContent] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === "text/plain" || file.name.endsWith(".eml")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setEmailContent(content);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setEmailContent(content);
      };
      reader.readAsText(files[0]);
    }
  };

  const handleScan = () => {
    if (emailContent.trim()) {
      onScan(emailContent);
    }
  };

  // Typing animation text
  const placeholderText =
    "Paste your email content here or upload a .txt/.eml file...";

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 animated-gradient-bg relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-green/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-green bg-clip-text text-transparent">
              Detect Phishing Emails
            </span>
            <br />
            <span className="text-white">Instantly</span>
          </h1>
          <p className="text-lg text-gray-400 mb-2 max-w-2xl mx-auto">
            Advanced AI-powered detection to protect you from malicious emails
          </p>
          <p className="text-sm text-gray-500">
            Paste email content or upload files • Instant analysis • Secure & private
          </p>
        </div>

        {/* Input Area with Drag & Drop */}
        <div className="animate-slide-in-up">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`glass-effect-dark rounded-2xl p-8 border-2 transition-all duration-300 ${
              dragActive
                ? "border-neon-green bg-neon-green/10"
                : "border-neon-green/50 hover:border-neon-green/80"
            }`}
          >
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder={placeholderText}
              className="w-full h-64 bg-transparent text-white placeholder-gray-500 resize-none outline-none font-mono text-sm"
            />

            {/* Drag & Drop Area */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-neon-green/50 rounded-lg hover:bg-neon-green/10 cursor-pointer smooth-transition group"
              >
                <Upload size={20} className="text-neon-green group-hover:text-neon-cyan" />
                <span className="text-gray-400 group-hover:text-white smooth-transition">
                  Click to upload or drag & drop
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.eml"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <button
                onClick={handleScan}
                disabled={!emailContent.trim() || isLoading}
                className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 ${
                  emailContent.trim() && !isLoading
                    ? "bg-gradient-to-r from-neon-green to-neon-cyan text-black hover-glow-green hover:shadow-lg hover:shadow-neon-green/50"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Scan Now
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Your data is never stored. Instant analysis, guaranteed privacy.
            </p>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-gray-300">Lightning Fast</p>
            <p className="text-xs text-gray-500">Results in seconds</p>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-sm text-gray-300">100% Secure</p>
            <p className="text-xs text-gray-500">End-to-end encrypted</p>
          </div>
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <p className="text-sm text-gray-300">AI-Powered</p>
            <p className="text-xs text-gray-500">Advanced detection</p>
          </div>
        </div>
      </div>
    </section>
  );
}
