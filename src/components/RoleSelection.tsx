import React from "react";
import { motion } from "motion/react";
import { UserRole, SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  Users,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface RoleSelectionProps {
  currentLanguage: SupportedLanguage;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  currentLanguage,
  onSelectRole,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const roles = [
    {
      id: "citizen" as UserRole,
      title: t.roleCitizen,
      desc: t.roleCitizenDesc,
      icon: Users,
      badge: "General Public",
      accent: "from-blue-600 to-indigo-700",
      border: "hover:border-blue-500",
      bgLight: "bg-blue-50 text-blue-700",
    },
    {
      id: "senior" as UserRole,
      title: t.roleSenior,
      desc: t.roleSeniorDesc + " • 100% Free & Easy Access • Large Font & Voice Assistance",
      icon: HeartHandshake,
      badge: "100% Free & Easy • Aged 60+",
      accent: "from-amber-600 to-orange-700",
      border: "hover:border-amber-500",
      bgLight: "bg-amber-50 text-amber-700",
    },
    {
      id: "student" as UserRole,
      title: t.roleStudent,
      desc: t.roleStudentDesc,
      icon: GraduationCap,
      badge: "Youth & Learners",
      accent: "from-emerald-600 to-teal-700",
      border: "hover:border-emerald-500",
      bgLight: "bg-emerald-50 text-emerald-700",
    },
    {
      id: "jobseeker" as UserRole,
      title: t.roleJobSeeker || "Job Seeker & Professional",
      desc:
        t.roleJobSeekerDesc ||
        "Graduated Students, Job Seekers & Professionals • AI Resume ATS Analyzer • PSU & Tech Jobs • Skill Certificates",
      icon: Briefcase,
      badge: "Career & Jobs",
      accent: "from-purple-600 to-indigo-700",
      border: "hover:border-purple-500",
      bgLight: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Header */}
      <div className="w-full max-w-4xl text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Single Sign-On Citizen Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.roleSelectTitle}
        </h2>
        <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {t.roleSelectSubtitle}
        </p>
      </div>

      {/* Large Cards Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {roles.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(item.id)}
              className={`cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 shadow-sm transition-all duration-200 flex flex-col justify-between ${item.border} hover:shadow-xl relative overflow-hidden group`}
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.accent}`}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.bgLight}`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Large Icon */}
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800 mb-5 group-hover:bg-[#0B3B60] group-hover:text-amber-400 transition-colors duration-200 shadow-inner">
                  <Icon className="w-9 h-9 stroke-[1.8]" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0B3B60] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-[#0B3B60] group-hover:text-amber-600">
                <span>Select & Continue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
