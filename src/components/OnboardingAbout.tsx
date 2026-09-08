import React from "react";
import { motion } from "motion/react";
import { SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  FileText,
  Landmark,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface OnboardingAboutProps {
  currentLanguage: SupportedLanguage;
  onEnterPlatform: () => void;
}

export const OnboardingAbout: React.FC<OnboardingAboutProps> = ({
  currentLanguage,
  onEnterPlatform,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const cards = [
    {
      title: t.servicesLabel,
      icon: FileText,
      tag: "Certificates & Identity",
      desc: "Instant access to Income, Nativity, Birth certificates, Aadhaar, PAN, Voter ID, and Passport services.",
      color: "from-blue-600 to-indigo-700",
      bgLight: "bg-blue-50 text-blue-800",
    },
    {
      title: t.schemesLabel,
      icon: Landmark,
      tag: "Central & State Welfare",
      desc: "Explore nationwide welfare schemes for Farmers, Women, Housing, Healthcare, Senior Citizens, and Social Welfare.",
      color: "from-amber-600 to-orange-700",
      bgLight: "bg-amber-50 text-amber-800",
    },
    {
      title: t.scholarshipsLabel,
      icon: GraduationCap,
      tag: "National & State Grants",
      desc: "Direct financial support for School students, UG/PG degrees, Research Fellows, and Girl Students with DBT transfer.",
      color: "from-emerald-600 to-teal-700",
      bgLight: "bg-emerald-50 text-emerald-800",
    },
    {
      title: t.opportunitiesLabel,
      icon: Briefcase,
      tag: "Internships & Jobs",
      desc: "Unlock Premier Government and Corporate Internships, PSU Engineer roles, and automated AI Resume ATS scoring.",
      color: "from-purple-600 to-indigo-800",
      bgLight: "bg-purple-50 text-purple-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Container */}
      <div className="w-full max-w-4xl text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wide uppercase mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Two-Factor Authentication Verified
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.aboutTitle}
        </h2>

        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.aboutDesc}
        </p>
      </div>

      {/* 4 Cards */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}
              />
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-[#0B3B60] mb-4 shadow-inner">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2 ${card.bgLight}`}>
                  {card.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Enter Platform CTA */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onEnterPlatform}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#0B3B60] via-[#0b4777] to-[#082d4c] text-white font-extrabold text-lg tracking-wide shadow-xl shadow-blue-950/25 flex items-center gap-3 border border-amber-400/50 hover:from-[#0c4e82] hover:to-[#093559] transition-all"
        >
          <span>{t.enterPlatform}</span>
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </motion.button>
        <p className="mt-3 text-xs text-slate-500 font-mono">
          Unified Digital Government Gateway • Version 2026.1
        </p>
      </div>
    </div>
  );
};
