import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Sparkles, Award } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 }}
      onClick={onComplete}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#061e38] via-[#0B3B60] to-[#041527] text-white cursor-pointer select-none overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-amber-400/30 via-sky-500/10 to-transparent blur-3xl" />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-600/20 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      {/* Decorative concentric geometry (Govt / Emblem inspired) */}
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-10 rounded-full border border-dashed border-amber-400/25 pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-16 rounded-full border border-amber-500/15 pointer-events-none"
        />

        {/* Central Logo Container */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a2e4c] to-[#04192b] p-1 shadow-2xl shadow-amber-500/20 ring-1 ring-amber-400/40 flex items-center justify-center"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-2 rounded-2xl bg-gradient-to-tr from-[#0B3B60]/80 via-transparent to-amber-500/20" />

          {/* National Emblem & Shield Composite Emblem */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <Shield className="w-16 h-16 md:w-20 md:h-20 text-amber-400 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)] stroke-[1.6]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-1 flex items-center gap-1 text-[11px] font-semibold tracking-widest text-amber-300 uppercase"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              AI GOVTECH
            </motion.div>
          </div>
        </motion.div>

        {/* Title and Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-8 text-center"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            CitizenOne <span className="text-amber-400 font-serif">AI</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-3 text-base md:text-xl font-normal text-slate-200/90 tracking-wide max-w-xl mx-auto px-4"
          >
            One Citizen. One Portal. Unlimited Opportunities.
          </motion.p>
        </motion.div>

        {/* Progress Bar Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "220px" }}
          transition={{ duration: 2.8, ease: "easeInOut" }}
          className="mt-10 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full opacity-80"
        />

        <p className="mt-4 text-xs tracking-wider text-slate-400 uppercase font-mono">
          Initiating Secure Digital Gateway...
        </p>
      </div>
    </motion.div>
  );
};
