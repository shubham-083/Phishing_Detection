import { Shield, Zap, Lock, Brain, Eye, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Real-Time Scanning",
      description: "Instant analysis of email content without delays. Get results within milliseconds.",
    },
    {
      icon: <Brain size={32} />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect sophisticated phishing attempts.",
    },
    {
      icon: <Lock size={32} />,
      title: "Secure & Private",
      description: "Your data is never stored on our servers. Complete end-to-end encryption.",
    },
    {
      icon: <Shield size={32} />,
      title: "Advanced Protection",
      description: "Multi-layer detection using link analysis, sender verification, and content scanning.",
    },
    {
      icon: <Eye size={32} />,
      title: "Detailed Analysis",
      description: "Comprehensive reports showing exactly what makes an email suspicious or legitimate.",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Risk Scoring",
      description: "Proprietary risk scoring system provides clear, actionable insights.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-neon-green/5 to-transparent relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to protect yourself from phishing attacks
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect-dark rounded-2xl p-8 border border-neon-green/30 hover:border-neon-green/60 smooth-transition hover:shadow-lg hover:shadow-neon-green/20 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 group-hover:from-neon-green/40 group-hover:to-neon-cyan/40 smooth-transition mb-6">
                <div className="text-neon-green group-hover:text-neon-cyan smooth-transition">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neon-green smooth-transition">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className="h-1 w-0 bg-gradient-to-r from-neon-green to-neon-cyan mt-6 group-hover:w-12 smooth-transition"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          <div className="glass-effect rounded-2xl p-8 text-center border border-neon-green/30 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-3xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent mb-2">
              99.8%
            </p>
            <p className="text-gray-400 text-sm">Detection Accuracy</p>
          </div>
          <div className="glass-effect rounded-2xl p-8 text-center border border-neon-green/30 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <p className="text-3xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent mb-2">
              50M+
            </p>
            <p className="text-gray-400 text-sm">Emails Scanned</p>
          </div>
          <div className="glass-effect rounded-2xl p-8 text-center border border-neon-green/30 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <p className="text-3xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent mb-2">
              &lt;100ms
            </p>
            <p className="text-gray-400 text-sm">Average Scan Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
