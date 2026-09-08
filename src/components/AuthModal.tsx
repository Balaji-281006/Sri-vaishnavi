import React, { useState } from "react";
import { motion } from "motion/react";
import { UserRole, UserProfile, SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  KeyRound,
  Shield,
  Sparkles,
  ArrowRight,
  Info,
  Mic,
  Volume2,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

interface AuthModalProps {
  currentLanguage: SupportedLanguage;
  selectedRole: UserRole;
  onSubmitSuccess: (profile: UserProfile) => void;
  onBackToRoles: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentLanguage,
  selectedRole,
  onSubmitSuccess,
  onBackToRoles,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [isSignInMode, setIsSignInMode] = useState(false);

  // Senior Easy Mode toggle (Default true for Seniors!)
  const isSeniorRole = selectedRole === "senior";
  const [isSeniorEasyMode, setIsSeniorEasyMode] = useState(isSeniorRole);

  // Form fields
  const [fullName, setFullName] = useState(
    isSeniorRole ? "K. Ramaswamy" : ""
  );
  const [mobile, setMobile] = useState(
    isSeniorRole ? "+91 98412 87654" : ""
  );
  const [email, setEmail] = useState(
    isSeniorRole ? "ramaswamy.k1958@pension.gov.in" : ""
  );
  const [dob, setDob] = useState(isSeniorRole ? "1958-08-15" : "2001-06-18");
  const [age, setAge] = useState<number>(isSeniorRole ? 68 : 25);
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [state, setState] = useState("Tamil Nadu");
  const [district, setDistrict] = useState(isSeniorRole ? "Madurai" : "Chennai");
  const [fullAddress, setFullAddress] = useState(
    isSeniorRole
      ? "14/B, West Masi Street, Madurai - 625001"
      : "Plot 42, Anna Nagar West Extension, Chennai - 600101"
  );
  const [qualification, setQualification] = useState(
    isSeniorRole ? "Graduate (B.Sc)" : "B.Tech / B.E in Computer Science & Engineering"
  );
  const [occupation, setOccupation] = useState(
    isSeniorRole ? "Retired State Officer & Senior Pensioner" : "Graduated Student / Active Job Seeker"
  );
  const [username, setUsername] = useState(isSeniorRole ? "ramaswamy_senior" : "");
  const [password, setPassword] = useState(isSeniorRole ? "Senior@2026" : "");

  const [formError, setFormError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListeningName, setIsListeningName] = useState(false);
  const [isListeningMobile, setIsListeningMobile] = useState(false);

  // Voice speech synthesis for seniors
  const speakVoiceGuide = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Browser speech recognition for seniors
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

      if (field === "name") setIsListeningName(true);
      if (field === "mobile") setIsListeningMobile(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (field === "name") {
          setFullName(transcript);
          setIsListeningName(false);
          speakVoiceGuide(`Name recorded as ${transcript}`);
        } else {
          const numbersOnly = transcript.replace(/\D/g, "");
          setMobile(numbersOnly || transcript);
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

  // Auto-fill presets based on selected role
  const handleAutoFill = () => {
    if (selectedRole === "jobseeker") {
      setFullName("Venkatesh S");
      setMobile("+91 98456 78901");
      setEmail("venkatesh.careers@digitalindia.gov.in");
      setDob("1999-07-18");
      setAge(27);
      setGender("Male");
      setState("Tamil Nadu");
      setDistrict("Coimbatore");
      setFullAddress("82, Avinashi Road, Peelamedu, Coimbatore - 641004");
      setQualification("B.E. Computer Science & Engineering (Distinction)");
      setOccupation("Graduated Candidate / Active Job Seeker");
      setUsername("venkatesh_careers");
      setPassword("JobSeeker@2026");
    } else if (selectedRole === "senior") {
      setFullName("K. Ramaswamy");
      setMobile("+91 98412 87654");
      setEmail("ramaswamy.k1958@pension.gov.in");
      setDob("1958-08-15");
      setAge(68);
      setGender("Male");
      setState("Tamil Nadu");
      setDistrict("Madurai");
      setFullAddress("14/B, West Masi Street, Madurai - 625001");
      setQualification("Graduate (B.Sc)");
      setOccupation("Retired State Public Works Officer");
      setUsername("ramaswamy_senior");
      setPassword("SeniorCitizen@2026");
    } else if (selectedRole === "student") {
      setFullName("Ananya Sengupta");
      setMobile("+91 97123 45678");
      setEmail("ananya.sengupta@student.ac.in");
      setDob("2004-03-21");
      setAge(22);
      setGender("Female");
      setState("West Bengal");
      setDistrict("Kolkata");
      setFullAddress("58, College Street, Bowbazar, Kolkata - 700073");
      setQualification("Final Year B.Tech (Data Science & AI)");
      setOccupation("Student / Undergraduate Scholar");
      setUsername("ananya_tech");
      setPassword("StudentIndia@2026");
    } else {
      setFullName("Arun Kumar V");
      setMobile("+91 98234 56789");
      setEmail("arun.kumar.citizen@outlook.com");
      setDob("1994-11-09");
      setAge(32);
      setGender("Male");
      setState("Karnataka");
      setDistrict("Bengaluru Urban");
      setFullAddress("204, 3rd Cross, Indiranagar 1st Stage, Bengaluru - 560038");
      setQualification("Bachelor of Commerce (B.Com)");
      setOccupation("Self-Employed / Small Business Proprietor");
      setUsername("arun_citizen");
      setPassword("DigitalCitizen@2026");
    }
    setFormError("");
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDob(val);
    if (val) {
      const birthYear = new Date(val).getFullYear();
      const currentYear = new Date().getFullYear();
      const calcAge = currentYear - birthYear;
      if (calcAge > 0) setAge(calcAge);
    }
  };

  // Instant 1-Touch Free Senior Access handler
  const handleInstantSeniorLogin = () => {
    const seniorProfile: UserProfile = {
      id: "usr-senior-" + Date.now(),
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
      isVerified: false,
      mobileVerified: false,
      emailVerified: false,
      registeredAt: new Date().toISOString(),
      resumeUploaded: false,
    };
    onSubmitSuccess(seniorProfile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // For Senior Easy Mode, only fullName and mobile are required!
    if (isSeniorRole && isSeniorEasyMode) {
      if (!fullName.trim() || !mobile.trim()) {
        setFormError("Please enter or speak your name and phone number to proceed.");
        return;
      }

      const generatedMobile = mobile.startsWith("+91") ? mobile : `+91 ${mobile}`;
      const generatedEmail = email || `senior.${mobile.replace(/\D/g, "")}@pension.gov.in`;
      const generatedUsername = username || `senior_${Date.now().toString().slice(-4)}`;

      const newProfile: UserProfile = {
        id: "usr-" + Date.now(),
        fullName: fullName || "Senior Citizen",
        mobile: generatedMobile,
        email: generatedEmail,
        dob: `${new Date().getFullYear() - age}-01-01`,
        age: age || 68,
        gender,
        state,
        district,
        fullAddress,
        qualification: qualification || "Senior Citizen",
        occupation: occupation || "Senior Pensioner",
        username: generatedUsername,
        role: "senior",
        isVerified: false,
        mobileVerified: false,
        emailVerified: false,
        registeredAt: new Date().toISOString(),
        resumeUploaded: false,
      };

      onSubmitSuccess(newProfile);
      return;
    }

    // Standard Form Validation
    if (!fullName.trim() || !mobile.trim() || !email.trim() || !username.trim() || !password.trim()) {
      setFormError("Please fill all mandatory fields to proceed with OTP verification.");
      return;
    }

    const newProfile: UserProfile = {
      id: "usr-" + Date.now(),
      fullName: fullName || "Verified Citizen",
      mobile: mobile || "+91 98765 43210",
      email: email || "citizen@digitalindia.gov.in",
      dob,
      age: age || 24,
      gender,
      state,
      district,
      fullAddress,
      qualification,
      occupation,
      username: username || "citizen_user",
      role: selectedRole,
      isVerified: false,
      mobileVerified: false,
      emailVerified: false,
      registeredAt: new Date().toISOString(),
      resumeUploaded: selectedRole === "student" || selectedRole === "jobseeker",
    };

    onSubmitSuccess(newProfile);
  };

  const getRoleDisplayName = () => {
    switch (selectedRole) {
      case "jobseeker":
        return "Job Seeker & Professional";
      case "senior":
        return "Senior Citizen (Aged 60+)";
      case "student":
        return "Student";
      default:
        return "Citizen";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div
        className={`w-full max-w-2xl bg-white rounded-3xl border shadow-xl p-6 sm:p-10 relative overflow-hidden ${
          isSeniorRole ? "border-2 border-amber-400" : "border-slate-200"
        }`}
      >
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  isSeniorRole
                    ? "bg-amber-100 text-amber-950 border border-amber-300"
                    : "bg-blue-50 text-blue-900 border border-blue-200"
                }`}
              >
                {isSeniorRole ? (
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-blue-700" />
                )}
                {getRoleDisplayName()}
              </span>

              {isSeniorRole && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  100% Free Service
                </span>
              )}
            </div>

            <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">
              {isSeniorRole && isSeniorEasyMode
                ? "Senior Citizen Free & Easy Registration"
                : isSignInMode
                ? "Sign In to CitizenOne AI"
                : `Create Verified ${getRoleDisplayName()} Account`}
            </h2>
          </div>

          {/* Quick Auto Fill Button */}
          {!isSeniorRole && (
            <button
              type="button"
              onClick={handleAutoFill}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-semibold text-xs hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-sm self-start"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Auto Fill Demo</span>
            </button>
          )}
        </div>

        {/* SENIOR CITIZEN EASY ACCESS STATION */}
        {isSeniorRole && isSeniorEasyMode && (
          <div className="mb-6 space-y-4">
            {/* 1-Touch Button */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/70 to-white border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wide block">
                  Method 1: Zero Typing Required
                </span>
                <span className="text-sm font-black text-slate-900 block">
                  1-Touch Instant Free Senior Login
                </span>
                <span className="text-xs text-slate-600">
                  Loads K. Ramaswamy (Age 68) & verifies instantly
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleInstantSeniorLogin}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 border border-emerald-300 shrink-0"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>1-Touch Instant Access</span>
              </motion.button>
            </div>

            {/* Voice Instruction Trigger */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs">
              <span className="text-blue-950 font-medium">
                Need audio help? Tap to hear spoken instructions:
              </span>
              <button
                type="button"
                onClick={() =>
                  speakVoiceGuide(
                    "Namaste! Senior Citizen registration is completely free. Please speak or type your full name and mobile phone number. No passwords or bank details are needed."
                  )
                }
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? "Speaking..." : "🔊 Read Out Loud"}</span>
              </button>
            </div>
          </div>
        )}

        {/* SENIOR CITIZEN SIMPLIFIED 2-FIELD FORM */}
        {isSeniorRole && isSeniorEasyMode ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field 1: Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>1. Full Name (as per Aadhaar / Pension Card) *</span>
                </label>
                <button
                  type="button"
                  onClick={() => startSpeechInput("name")}
                  className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold ${
                    isListeningName
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListeningName ? "Listening..." : "Speak Name"}</span>
                </button>
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. K. Ramaswamy"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 text-base font-bold outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 bg-slate-50/50"
              />
            </div>

            {/* Field 2: Mobile Number */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>2. Mobile Phone Number (for Free SMS OTP) *</span>
                </label>
                <button
                  type="button"
                  onClick={() => startSpeechInput("mobile")}
                  className={`text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold ${
                    isListeningMobile
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListeningMobile ? "Listening..." : "Speak Number"}</span>
                </button>
              </div>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. +91 98412 87654"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 text-base font-bold outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 bg-slate-50/50"
              />
            </div>

            {/* Field 3: Age Pills */}
            <div>
              <label className="text-sm font-black text-slate-900 block mb-2">
                3. Approximate Age:
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[60, 65, 68, 75].map((ageVal) => (
                  <button
                    key={ageVal}
                    type="button"
                    onClick={() => setAge(ageVal)}
                    className={`py-3 rounded-xl font-black text-sm transition-all border ${
                      age === ageVal
                        ? "bg-amber-600 text-white border-amber-600 shadow"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {ageVal === 75 ? "75+ Yrs" : `${ageVal} Yrs`}
                  </button>
                ))}
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700">
                {formError}
              </div>
            )}

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-base shadow-lg hover:from-emerald-700 hover:to-teal-800 flex items-center justify-center gap-2 border border-emerald-300"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>Continue to Free SMS Verification</span>
              </motion.button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSeniorEasyMode(false)}
                className="text-xs text-slate-500 font-bold hover:text-slate-800 hover:underline"
              >
                Switch to Detailed Form (For Caregivers / Family Members)
              </button>
            </div>
          </form>
        ) : (
          /* STANDARD DETAILED FORM (For other roles or senior caregiver mode) */
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSeniorRole && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900">
                  Detailed Mode active (Caregiver entry).
                </span>
                <button
                  type="button"
                  onClick={() => setIsSeniorEasyMode(true)}
                  className="font-bold text-[#0B3B60] hover:underline"
                >
                  ← Back to Simple Elder Mode
                </button>
              </div>
            )}

            {/* Row 1: Full Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Venkatesh S"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98456 78901"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>
            </div>

            {/* Row 2: Email & DOB / Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. citizen@digitalindia.gov.in"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> DOB *
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={handleDobChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    readOnly
                    value={age}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-100 text-slate-600 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Gender & State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender *</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">District *</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="District"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Residential Address *
              </label>
              <input
                type="text"
                required
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                placeholder="Door No, Street Name, Area, Pincode"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
              />
            </div>

            {/* Qualification & Occupation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Educational Qualification *
                </label>
                <input
                  type="text"
                  required
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. B.Tech / B.E, B.Sc, Diploma, 12th"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Current Status / Occupation *
                </label>
                <input
                  type="text"
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Graduated / Seeking Software Roles"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>
            </div>

            {/* Username & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Portal Username *
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username for single login"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" /> Secure Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50/50"
                />
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700">
                {formError}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B3B60] to-[#082842] text-white font-bold text-sm shadow-lg hover:from-[#09406b] hover:to-[#061e33] flex items-center justify-center gap-2 border border-amber-400/40"
              >
                <span>Proceed to Government OTP Verification</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </motion.button>
            </div>
          </form>
        )}

        {/* Back Button */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={onBackToRoles}
            className="text-slate-600 font-bold hover:underline"
          >
            ← Choose Different Role
          </button>
          <span className="text-slate-400">Powered by Government of India</span>
        </div>
      </div>
    </div>
  );
};
