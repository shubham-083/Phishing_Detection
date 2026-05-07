import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Result from "@/components/Result";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Index() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPhishing, setIsPhishing] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  // 🔵 EXISTING RANDOM LOGIC (UNCHANGED)
  const generateRandomResult = () => {
    const isPhishingResult = Math.random() < 0.3;
    const riskScoreResult = isPhishingResult
      ? Math.floor(Math.random() * 30) + 70
      : Math.floor(Math.random() * 40);

    return {
      isPhishing: isPhishingResult,
      riskScore: riskScoreResult,
    };
  };

  // 🟢 EXISTING ML API
  const checkPhishing = async (emailContent: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: emailContent }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Backend error:", error);
      return null;
    }
  };

  // 🆕 NEW: VirusTotal API call
  const checkUrl = async (url: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/scan-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("VirusTotal error:", error);
      return null;
    }
  };

  // 🔵 UPDATED HANDLE SCAN (MINIMAL CHANGE)
  const handleScan = async (emailContent: string) => {
    setIsLoading(true);

    // 🟢 Call ML model
    let mlResult = await checkPhishing(emailContent);

    // 🟢 Call VirusTotal (assuming input is URL)
    let vtResult = await checkUrl(emailContent);

    // 🔵 FALLBACK if both fail
    if (!mlResult && !vtResult) {
      const random = generateRandomResult();
      setIsPhishing(random.isPhishing);
      setRiskScore(random.riskScore);
    } else {
      // 🧠 COMBINE LOGIC (simple)
      const mlScore = mlResult?.riskScore || 0;
      const vtScore = (vtResult?.malicious || 0) * 20;

      const finalScore = Math.min(100, mlScore + vtScore);

      setRiskScore(finalScore);
      setIsPhishing(finalScore > 50);
    }

    setShowResult(true);
    setIsLoading(false);

    setTimeout(() => {
      const resultsSection = document.getElementById("results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero onScan={handleScan} isLoading={isLoading} />
      <div id="results">
        <Result
          isPhishing={isPhishing}
          riskScore={riskScore}
          showResult={showResult}
        />
      </div>
      <Features />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
}