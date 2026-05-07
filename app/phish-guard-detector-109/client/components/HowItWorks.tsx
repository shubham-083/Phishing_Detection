import { Copy, Cpu, CheckCircle, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Copy size={32} />,
      title: "Paste Your Email",
      description:
        "Copy and paste the email content or upload an .eml/.txt file to our secure scanner.",
    },
    {
      number: "02",
      icon: <Cpu size={32} />,
      title: "AI Analysis",
      description:
        "Our advanced ML models analyze headers, links, content, and sender information in real-time.",
    },
    {
      number: "03",
      icon: <CheckCircle size={32} />,
      title: "Get Results",
      description:
        "Receive instant results with detailed risk scores and actionable recommendations.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Simple, fast, and intuitive phishing detection in 3 easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-neon-green/20 via-neon-cyan/20 to-neon-green/20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="glass-effect-dark rounded-2xl p-8 border border-neon-green/30 h-full relative">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-gradient-to-r from-neon-green to-neon-cyan flex items-center justify-center">
                    <span className="text-black font-bold text-lg">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-neon-green/10 mb-6 mt-6">
                    <div className="text-neon-green">{step.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-6 top-1/3 text-neon-cyan">
                      <ArrowRight size={32} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-20 glass-effect-dark rounded-2xl p-12 border border-neon-green/30">
          <h3 className="text-2xl font-bold text-white mb-8 text-center font-poppins">
            Powered by Advanced Technology
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl mb-2">🔐</p>
              <p className="font-semibold text-neon-green mb-1">ML Detection</p>
              <p className="text-sm text-gray-400">
                Deep learning models trained on millions of emails
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">📊</p>
              <p className="font-semibold text-neon-cyan mb-1">Pattern Analysis</p>
              <p className="text-sm text-gray-400">
                Advanced pattern recognition for phishing tactics
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">🔗</p>
              <p className="font-semibold text-neon-green mb-1">Link Validation</p>
              <p className="text-sm text-gray-400">
                Real-time checking against threat databases
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">✓</p>
              <p className="font-semibold text-neon-cyan mb-1">Authentication</p>
              <p className="text-sm text-gray-400">
                SPF, DKIM, and DMARC verification
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6">Ready to protect your inbox?</p>
          <button
            onClick={() => {
              const heroSection = document.getElementById("hero");
              heroSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-gradient-to-r from-neon-green to-neon-cyan text-black rounded-lg font-semibold hover-glow-green smooth-transition text-lg"
          >
            Scan Your First Email
          </button>
        </div>
      </div>
    </section>
  );
}
