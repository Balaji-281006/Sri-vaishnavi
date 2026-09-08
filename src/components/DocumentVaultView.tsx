import React, { useState } from "react";
import { motion } from "motion/react";
import { VaultDocument, SupportedLanguage } from "../types";
import { TRANSLATIONS } from "../data/translations";
import {
  ShieldCheck,
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface DocumentVaultViewProps {
  documents: VaultDocument[];
  currentLanguage: SupportedLanguage;
  onUploadDocument: (newDoc: VaultDocument) => void;
  onDeleteDocument: (docId: string) => void;
}

export const DocumentVaultView: React.FC<DocumentVaultViewProps> = ({
  documents,
  currentLanguage,
  onUploadDocument,
  onDeleteDocument,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [filterType, setFilterType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocType, setNewDocType] = useState<VaultDocument["type"]>("Certificates");
  const [newDocNum, setNewDocNum] = useState("");

  const filteredDocs = documents.filter((doc) => {
    const matchesType = filterType === "All" || doc.type === filterType;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleManualUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const doc: VaultDocument = {
      id: "doc-" + Date.now(),
      title: newDocTitle,
      type: newDocType,
      fileName: `${newDocTitle.replace(/\s+/g, "_")}.pdf`,
      fileSize: "1.4 MB",
      uploadedAt: new Date().toISOString().split("T")[0],
      isDigiLockerVerified: true,
      documentNumber: newDocNum || `IN/GOV/2026/${Math.floor(100000 + Math.random() * 900000)}`,
    };

    onUploadDocument(doc);
    setNewDocTitle("");
    setNewDocNum("");
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0B3B60] via-[#09406b] to-[#041d31] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border-b border-amber-400/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            DigiLocker Certified Secure Cloud Vault
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.vaultTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-200 leading-relaxed">
            {t.vaultSubtitle}
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-blue-200">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-amber-300" /> 256-Bit SHA Encryption
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ministry of Electronics & IT
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Instant Pre-Fill Ready
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#0B3B60] bg-slate-50"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["All", "Aadhaar", "PAN", "Certificates", "Academic Documents", "Resume"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === cat
                  ? "bg-[#0B3B60] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => setIsUploading(true)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0B3B60] hover:bg-[#09406b] text-white text-xs font-bold shadow flex items-center justify-center gap-2"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Upload Modal Form */}
      {isUploading && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Add Verified Document to Vault
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Stored securely with DigiLocker verified tamper-proof status.
            </p>

            <form onSubmit={handleManualUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Birth Certificate, Driving Licence, B.Tech Degree"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-[#0B3B60]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category Type
                </label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-[#0B3B60]"
                >
                  <option value="Certificates">Certificates</option>
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="PAN">PAN</option>
                  <option value="Academic Documents">Academic Documents</option>
                  <option value="Resume">Resume</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document / Registration Number (Optional)
                </label>
                <input
                  type="text"
                  value={newDocNum}
                  onChange={(e) => setNewDocNum(e.target.value)}
                  placeholder="e.g. TN/REV/2026/10492"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:ring-2 focus:ring-[#0B3B60]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#082a47]"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => (
          <motion.div
            key={doc.id}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3B60] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {doc.type}
                </span>

                {doc.isDigiLockerVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 my-2">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B3B60] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {doc.title}
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">
                    {doc.documentNumber || doc.fileName}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Size: {doc.fileSize}</span>
                <span>Uploaded: {doc.uploadedAt}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert(`Simulated secure download of ${doc.fileName} from DigiLocker Cloud.`)}
                className="text-xs font-semibold text-[#0B3B60] hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                type="button"
                onClick={() => onDeleteDocument(doc.id)}
                className="text-xs text-red-500 hover:text-red-700 p-1"
                title="Remove Document"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
