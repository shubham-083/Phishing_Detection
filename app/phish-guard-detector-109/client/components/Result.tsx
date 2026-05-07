import { AlertTriangle, CheckCircle } from "lucide-react";

interface ResultProps {
  isPhishing: boolean;
  riskScore: number;
  showResult: boolean;
}

export default function Result({ isPhishing, riskScore, showResult }: ResultProps) {
  if (!showResult) return null;

  const riskLevel = riskScore > 70 ? "Critical" : riskScore > 40 ? "High" : "Low";
  const riskColor = riskScore > 70 ? "text-neon-red" : riskScore > 40 ? "text-yellow-400" : "text-neon-green";
  const riskBg = riskScore > 70 ? "bg-red-500/20" : riskScore > 40 ? "bg-yellow-500/20" : "bg-green-500/20";

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 animated-gradient-bg">
      <div className="max-w-3xl w-full">
        <div className={`glass-effect-dark rounded-3xl p-12 border-2 border-neon-green/50 animate-slide-in-up ${riskBg}`}>
          {/* Header */}
          <div className="text-center mb-8">
            {isPhishing ? (
              <>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/20 mb-6">
                  <AlertTriangle size={48} className="text-neon-red animate-pulse-glow" />
                </div>
                <h2 className="text-4xl font-bold text-neon-red mb-2 font-poppins">
                  ⚠️ PHISHING DETECTED
                </h2>
                <p className="text-gray-400">
                  This email shows strong indicators of a phishing attempt. Do not click any links or provide personal information.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6">
                  <CheckCircle size={48} className="text-neon-green animate-pulse-glow" />
                </div>
                <h2 className="text-4xl font-bold text-neon-green mb-2 font-poppins">
                  ✓ LEGITIMATE EMAIL
                </h2>
                <p className="text-gray-400">
                  This email appears to be from a trusted source. You can safely interact with it.
                </p>
              </>
            )}
          </div>

          {/* Risk Score */}
          <div className="bg-white/5 rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Risk Score</h3>
              <span className={`text-3xl font-bold ${riskColor}`}>{riskScore}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  riskScore > 70
                    ? "bg-gradient-to-r from-neon-red to-red-600"
                    : riskScore > 40
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                    : "bg-gradient-to-r from-neon-green to-green-500"
                }`}
                style={{ width: `${riskScore}%` }}
              ></div>
            </div>

            {/* Risk Level */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                <p className={`text-lg font-bold ${riskColor}`}>{riskLevel}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Confidence</p>
                <p className="text-lg font-bold text-neon-cyan">{Math.round(100 - riskScore / 2)}%</p>
              </div>
            </div>
          </div>

          {/* Detection Details */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Detection Analysis</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <span className="text-neon-green text-2xl leading-none">✓</span>
                <div>
                  <p className="text-white font-semibold">Sender Verification</p>
                  <p className="text-gray-400 text-sm">
                    {isPhishing ? "Suspicious sender address detected" : "Verified legitimate sender"}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-4 rounded-lg ${isPhishing ? "bg-red-500/10" : "bg-green-500/10"}`}>
                <span className={isPhishing ? "text-neon-red" : "text-neon-green"}>
                  {isPhishing ? "✗" : "✓"}
                </span>
                <div>
                  <p className="text-white font-semibold">Links Analysis</p>
                  <p className="text-gray-400 text-sm">
                    {isPhishing
                      ? "Suspicious links pointing to malicious domains"
                      : "All links point to legitimate domains"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <span className="text-neon-green text-2xl leading-none">✓</span>
                <div>
                  <p className="text-white font-semibold">Content Analysis</p>
                  <p className="text-gray-400 text-sm">
                    {isPhishing
                      ? "Urgency tactics and suspicious requests detected"
                      : "Content appears genuine and professional"}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-4 rounded-lg ${isPhishing ? "bg-red-500/10" : "bg-green-500/10"}`}>
                <span className={isPhishing ? "text-neon-red" : "text-neon-green"}>
                  {isPhishing ? "✗" : "✓"}
                </span>
                <div>
                  <p className="text-white font-semibold">Authentication Headers</p>
                  <p className="text-gray-400 text-sm">
                    {isPhishing
                      ? "Failed authentication checks (SPF/DKIM/DMARC)"
                      : "All authentication checks passed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {isPhishing ? (
                <>
                  <li>🚫 Do not click any links in this email</li>
                  <li>🚫 Do not download any attachments</li>
                  <li>🚫 Do not reply with personal information</li>
                  <li>📧 Report this email as phishing to your mail provider</li>
                  <li>✓ Delete the email from your inbox</li>
                </>
              ) : (
                <>
                  <li>✓ Safe to interact with this email</li>
                  <li>✓ You can click links and download attachments</li>
                  <li>✓ Sender appears to be legitimate</li>
                  <li>ℹ️ Always verify unexpected requests for sensitive data</li>
                  <li>ℹ️ Report any suspicious activity to your security team</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
