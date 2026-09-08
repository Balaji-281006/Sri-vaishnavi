import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GovernmentService,
  GovernmentScheme,
  SupportedLanguage,
  UserProfile,
} from "../types";
import { GOVERNMENT_SERVICES, GOVERNMENT_SCHEMES } from "../data/governmentData";
import { TRANSLATIONS } from "../data/translations";
import {
  HeartHandshake,
  Shield,
  Activity,
  Award,
  IndianRupee,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Mic,
  Volume2,
  UserCheck,
  Smartphone,
  Calendar,
  Lock,
  Unlock,
  AlertCircle,
  Home,
  User,
  ArrowRight,
  HelpCircle,
  X,
} from "lucide-react";

interface SeniorPortalProps {
  currentLanguage: SupportedLanguage;
  userProfile?: UserProfile | null;
  onQuickSeniorLogin?: (profile: UserProfile) => void;
  onOpenSeniorAuth?: () => void;
  onSelectService: (service: GovernmentService) => void;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onNavigateToTracking: () => void;
}

export const SeniorPortal: React.FC<SeniorPortalProps> = ({
  currentLanguage,
  userProfile,
  onQuickSeniorLogin,
  onOpenSeniorAuth,
  onSelectService,
  onSelectScheme,
  onNavigateToTracking,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Specific filtered schemes & services for Senior Citizens
  const healthcareScheme = GOVERNMENT_SCHEMES.find(
    (s) => s.id === "sch-ayushman-bharat"
  );
  const apyScheme = GOVERNMENT_SCHEMES.find((s) => s.id === "sch-atal-pension");
  const vayoshriScheme = GOVERNMENT_SCHEMES.find(
    (s) => s.id === "sch-pm-vaya-vandana"
  );

  const identityServices = GOVERNMENT_SERVICES.filter(
    (s) =>
      s.id === "srv-aadhaar" ||
      s.id === "srv-income-cert" ||
      s.id === "srv-nativity-cert"
  );

  const isAlreadySenior = userProfile?.role === "senior";

  // State for Easy Free Senior Registration / Login Assistant
  const [showFreeRegModal, setShowFreeRegModal] = useState(false);
  const [elderName, setElderName] = useState("");
  const [elderMobile, setElderMobile] = useState("");
  const [elderAge, setElderAge] = useState(68);
  const [elderState, setElderState] = useState("Tamil Nadu");
  const [elderDistrict, setElderDistrict] = useState("Madurai");

  // Step in Free Registration: 'form' | 'otp' | 'success'
  const [regStep, setRegStep] = useState<"form" | "otp" | "success">("form");
  const [simulatedOtp, setSimulatedOtp] = useState("739241");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListeningName, setIsListeningName] = useState(false);
  const [isListeningMobile, setIsListeningMobile] = useState(false);
  const [doorstepRequested, setDoorstepRequested] = useState(false);

  // Browser Speech Synthesis (Reads loud and clear for elderly persons)
  const speakVoiceGuide = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // Slower cadence for seniors
      utterance.pitch = 1.0;
      if (currentLanguage === "hi") {
        utterance.lang = "hi-IN";
      } else if (currentLanguage === "ta") {
        utterance.lang = "ta-IN";
      } else {
        utterance.lang = "en-IN";
      }
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Browser Voice Input (Speech Recognition) for Elders
  const startSpeechInput = (field: "name" | "mobile") => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type or click the 1-Touch Login button.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang =
        currentLanguage === "hi"
          ? "hi-IN"
          : currentLanguage === "ta"
          ? "ta-IN"
          : "en-IN";

      if (field === "name") setIsListeningName(true);
      if (field === "mobile") setIsListeningMobile(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (field === "name") {
          setElderName(transcript);
          setIsListeningName(false);
          speakVoiceGuide(`Name recorded as ${transcript}`);
        } else {
          const numbersOnly = transcript.replace(/\D/g, "");
          setElderMobile(numbersOnly || transcript);
          setIsListeningMobile(false);
          speakVoiceGuide(`Phone number recorded`);
        }
      };

      recognition.onerror = () => {
        setIsListeningName(false);
        setIsListeningMobile(false);
      };

      recognition.onend = () => {
        setIsListeningName(false);
        setIsListeningMobile(false);
      };

      recognition.start();
    } catch {
      setIsListeningName(false);
      setIsListeningMobile(false);
    }
  };

  // 1-Touch Instant Free Login (Zero Typing Required)
  const handleInstantFreeSeniorLogin = () => {
    const seniorProfile: UserProfile = {
      id: "usr-senior-demo",
      fullName: "K. Ramaswamy",
      mobile: "+91 98412 87654",
      email: "ramaswamy.k1958@pension.gov.in",
      dob: "1958-08-15",
      age: 68,
      gender: "Male",
      state: "Tamil Nadu",
      district: "Madurai",
      fullAddress: "14/B, West Masi Street, Madurai - 625001",
      qualification: "Graduate (B.Sc)",
      occupation: "Retired State Officer & Senior Pensioner",
      username: "ramaswamy_senior",
      role: "senior",
      isVerified: true,
      mobileVerified: true,
      emailVerified: true,
      registeredAt: new Date().toISOString(),
      resumeUploaded: false,
    };

    if (onQuickSeniorLogin) {
      onQuickSeniorLogin(seniorProfile);
    }

    speakVoiceGuide(
      "Namaste Ramaswamy ji! Welcome to your Senior Citizen Portal. Your 100% free senior welfare access and Ayushman 70 Plus coverage are active."
    );
  };

  // Submit Free Registration
  const handleSendFreeOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elderName.trim() || !elderMobile.trim()) {
      alert("Please enter your name and phone number or click 1-Touch Login.");
      return;
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(newOtp);
    setRegStep("otp");
    setOtpError("");
    speakVoiceGuide(
      `Your free verification code is: ${newOtp.split("").join(" ")}. You can click the green Auto-Enter button.`
    );
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === simulatedOtp || enteredOtp.length === 6) {
      const newSeniorProfile: UserProfile = {
        id: "usr-senior-" + Date.now(),
        fullName: elderName || "Senior Citizen",
        mobile: elderMobile.startsWith("+91") ? elderMobile : `+91 ${elderMobile}`,
        email: `senior.${elderMobile.replace(/\D/g, "")}@pension.gov.in`,
        dob: `${new Date().getFullYear() - elderAge}-01-01`,
        age: elderAge,
        gender: "Male",
        state: elderState,
        district: elderDistrict,
        fullAddress: `${elderDistrict}, ${elderState}`,
        qualification: "Senior Citizen",
        occupation: "Senior Citizen / Pensioner",
        username: `senior_${Date.now().toString().slice(-4)}`,
        role: "senior",
        isVerified: true,
        mobileVerified: true,
        emailVerified: true,
        registeredAt: new Date().toISOString(),
      };

      if (onQuickSeniorLogin) {
        onQuickSeniorLogin(newSeniorProfile);
      }

      setRegStep("success");
      speakVoiceGuide(
        `Congratulations ${elderName}! Your free senior citizen registration is completed successfully.`
      );

      setTimeout(() => {
        setShowFreeRegModal(false);
        setRegStep("form");
      }, 1800);
    } else {
      setOtpError("Incorrect verification code. Please check or click Auto-Enter.");
      speakVoiceGuide("Code incorrect. Please try again or click the green button.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Senior Portal Banner */}
      <div className="bg-gradient-to-r from-[#8B4513] via-[#a35720] to-[#5a2c0c] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border-b border-amber-300/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300/20 border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
            Senior Citizen Dedicated Gateway (Aged 60+)
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.seniorPortal}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-amber-100 leading-relaxed">
            Simplified access designed with extra-large text, high-contrast colors, voice guidance,
            and 100% free government access. Manage your pension status, ₹5 Lakh Ayushman Bharat 70+
            healthcare cards, and digital life certificates from home without standing in lines.
          </p>

          {/* Senior Helpline Callout & Voice Prompt */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-white">
            <a
              href="tel:14567"
              className="px-3.5 py-2 rounded-xl bg-black/30 border border-white/20 flex items-center gap-2 hover:bg-black/40 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Elderline Toll-Free: <strong>14567</strong></span>
            </a>
            <button
              type="button"
              onClick={() =>
                speakVoiceGuide(
                  "Namaste! Welcome to the Senior Citizen Portal. You can access free healthcare, pension status, and life certificate services. If you need any assistance, call 14567."
                )
              }
              className="px-3.5 py-2 rounded-xl bg-amber-400 text-amber-950 font-bold flex items-center gap-2 shadow hover:bg-amber-300 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? "Speaking Instructions..." : "🔊 Listen to Voice Guide"}</span>
            </button>
            <span className="flex items-center gap-1.5 text-amber-200 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Doorstep Biometric Verification Available Free
            </span>
          </div>
        </div>
      </div>

      {/* DEDICATED SENIOR EASY ACCESS & FREE REGISTRATION / LOGIN STATION */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/60 to-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs tracking-wide uppercase shadow-sm">
                100% FREE GOVERNMENT SERVICE
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs">
                Zero Fees • No Credit Card Required
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs">
                Aged 60+ Easy Access
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {isAlreadySenior
                ? `Welcome, ${userProfile?.fullName || "Elder Citizen"}!`
                : "Easy Senior Citizen Login & Free Registration"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {isAlreadySenior
                ? `You are logged in with verified Senior Citizen access (Age: ${userProfile?.age || 68} Years). All pension services, doorstep life certificates, and ₹5 Lakh Ayushman 70+ healthcare are unlocked.`
                : "Designed specially for elders: No passwords to remember, no complicated forms, and zero charges. Sign in with 1 touch or register using just your name and mobile number."}
            </p>
          </div>

          {/* Action Buttons for Elders */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {isAlreadySenior ? (
              <div className="flex flex-col gap-2">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-950 flex items-center gap-2 text-xs font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Senior Pensioner Status: ACTIVE & VERIFIED</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDoorstepRequested(true);
                      speakVoiceGuide(
                        "Doorstep visit request registered. India Post Dak Sevak will visit your residence for free biometric verification."
                      );
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#082a47] flex items-center justify-center gap-1.5 shadow"
                  >
                    <Home className="w-4 h-4 text-amber-300" />
                    <span>Book Doorstep Visit (Free)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenSeniorAuth) onOpenSeniorAuth();
                    }}
                    className="px-3 py-2.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300"
                    title="Switch or Edit Profile"
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {/* Method 1: 1-Touch Instant Login */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleInstantFreeSeniorLogin}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-sm shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all flex items-center justify-center gap-2.5 border border-emerald-300"
                >
                  <UserCheck className="w-5 h-5 text-amber-300" />
                  <span>1-Touch Instant Free Senior Login</span>
                </motion.button>
                <div className="text-[11px] text-center text-slate-500 font-medium">
                  Zero Typing • Auto-loads K. Ramaswamy (Age 68)
                </div>

                {/* Method 2: 2-Step Free Mobile Registration */}
                <button
                  type="button"
                  onClick={() => {
                    setShowFreeRegModal(true);
                    setRegStep("form");
                    speakVoiceGuide(
                      "Please speak or enter your name and phone number. This service is completely free."
                    );
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white border-2 border-amber-400 text-amber-950 font-bold text-xs hover:bg-amber-100 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>Register with My Mobile Number (Free)</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Doorstep confirmation notice if triggered */}
        {doorstepRequested && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3.5 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-950 text-xs flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Doorstep Visit Scheduled:</strong> India Post Gramin Dak Sevak has been notified.
                They will visit your registered residence within 48 hours for free Aadhaar Face/Fingerprint verification.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDoorstepRequested(false)}
              className="text-emerald-900 font-bold text-xs hover:underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </div>

      {/* Primary Senior Citizen Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Ayushman Bharat 70+ Universal Healthcare */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-600" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              Healthcare 70+
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1">
              Ayushman Bharat PM-JAY
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Universal ₹5,00,000 free hospitalization coverage for ALL senior citizens aged 70 and above, regardless of family income.
            </p>

            <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs text-rose-950 mb-4">
              <strong>Key Benefit:</strong> Cashless treatment at 29,000+ empanelled hospitals across India.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-emerald-700 font-bold">100% Free</span>
            <button
              type="button"
              onClick={() => healthcareScheme && onSelectScheme(healthcareScheme)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <span>Apply Golden Card</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pillar 2: Jeevan Pramaan - Digital Life Certificate */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-600" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Pension Services
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1">
              Jeevan Pramaan Life Certificate
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Submit mandatory annual life certificate using Aadhaar Face Authentication or Fingerprint without visiting the bank or treasury office.
            </p>

            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-xs text-amber-950 mb-4">
              <strong>Instant Issuance:</strong> Digital Pramaan ID generated immediately and sent to pension disbursing bank.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-emerald-700 font-bold">Fee: ₹0</span>
            <a
              href="https://jeevanpramaan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <span>Open Jeevan Pramaan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Pillar 3: SCSS & Rashtriya Vayoshri */}
        <div className="bg-white rounded-3xl border border-amber-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Savings & Assisted Devices
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2 mb-1">
              SCSS & Rashtriya Vayoshri
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              8.2% guaranteed quarterly interest on savings up to ₹30 Lakh, plus free assisted physical devices (wheelchairs, hearing aids).
            </p>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-950 mb-4">
              <strong>Govt Guarantee:</strong> Backed by Ministry of Finance and Ministry of Social Justice.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">All Authorized Banks</span>
            <button
              type="button"
              onClick={() => vayoshriScheme && onSelectScheme(vayoshriScheme)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <span>View Scheme Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Senior Citizen Certificates & Identity Services */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Senior Citizen Certificates & Identity Services
            </h3>
            <p className="text-xs text-slate-500">
              Fast-track priority queue for citizens aged 60 and above.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToTracking}
            className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1"
          >
            <span>Track My Applications</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {identityServices.map((srv) => (
            <div
              key={srv.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  {srv.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{srv.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">{srv.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{srv.officialFees}</span>
                <button
                  type="button"
                  onClick={() => onSelectService(srv)}
                  className="px-3 py-1.5 rounded-lg bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#082a47]"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: FREE & EASY SENIOR REGISTRATION / LOGIN MODAL */}
      <AnimatePresence>
        {showFreeRegModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border-2 border-amber-400 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowFreeRegModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-3 border border-amber-300 shadow">
                  <HeartHandshake className="w-8 h-8 text-amber-700" />
                </div>
                <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
                  100% Free Public Service
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Senior Citizen Easy Registration
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Only 2 simple fields. You can also tap the microphone to speak!
                </p>
              </div>

              {/* STEP 1: SIMPLE FORM */}
              {regStep === "form" && (
                <form onSubmit={handleSendFreeOtp} className="space-y-4">
                  {/* Name Input with Speech Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                      <span>1. Your Full Name (Aadhaar / Pension Card) *</span>
                      <button
                        type="button"
                        onClick={() => startSpeechInput("name")}
                        className={`text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-bold ${
                          isListeningName
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isListeningName ? "Listening..." : "Speak Name"}</span>
                      </button>
                    </label>
                    <input
                      type="text"
                      required
                      value={elderName}
                      onChange={(e) => setElderName(e.target.value)}
                      placeholder="e.g. K. Ramaswamy"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-semibold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  {/* Mobile Input with Speech Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center justify-between">
                      <span>2. Mobile Phone Number (For Free SMS) *</span>
                      <button
                        type="button"
                        onClick={() => startSpeechInput("mobile")}
                        className={`text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-bold ${
                          isListeningMobile
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isListeningMobile ? "Listening..." : "Speak Number"}</span>
                      </button>
                    </label>
                    <input
                      type="tel"
                      required
                      value={elderMobile}
                      onChange={(e) => setElderMobile(e.target.value)}
                      placeholder="e.g. 98412 87654"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 text-sm font-semibold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  {/* Quick Age Pill Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      3. Select Approximate Age:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[62, 68, 72, 80].map((ageVal) => (
                        <button
                          key={ageVal}
                          type="button"
                          onClick={() => setElderAge(ageVal)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                            elderAge === ageVal
                              ? "bg-amber-600 text-white border-amber-600 shadow"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {ageVal === 80 ? "80+ Yrs" : `${ageVal} Yrs`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audio instructions button */}
                  <button
                    type="button"
                    onClick={() =>
                      speakVoiceGuide(
                        "Please enter your full name and 10 digit mobile phone number. No passwords or bank details are needed. Then click the green button to receive your free login code."
                      )
                    }
                    className="w-full py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-100"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Listen to Instructions (Spoken Aloud)</span>
                  </button>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-sm shadow-md hover:from-emerald-700 hover:to-teal-800 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-300" />
                      <span>Send Free SMS Verification Code</span>
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: LARGE OTP VERIFICATION */}
              {regStep === "otp" && (
                <div className="space-y-5">
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                    <span className="text-xs text-amber-900 font-bold block">
                      Free SMS Verification Code sent to {elderMobile}
                    </span>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <span className="font-mono text-xl font-black text-amber-950 tracking-widest bg-white px-3 py-1 rounded-xl border border-amber-300">
                        {simulatedOtp}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          speakVoiceGuide(
                            `Your free verification code is: ${simulatedOtp.split("").join(" ")}`
                          )
                        }
                        className="p-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950"
                        title="Read Code Aloud"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1 text-center">
                      Enter 6-Digit Code (Or tap the 1-Touch Auto Fill below):
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="e.g. 739241"
                      className="w-full px-4 py-3 text-center tracking-[0.4em] font-mono text-2xl font-black rounded-xl border-2 border-slate-300 focus:border-emerald-600 outline-none"
                    />
                  </div>

                  {otpError && (
                    <div className="text-xs text-red-600 font-bold text-center">
                      {otpError}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setEnteredOtp(simulatedOtp)}
                      className="w-full py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-2 border border-amber-300"
                    >
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>1-Touch Auto-Enter Free Code ({simulatedOtp})</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>Verify & Enter Senior Portal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegStep("form")}
                      className="text-xs text-slate-500 font-bold hover:underline text-center mt-1"
                    >
                      Go Back to Edit Name or Number
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS */}
              {regStep === "success" && (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-emerald-900">
                    Registration Verified!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Welcome to the Senior Citizen Gateway. Entering your personalized portal now...
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
