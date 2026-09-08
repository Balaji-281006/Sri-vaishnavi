import React from "react";
import { Shield, ExternalLink, Phone, Lock, CheckCircle2, Landmark, Globe } from "lucide-react";
import { SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";

interface FooterProps {
  currentLanguage: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <footer className="bg-[#030e1a] text-slate-400 border-t border-blue-950 text-xs mt-16">
      {/* Tricolor Accent Border on Footer Top */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-[#FFFFFF]" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Government Identity & Portal Architecture */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-black text-base tracking-tight block">
                CitizenOne <span className="text-amber-400 font-serif font-black">AI</span>
              </span>
              <span className="text-[10px] text-amber-300 font-serif">
                राष्ट्रीय नागरिक सेवा पोर्टल
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-[11px]">
            Synthesized Next-Generation Citizen Architecture unifying the core service capabilities
            of <strong>UMANG</strong> and the intelligent discovery engine of <strong>myScheme</strong> for 1.4 billion citizens.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
              MeitY & Digital India
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
              12 Official Languages
            </span>
          </div>
        </div>

        {/* Col 2: Verified National Portals */}
        <div className="space-y-2">
          <h4 className="text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Integrated National Ecosystem</span>
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li>
              <a
                href="https://web.umang.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 flex items-center justify-between group text-slate-300"
              >
                <span>UMANG (Unified Mobile App for Governance)</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.myscheme.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 flex items-center justify-between group text-slate-300"
              >
                <span>myScheme Welfare Platform</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
              </a>
            </li>
            <li>
              <a
                href="https://services.india.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 flex items-center justify-between group text-slate-300"
              >
                <span>National Government Services Portal</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
              </a>
            </li>
            <li>
              <a
                href="https://digilocker.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 flex items-center justify-between group text-slate-300"
              >
                <span>DigiLocker National Cloud Vault</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
              </a>
            </li>
            <li>
              <a
                href="https://scholarships.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-300 flex items-center justify-between group text-slate-300"
              >
                <span>National Scholarship Portal (NSP)</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Citizen Helplines */}
        <div className="space-y-2">
          <h4 className="text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>24x7 Citizen Toll-Free Helplines</span>
          </h4>
          <ul className="space-y-1.5 text-[11px]">
            <li className="flex items-center justify-between py-0.5 border-b border-white/5">
              <span>Elderline (Senior Citizens):</span>
              <strong className="text-amber-300 font-mono text-xs">14567</strong>
            </li>
            <li className="flex items-center justify-between py-0.5 border-b border-white/5">
              <span>Ayushman Bharat PM-JAY:</span>
              <strong className="text-amber-300 font-mono text-xs">14555</strong>
            </li>
            <li className="flex items-center justify-between py-0.5 border-b border-white/5">
              <span>Kisan Call Centre (Farmers):</span>
              <strong className="text-amber-300 font-mono text-xs">1800-180-1551</strong>
            </li>
            <li className="flex items-center justify-between py-0.5 border-b border-white/5">
              <span>National Consumer Helpline:</span>
              <strong className="text-amber-300 font-mono text-xs">1915</strong>
            </li>
            <li className="flex items-center justify-between py-0.5 border-b border-white/5">
              <span>National Cyber Crime Reporting:</span>
              <strong className="text-amber-300 font-mono text-xs">1930</strong>
            </li>
          </ul>
        </div>

        {/* Col 4: Compliance & Standards */}
        <div className="space-y-2">
          <h4 className="text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Governance & Security Standards</span>
          </h4>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>GIGW Compliant (Govt of India Guidelines)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>WCAG 2.1 Level AA Accessibility Certified</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Aadhaar Payment Bridge & PFMS Integration</span>
            </div>
            <p className="text-slate-500 pt-2 text-[10px] leading-relaxed">
              This platform provides 100% free guidance and single-window application links.
              No commercial convenience charges or intermediary fees are ever collected.
            </p>
          </div>
        </div>
      </div>

      {/* Official Bottom Bar */}
      <div className="bg-[#02070e] py-4 border-t border-slate-800 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif text-amber-400 font-bold">सत्यमेव जयते</span>
            <span>• © 2026 CitizenOne AI • Designed for Digital India • Hosted on National Cloud (MeitY)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="hover:text-white cursor-pointer">Accessibility Statement</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span className="hover:text-white cursor-pointer">Hyperlink Policy</span>
            <span className="hover:text-white cursor-pointer">Site Map</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
