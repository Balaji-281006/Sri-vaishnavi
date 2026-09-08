import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  HeartHandshake,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface VoiceAssistantProps {
  currentLanguage: SupportedLanguage;
  userRole?: string;
  onNavigateTo?: (screen: string) => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  currentLanguage,
  userRole = "citizen",
  onNavigateTo,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "assistant",
      text: t.voiceWelcome,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Language code mapping
      const langMap: Record<SupportedLanguage, string> = {
        en: "en-IN",
        ta: "ta-IN",
        hi: "hi-IN",
        te: "te-IN",
        kn: "kn-IN",
        ml: "ml-IN",
        bn: "bn-IN",
        mr: "mr-IN",
        gu: "gu-IN",
        pa: "pa-IN",
        or: "or-IN",
        as: "as-IN",
      };
      recognition.lang = langMap[currentLanguage] || "en-IN";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLanguage]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!speechEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Gentle pace for senior citizens
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not directly supported in this browser. Please type your query in the input box below.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Mic start failed", err);
      }
    }
  };

  const handleSendQuery = async (queryText?: string) => {
    const query = (queryText || inputText).trim();
    if (!query || isLoading) return;

    setInputText("");

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/voice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          language: currentLanguage,
          userRole,
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      const replyText = data.response || "I am here to guide you with all government services.";

      const assistantMsg: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      speakText(replyText);
    } catch (err) {
      console.warn("AI voice fallback", err);
      // Helpful fallback response
      let fallback = "You can easily apply through CitizenOne AI. For Income Certificates, prepare your Aadhaar, Ration card, and salary slips. For PM-Kisan, visit the Farmers section with your land records.";
      if (query.toLowerCase().includes("scholarship")) {
        fallback = "Student scholarships (such as NMMS, Central Sector Scheme, and Pragati) are open. Please check the Student Portal and upload your marksheets.";
      } else if (query.toLowerCase().includes("status") || query.toLowerCase().includes("track")) {
        fallback = "You can view real-time updates under 'My Applications' in the top navigation bar.";
      }

      const assistantMsg: ChatMessage = {
        id: "ast-" + Date.now(),
        sender: "assistant",
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    t.voiceSample1,
    t.voiceSample2,
    t.voiceSample3,
    t.voiceSample4,
  ];

  return (
    <>
      {/* Floating Mic Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-[#0B3B60] via-[#0b4777] to-amber-500 text-white shadow-2xl shadow-blue-950/40 border-2 border-amber-400 flex items-center justify-center"
          title="CitizenOne AI Voice Assistant"
        >
          {/* Animated Wave Pulse */}
          <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-30 group-hover:opacity-60 animate-ping" />
          <Mic className="w-6 h-6 text-amber-300 relative z-10" />

          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Speak with AI Assistant
          </span>
        </motion.button>
      </div>

      {/* Voice Assistant Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh] sm:h-[620px]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B3B60] via-[#083050] to-[#041d31] text-white flex items-center justify-between border-b border-amber-400/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold flex items-center gap-1.5">
                      CitizenOne Voice Assistant
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-slate-300">
                      Senior Citizen Friendly • Multilingual AI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSpeechEnabled(!speechEnabled);
                      if (speechEnabled && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white"
                    title={speechEnabled ? "Mute Voice Output" : "Enable Voice Output"}
                  >
                    {speechEnabled ? (
                      <Volume2 className="w-4 h-4 text-amber-300" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                    }}
                    className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Scroll View */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
                {messages.map((msg) => {
                  const isAst = msg.sender === "assistant";
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isAst ? "justify-start" : "justify-end"}`}
                    >
                      {isAst && (
                        <div className="w-7 h-7 rounded-xl bg-[#0B3B60] text-amber-400 flex items-center justify-center shrink-0 text-xs shadow-sm mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isAst
                            ? "bg-white text-slate-800 border border-slate-200"
                            : "bg-[#0B3B60] text-white"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span
                          className={`text-[10px] block mt-1 ${
                            isAst ? "text-slate-400" : "text-blue-200"
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>

                      {!isAst && (
                        <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs shadow-sm mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2 bg-white rounded-xl border border-slate-200 w-fit">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                    <span>CitizenOne AI is formulating simple, step-by-step guidance...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Sample Prompts */}
              <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
                <span className="text-slate-400 font-semibold shrink-0">Try:</span>
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendQuery(p)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 whitespace-nowrap transition-colors border border-slate-200"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Bar & Mic Button */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  className={`p-3 rounded-xl flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse ring-4 ring-red-200"
                      : "bg-slate-100 hover:bg-slate-200 text-[#0B3B60]"
                  }`}
                  title={isListening ? "Listening... Click to Stop" : "Click to Speak"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendQuery();
                  }}
                  placeholder={
                    isListening
                      ? "Listening to your voice..."
                      : "Type question or click mic to speak..."
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50 font-medium"
                />

                <button
                  type="button"
                  onClick={() => handleSendQuery()}
                  disabled={!inputText.trim() || isLoading}
                  className="p-3 rounded-xl bg-[#0B3B60] hover:bg-[#082a47] disabled:opacity-40 text-white transition-all shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
