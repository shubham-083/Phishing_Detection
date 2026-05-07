import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate form submission
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-neon-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-effect-dark rounded-2xl p-8 md:p-12 border border-neon-green/30 animate-slide-in-up">
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                <CheckCircle size={48} className="text-neon-green" />
              </div>
              <h3 className="text-2xl font-bold text-neon-green mb-2">
                Thank You!
              </h3>
              <p className="text-gray-400 mb-6">
                We've received your message and will get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-neon-green hover:text-neon-cyan smooth-transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green smooth-transition ${
                    errors.name ? "border-neon-red" : "border-neon-green/30"
                  }`}
                />
                {errors.name && (
                  <p className="text-neon-red text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green smooth-transition ${
                    errors.email ? "border-neon-red" : "border-neon-green/30"
                  }`}
                />
                {errors.email && (
                  <p className="text-neon-red text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-green smooth-transition resize-none ${
                    errors.message ? "border-neon-red" : "border-neon-green/30"
                  }`}
                />
                {errors.message && (
                  <p className="text-neon-red text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover-glow-green smooth-transition"
              >
                <Send size={20} />
                Send Message
              </button>

              <p className="text-center text-xs text-gray-500">
                We'll respond to you within 24 hours
              </p>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="glass-effect rounded-xl p-6 text-center border border-neon-green/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-2xl mb-2">📧</p>
            <p className="font-semibold text-white mb-1">Email</p>
            <a
              href="mailto:support@phishguard.com"
              className="text-neon-green hover:text-neon-cyan smooth-transition text-sm"
            >
              support@phishguard.com
            </a>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center border border-neon-green/30 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-2xl mb-2">💬</p>
            <p className="font-semibold text-white mb-1">Chat Support</p>
            <p className="text-gray-400 text-sm">Available 24/7</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center border border-neon-green/30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-2xl mb-2">🌐</p>
            <p className="font-semibold text-white mb-1">Follow Us</p>
            <div className="flex justify-center gap-3">
              <a href="#" className="text-neon-green hover:text-neon-cyan">
                Twitter
              </a>
              <a href="#" className="text-neon-green hover:text-neon-cyan">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
