import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  ShieldCheck,
  Smartphone,
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Lock,
  Volume2,
  HeartHandshake,
  PhoneCall,
} from "lucide-react";

interface OtpVerificationProps {
  currentLanguage: SupportedLanguage;
  mobileNumber: string;
  emailAddress: string;
  userRole: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  currentLanguage,
  mobileNumber,
  emailAddress,
  userRole,
  onVerificationSuccess,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const isSenior = userRole === "senior";

  // Generated simulated OTPs for Prototype Mode
  const [demoMobileOtp, setDemoMobileOtp] = useState("739241");
  const [demoEmailOtp, setDemoEmailOtp] = useState("582104");

  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [isProductionMode, setIsProductionMode] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(30);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Voice Readout for Elderly Citizens
  const speakCodeAloud = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const digits = demoMobileOtp.split("").join(" ");
      const utterance = new SpeechSynthesisUtterance(
        `Namaste. Your free login verification code is: ${digits}. Repeating: ${digits}.`
      );
      utterance.rate = 0.85; // slow for seniors
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleResend = () => {
    const newMobile = Math.floor(100000 + Math.random() * 900000).toString();
    const newEmail = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoMobileOtp(newMobile);
    setDemoEmailOtp(newEmail);
    setResendCountdown(30);
    setErrorMsg("");

    if (isSenior) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const digits = newMobile.split("").join(" ");
        const utterance = new SpeechSynthesisUtterance(
          `New code sent: ${digits}`
        );
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleAutoFillBoth = () => {
    setMobileOtp(demoMobileOtp);
    if (!isSenior) {
      setEmailOtp(demoEmailOtp);
    }
    setErrorMsg("");
  };

  const handleVerify = () => {
    setErrorMsg("");

    let mValid = false;
    let eValid = false;

    // Senior citizen exemption: Only Mobile OTP is needed
    if (isSenior) {
      if (mobileOtp.trim() === demoMobileOtp || (isProductionMode && mobileOtp.length === 6)) {
        mValid = true;
        setMobileVerified(true);
        setEmailVerified(true);
        setTimeout(() => {
          onVerificationSuccess();
        }, 400);
        return;
      } else {
        setErrorMsg("Mobile verification code is incorrect. Tap the green 1-Touch Auto-Enter button.");
        return;
      }
    }

    // Standard Citizen Verification
    if (mobileOtp.trim() === demoMobileOtp || (isProductionMode && mobileOtp.length === 6)) {
      mValid = true;
      setMobileVerified(true);
    }

    if (emailOtp.trim() === demoEmailOtp || (isProductionMode && emailOtp.length === 6)) {
      eValid = true;
      setEmailVerified(true);
    }

    if (mValid && eValid) {
      setTimeout(() => {
        onVerificationSuccess();
      }, 500);
    } else {
      if (!mValid && !eValid) {
        setErrorMsg("Both Mobile OTP and Email OTP are invalid. Please check the 6-digit codes.");
      } else if (!mValid) {
        setErrorMsg("Mobile OTP is incorrect. Please verify the code sent to your phone.");
      } else {
        setErrorMsg("Email OTP is incorrect. Please verify the code sent to your official inbox.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div
        className={`w-full max-w-xl bg-white rounded-3xl border shadow-xl p-6 sm:p-10 relative overflow-hidden ${
          isSenior ? "border-2 border-amber-400" : "border-slate-200"
        }`}
      >
        {/* Top Header */}
        <div className="text-center mb-8">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4 ring-1 ${
              isSenior
                ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white ring-amber-300"
                : "bg-gradient-to-br from-[#0B3B60] to-[#041d31] text-amber-400 ring-amber-400/40"
            }`}
          >
            {isSenior ? (
              <HeartHandshake className="w-9 h-9 text-amber-100" />
            ) : (
              <ShieldCheck className="w-9 h-9" />
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span
              className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${
                isSenior
                  ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {isSenior ? "100% Free Senior Access (Aged 60+)" : "Government Security Verification"}
            </span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isSenior ? "Senior Citizen Free Verification" : t.otpVerificationTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            {isSenior
              ? "Free SMS verification code sent to your phone. No email or complex password required."
              : t.otpVerificationSubtitle}
          </p>
        </div>

        {/* SENIOR CITIZEN VOICE & 1-TOUCH BANNER */}
        {isSenior && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Free Voice Readout for Elders
              </span>
              <button
                type="button"
                onClick={speakCodeAloud}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? "Speaking Code..." : "🔊 Read Code Aloud"}</span>
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-bold block">Your Free SMS Code:</span>
                <span className="font-mono text-2xl font-black text-amber-900 tracking-widest">
                  {demoMobileOtp}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOtp(demoMobileOtp);
                  setErrorMsg("");
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Auto-Enter Code</span>
              </button>
            </div>
          </div>
        )}

        {/* Prototype vs Production Toggle Notice (For non-seniors or developers) */}
        {!isSenior && (
          <div className="mb-6 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium text-slate-700">
                {isProductionMode
                  ? "Production Mode (Live Gateway Simulation)"
                  : "Prototype Mode (Instant Passcode Preview)"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsProductionMode(!isProductionMode)}
                className="font-semibold text-[#0B3B60] hover:underline"
              >
                Switch to {isProductionMode ? "Prototype" : "Production"}
              </button>
              {!isProductionMode && (
                <button
                  type="button"
                  onClick={handleAutoFillBoth}
                  className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200"
                >
                  1-Click Fill
                </button>
              )}
            </div>
          </div>
        )}

        {!isSenior && !isProductionMode && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs flex flex-col gap-1.5">
            <div className="font-bold flex items-center gap-1.5 text-blue-900">
              <Lock className="w-3.5 h-3.5" />
              Simulated Government OTP Gateway:
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-white p-2 rounded border border-blue-200">
                <span className="text-slate-500 block">Mobile OTP:</span>
                <span className="font-mono font-bold text-sm text-blue-800 tracking-widest">
                  {demoMobileOtp}
                </span>
              </div>
              <div className="bg-white p-2 rounded border border-blue-200">
                <span className="text-slate-500 block">Email OTP:</span>
                <span className="font-mono font-bold text-sm text-blue-800 tracking-widest">
                  {demoEmailOtp}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-6">
          {/* Mobile OTP */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                className={`font-semibold flex items-center gap-2 ${
                  isSenior ? "text-base text-slate-900 font-black" : "text-sm text-slate-800"
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#0B3B60]" />
                {isSenior ? "Enter 6-Digit Mobile Code:" : t.enterMobileOtp}
              </label>
              <span className="text-xs text-slate-500 font-mono">
                Sent to: {mobileNumber || "+91 98412 87654"}
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="6-Digit SMS Code"
                className={`w-full px-4 text-center tracking-[0.4em] font-mono rounded-2xl border-2 focus:outline-none transition-all font-black ${
                  isSenior
                    ? "py-4 text-2xl border-amber-400 bg-amber-50/40 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                    : "py-3 text-xl border-slate-300 bg-slate-50 focus:ring-2 focus:ring-[#0B3B60]"
                }`}
              />
              {mobileVerified && (
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600" />
              )}
            </div>
          </div>

          {/* Email OTP - Only shown for non-senior roles */}
          {!isSenior ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0B3B60]" />
                  {t.enterEmailOtp}
                </label>
                <span className="text-xs text-slate-500 font-mono">
                  Sent to: {emailAddress || "citizen@digitalindia.gov.in"}
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Email OTP"
                  className="w-full px-4 py-3 text-center tracking-[0.4em] font-mono text-xl rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B3B60] focus:border-transparent bg-slate-50 font-bold"
                />
                {emailVerified && (
                  <CheckCircle2 className="absolute right-3.5 top-3.5 w-5 h-5 text-emerald-600" />
                )}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Senior Citizen Exemption Applied:</strong> Email OTP is waived for senior
                citizens. Access is validated directly via Aadhaar/Mobile SMS with zero fees.
              </span>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="mt-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-bold">{errorMsg}</span>
          </div>
        )}

        {/* Resend and Countdown */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-600">
          <span>Didn't receive code?</span>
          <button
            type="button"
            disabled={resendCountdown > 0}
            onClick={handleResend}
            className={`font-semibold flex items-center gap-1 ${
              resendCountdown > 0
                ? "text-slate-400 cursor-not-allowed"
                : "text-[#0B3B60] hover:underline font-bold"
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend Free SMS Code"}
          </button>
        </div>

        {/* Verification Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleVerify}
          className={`mt-8 w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
            isSenior
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 border-2 border-emerald-300"
              : "bg-gradient-to-r from-[#0B3B60] to-[#082842] text-white hover:from-[#09406b] hover:to-[#061e33] border border-amber-400/40"
          }`}
        >
          {isSenior ? (
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          )}
          <span>{isSenior ? "Verify & Enter Senior Citizen Portal" : t.verifyAndContinue}</span>
        </motion.button>

        {isSenior && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              Need Help? Call Elderline: <strong>14567</strong>
            </span>
            <button
              type="button"
              onClick={onBack}
              className="text-slate-600 font-bold hover:underline"
            >
              Go Back
            </button>
          </div>
        )}

        {!isSenior && (
          <button
            type="button"
            onClick={onBack}
            className="mt-4 w-full text-center text-xs text-slate-500 hover:text-slate-800"
          >
            Change Role or Details
          </button>
        )}
      </div>
    </div>
  );
};
