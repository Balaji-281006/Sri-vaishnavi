import React, { useState } from "react";
import { SupportedLanguage, UserRole, UserProfile, AppScreen } from "../types";
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from "../data/translations";
import {
  Shield,
  Award,
  Globe,
  Sun,
  Moon,
  LogOut,
  FolderLock,
  Clock,
  User,
  GraduationCap,
  HeartHandshake,
  Users,
  Briefcase,
  Sparkles,
  Menu,
  X,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  currentScreen: AppScreen;
  userRole: UserRole;
  userProfile: UserProfile | null;
  highContrast: boolean;
  largeFont: boolean;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onNavigate: (screen: AppScreen) => void;
  onToggleHighContrast: () => void;
  onToggleLargeFont: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  currentScreen,
  userRole,
  userProfile,
  highContrast,
  largeFont,
  onLanguageChange,
  onNavigate,
  onToggleHighContrast,
  onToggleLargeFont,
  onSignOut,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");

  const getRoleIcon = () => {
    switch (userRole) {
      case "senior":
        return HeartHandshake;
      case "student":
        return GraduationCap;
      case "jobseeker":
        return Briefcase;
      default:
        return Users;
    }
  };

  const RoleIcon = getRoleIcon();

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      onNavigate("citizen-portal");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#061c36] via-[#0B3B60] to-[#082d4c] text-white border-b border-amber-400/30 shadow-md">
      {/* 1. TRICOLOR MICRO-STRIP (Iconic Indian Government Signature) */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" title="Saffron - Courage & Strength" />
        <div className="flex-1 bg-[#FFFFFF]" title="White - Peace & Truth" />
        <div className="flex-1 bg-[#138808]" title="Green - Prosperity & Growth" />
      </div>

      {/* 2. OFFICIAL GOVERNMENT OF INDIA APEX MASTHEAD (UMANG & myScheme Standard) */}
      <div className="bg-[#031324] py-1.5 px-4 sm:px-8 text-[11px] text-slate-300 border-b border-blue-950/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Emblem representation */}
          <div className="flex items-center gap-1.5 text-amber-300 font-extrabold tracking-wider">
            <span className="text-amber-400 font-serif">सत्यमेव जयते</span>
            <span className="text-slate-500">|</span>
            <span className="text-white font-bold">भारत सरकार</span>
            <span className="text-slate-400 font-normal hidden sm:inline">Government of India</span>
          </div>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-slate-400 hidden lg:inline">
            Ministry of Electronics & Information Technology (MeitY)
          </span>
          <span className="px-2 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/40 hidden md:inline">
            Digital India Corporation
          </span>
        </div>

        {/* Accessibility & Language Controls Bar */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
          {/* Font Size Adjusters */}
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
            <button
              type="button"
              onClick={onToggleLargeFont}
              className={`px-2 py-0.5 rounded text-[10px] font-black transition-colors ${
                !largeFont ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"
              }`}
              title="Normal Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={onToggleLargeFont}
              className={`px-2 py-0.5 rounded text-[10px] font-black transition-colors ${
                largeFont ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"
              }`}
              title="Senior Citizen Large Font (A+)"
            >
              A+
            </button>
          </div>

          {/* High Contrast */}
          <button
            type="button"
            onClick={onToggleHighContrast}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 border ${
              highContrast
                ? "bg-amber-400 text-slate-950 border-amber-400"
                : "bg-white/10 text-slate-300 hover:text-white border-white/15"
            }`}
            title="Toggle High Contrast Mode (WCAG 2.1 AA)"
          >
            {highContrast ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            <span className="hidden sm:inline">Contrast</span>
          </button>

          {/* Screen Reader Notice */}
          <span className="text-[10px] text-slate-400 hidden xl:inline" title="GIGW Compliant">
            Screen Reader Access
          </span>

          {/* Multilingual Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-bold flex items-center gap-1 text-white"
              title="Select Official Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-serif font-bold">
                {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeName || "English"}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>12 Official Languages</span>
                  <span className="text-[9px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    8th Schedule
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        onLanguageChange(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-semibold hover:bg-blue-50 flex items-center justify-between transition-colors ${
                        currentLanguage === l.code ? "bg-blue-50 text-blue-900 font-bold" : ""
                      }`}
                    >
                      <span className="font-serif text-sm font-bold">{l.nativeName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. MAIN BRAND & UNIFIED PORTAL BAR (UMANG + myScheme Look) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2 flex items-center justify-between gap-4">
        {/* Brand & Emblem Logo */}
        <div
          onClick={() => onNavigate("guided-category")}
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
        >
          {/* Government Ashoka / Shield Emblem */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a2e4c] to-[#04192b] border-2 border-amber-400/60 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-105 transition-transform ring-2 ring-amber-400/20">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
              <span>CitizenOne</span>
              <span className="text-amber-400 font-serif font-black">AI</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-black uppercase rounded bg-amber-400 text-slate-950 ml-1">
                Unified Portal
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-200 font-semibold tracking-wide">
              <span>राष्ट्रीय नागरिक सेवा पोर्टल</span>
              <span className="text-slate-400 hidden md:inline">• UMANG & myScheme Framework</span>
            </div>
          </div>
        </div>

        {/* UMANG-style Quick Search Bar in Header (Desktop) */}
        <form
          onSubmit={handleHeaderSearchSubmit}
          className="hidden lg:flex items-center relative flex-1 max-w-md mx-4"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            placeholder="Search 1,840+ Services, 850+ Schemes, Scholarships..."
            className="w-full pl-10 pr-20 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-300 outline-none focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[10px] hover:bg-amber-300 transition-colors shadow"
          >
            Search
          </button>
        </form>

        {/* Right Section: User Profile Badge & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* User Profile Capsule */}
          {userProfile && (
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/20">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow ring-1 ring-white/30">
                <RoleIcon className="w-4 h-4 text-slate-950" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{userProfile.fullName}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-[10px] text-amber-300 capitalize font-medium">
                  {userRole === "senior"
                    ? "Verified Senior Citizen (60+)"
                    : userRole === "student"
                    ? "Verified Student"
                    : userRole === "jobseeker"
                    ? "Job Seeker / Professional"
                    : "Verified Citizen"}
                </div>
              </div>

              <button
                type="button"
                onClick={onSignOut}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-red-300 transition-colors ml-1"
                title="Sign Out / Switch Role"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 4. SECONDARY NAVIGATION RIBBON (Clean, Official Portal Links) */}
      <div className="hidden md:block bg-[#031526]/90 border-t border-white/10 py-1 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-bold">
          <nav className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
            <button
              type="button"
              onClick={() => onNavigate("guided-category")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "guided-category"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("citizen-portal")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "citizen-portal"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.citizenPortal}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("senior-portal")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "senior-portal"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-amber-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              <span>Senior Citizen Desk (60+)</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px]">Free</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("student-portal")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "student-portal"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.studentPortal}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("jobseeker-portal")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "jobseeker-portal"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.jobSeekerPortal || "Job Seeker & Professional"}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("document-vault")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "document-vault"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FolderLock className="w-3.5 h-3.5 text-amber-400" />
              <span>DigiLocker Vault</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("application-tracking")}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentScreen === "application-tracking"
                  ? "bg-amber-400 text-slate-950 shadow"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Application</span>
            </button>
          </nav>

          {/* Quick Helpline Hotline */}
          <div className="hidden xl:flex items-center gap-2 text-amber-300 text-[11px]">
            <span>Elderline: <strong>14567</strong></span>
            <span>•</span>
            <span>Kisan: <strong>1551</strong></span>
            <span>•</span>
            <span>Ayushman: <strong>14555</strong></span>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#04192b] border-t border-white/10 p-4 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleHeaderSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search 1,840+ Services & Schemes..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-300"
            />
          </form>

          <div className="space-y-1 pt-2">
            <button
              type="button"
              onClick={() => {
                onNavigate("guided-category");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>National Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate("citizen-portal");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>{t.citizenPortal}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate("senior-portal");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-white/10 flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>Senior Citizen Dedicated Gateway (60+) - Free</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate("student-portal");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>{t.studentPortal}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate("jobseeker-portal");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>{t.jobSeekerPortal || "Job Seeker & Professional Portal"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate("document-vault");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
            >
              <FolderLock className="w-4 h-4 text-amber-400" />
              <span>DigiLocker Document Vault</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onNavigate("application-tracking");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Track Applications</span>
            </button>
          </div>

          {userProfile && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Signed in as <strong>{userProfile.fullName}</strong></span>
              <button
                type="button"
                onClick={onSignOut}
                className="text-red-400 font-bold hover:underline"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
