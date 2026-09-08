import React from "react";
import { motion } from "motion/react";
import { SupportedLanguage } from "../types";
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from "../data/translations";
import { Globe, Check, ArrowRight, Sparkles } from "lucide-react";

interface LanguageSelectionProps {
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onContinue: () => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  currentLanguage,
  onSelectLanguage,
  onContinue,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* Top Header Motif */}
      <div className="w-full max-w-4xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold tracking-wide uppercase mb-3">
          <Globe className="w-3.5 h-3.5 text-blue-700" />
          Digital India Multilingual Ecosystem
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.chooseLanguage}
        </h2>
        <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {t.chooseLanguageSubtitle}
        </p>
      </div>

      {/* Grid of 12 Indian Languages */}
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLanguage(lang.code)}
              className={`relative text-left p-4 rounded-xl border transition-all duration-200 shadow-sm flex flex-col justify-between ${
                isSelected
                  ? "bg-gradient-to-br from-[#0B3B60] to-[#082a47] text-white border-amber-400 ring-2 ring-amber-400/50 shadow-md shadow-blue-950/20"
                  : "bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:shadow"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl font-bold tracking-tight font-serif">
                  {lang.nativeName}
                </span>
                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="text-xs font-mono font-medium text-slate-400 uppercase">
                    {lang.code}
                  </span>
                )}
              </div>

              <div className="mt-3">
                <p className={`text-sm font-semibold ${isSelected ? "text-amber-200" : "text-slate-900"}`}>
                  {lang.name}
                </p>
                <p className={`text-xs mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                  {lang.scriptHint}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0B3B60] via-[#09406b] to-[#072d4c] hover:from-[#09406b] hover:to-[#05233c] text-white font-bold text-base shadow-lg shadow-blue-900/25 flex items-center gap-3 border border-amber-400/40"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </motion.button>
      </div>

      <div className="mt-8 text-center flex items-center gap-1.5 text-xs text-slate-500">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Language can also be switched anytime in the top navigation bar</span>
      </div>
    </div>
  );
};
