import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "CitizenOne AI",
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
  });
});

// AI Resume Analyzer Endpoint
app.post("/api/ai/resume-analyze", async (req, res) => {
  try {
    const { resumeText, roleType, fileName } = req.body;

    const ai = getGeminiClient();
    if (!ai || !resumeText) {
      // Fallback deterministic analysis if Gemini key not configured
      return res.json(getFallbackResumeAnalysis(resumeText || fileName || "Engineering Student"));
    }

    const prompt = `You are the chief recruitment & skill intelligence officer for the Government of India's Digital Ecosystem (CitizenOne AI).
Analyze the candidate's resume for Government Internships, PSU roles, and Top Tech/Corporate Careers.
Resume Name/Content:
"${resumeText.slice(0, 4000)}"

Return a STRICT JSON response adhering to this schema:
{
  "skillsFound": ["Skill 1", "Skill 2", ... 5 to 10 identified skills],
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Area for improvement 1", "Area for improvement 2"],
  "atsScore": number between 65 and 95,
  "summary": "2 concise sentences evaluating readiness for government and corporate opportunities",
  "missingSkills": ["Missing skill 1", "Missing skill 2", "Missing skill 3"],
  "recommendedCourses": [
    {"name": "Course Name", "provider": "SWAYAM / NPTEL / PMKVY / Coursera", "duration": "4-8 Weeks", "level": "Intermediate"},
    {"name": "Course Name 2", "provider": "Digital India Learning / AICTE", "duration": "6 Weeks", "level": "Beginner to Advanced"}
  ],
  "matchedInternships": [
    {
      "company": "National Informatics Centre (NIC)",
      "role": "GovTech Data & AI Intern",
      "stipend": "₹25,000 / month",
      "duration": "6 Months",
      "location": "New Delhi / Remote",
      "matchScore": 94,
      "skillsRequired": ["Python", "Data Analysis", "SQL", "APIs"]
    },
    {
      "company": "NITI Aayog",
      "role": "Public Policy & Research Intern",
      "stipend": "₹20,000 / month",
      "duration": "3 Months",
      "location": "New Delhi",
      "matchScore": 88,
      "skillsRequired": ["Analytics", "Report Writing", "Public Systems"]
    },
    {
      "company": "Indian Space Research Organisation (ISRO)",
      "role": "Satellite Systems Software Trainee",
      "stipend": "₹28,000 / month",
      "duration": "6 Months",
      "location": "Bengaluru",
      "matchScore": 86,
      "skillsRequired": ["C++ / Python", "Algorithms", "Git"]
    }
  ],
  "matchedJobs": [
    {
      "company": "Centre for Development of Advanced Computing (C-DAC)",
      "position": "Project Engineer - AI Systems",
      "salary": "₹8.5 - 12 LPA",
      "location": "Pune / Bengaluru",
      "matchScore": 92,
      "eligibility": "B.Tech/BE/MCA in CS, IT, ECE with relevant technical background"
    },
    {
      "company": "Bharat Electronics Limited (BEL)",
      "position": "Deputy Engineer - Digital Infrastructure",
      "salary": "₹9.2 - 14 LPA",
      "location": "Bengaluru / Hyderabad",
      "matchScore": 89,
      "eligibility": "Degree with minimum 60% aggregate and foundational domain skills"
    },
    {
      "company": "National Health Authority (NHA)",
      "position": "Assistant Technology Consultant (Ayushman Bharat)",
      "salary": "₹7.5 - 11 LPA",
      "location": "New Delhi",
      "matchScore": 85,
      "eligibility": "Graduate with proficiency in public digital platforms and APIs"
    }
  ]
}
Return ONLY pure JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Resume analysis error:", error);
    return res.json(getFallbackResumeAnalysis(req.body.resumeText || "Student Profile"));
  }
});

// Multilingual AI Voice & Query Assistant Endpoint
app.post("/api/ai/voice-assistant", async (req, res) => {
  try {
    const { query, language } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json(getFallbackVoiceAnswer(query, language));
    }

    const prompt = `You are "CitizenOne Voice Assistant", the official AI guide for Government Services, Schemes, Scholarships, Internships, and Jobs in India.
The user asked: "${query}"
Selected UI Language: ${language || "English"}.

Provide a helpful, authoritative response formatted strictly as JSON with these fields:
{
  "spokenText": "Clear, concise direct answer in ${language || "English"} (2-3 sentences max) suitable for text-to-speech voice playback.",
  "category": "Service" | "Scheme" | "Scholarship" | "Internship" | "Job",
  "title": "Exact Title of matching Service / Scheme / Opportunity",
  "eligibility": "Clear bullet points of eligibility",
  "documents": ["Document 1", "Document 2", "Document 3", "Document 4"],
  "officialFees": "e.g. ₹60 (Free for SC/ST/BPL) or Free of Cost",
  "processingTime": "e.g. 7-15 Working Days",
  "officialWebsite": "Verified official government URL (e.g., https://services.india.gov.in, https://uidai.gov.in, https://scholarships.gov.in, https://myscheme.gov.in)",
  "actionSteps": [
    "Step 1: Check document readiness in Document Vault",
    "Step 2: Click Apply to open official portal",
    "Step 3: Track status with application reference"
  ]
}
Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error) {
    console.error("Voice assistant error:", error);
    return res.json(getFallbackVoiceAnswer(req.body.query, req.body.language));
  }
});

// Fallback logic for offline / no-key mode
function getFallbackResumeAnalysis(text: string) {
  return {
    skillsFound: [
      "Python",
      "Data Structures & Algorithms",
      "SQL",
      "Machine Learning",
      "Web Technologies (React/JS)",
      "Git & Collaborative Coding",
      "Problem Solving",
    ],
    strengths: [
      "Strong foundational competencies aligned with National AI & Digital India initiatives",
      "Hands-on project experience with modern computational frameworks",
      "Eligible for premier government technological traineeships and PSU fellowships",
    ],
    weaknesses: [
      "Could highlight open-source contributions and official certifications on SWAYAM/NPTEL",
      "Add quantifiable impact metrics to academic and engineering projects",
    ],
    atsScore: 84,
    summary:
      "The profile showcases strong algorithmic and engineering capabilities. Highly competitive for National Informatics Centre (NIC), NITI Aayog AI Fellowship, and C-DAC engineering roles.",
    missingSkills: ["Cloud Infrastructure (AWS/GCP)", "Power BI / Tableau", "Microservices Architecture"],
    recommendedCourses: [
      {
        name: "Cloud Computing & Distributed Systems",
        provider: "NPTEL / IIT Kharagpur",
        duration: "8 Weeks",
        level: "Intermediate",
      },
      {
        name: "Artificial Intelligence for Public Sector Systems",
        provider: "Digital India Academy / C-DAC",
        duration: "6 Weeks",
        level: "Advanced",
      },
      {
        name: "Data Visualization & Public Policy Dashboards",
        provider: "SWAYAM / IIM Bangalore",
        duration: "4 Weeks",
        level: "Beginner to Intermediate",
      },
    ],
    matchedInternships: [
      {
        company: "National Informatics Centre (NIC)",
        role: "GovTech Data & AI Intern",
        stipend: "₹25,000 / month",
        duration: "6 Months",
        location: "New Delhi / Hybrid",
        matchScore: 94,
        skillsRequired: ["Python", "SQL", "Data Pipelines", "APIs"],
      },
      {
        company: "NITI Aayog",
        role: "Aspirational Districts Technology Intern",
        stipend: "₹20,000 / month",
        duration: "3 Months",
        location: "New Delhi",
        matchScore: 90,
        skillsRequired: ["Analytics", "Python", "Documentation"],
      },
      {
        company: "AICTE - EduSkills Virtual Internship",
        role: "Cloud Architect & Cybersecurity Intern",
        stipend: "₹18,000 / month",
        duration: "4 Months",
        location: "Virtual / Remote",
        matchScore: 87,
        skillsRequired: ["Cloud Basics", "Linux", "Networking"],
      },
    ],
    matchedJobs: [
      {
        company: "Centre for Development of Advanced Computing (C-DAC)",
        position: "Project Engineer - AI Systems",
        salary: "₹8.5 - 12 LPA",
        location: "Pune / Bengaluru",
        matchScore: 92,
        eligibility: "B.Tech/BE/MCA in CS, IT, ECE with relevant technical background",
      },
      {
        company: "Bharat Electronics Limited (BEL)",
        position: "Deputy Engineer - Digital Infrastructure",
        salary: "₹9.2 - 14 LPA",
        location: "Bengaluru / Hyderabad",
        matchScore: 89,
        eligibility: "Degree with minimum 60% aggregate and foundational domain skills",
      },
      {
        company: "National Health Authority (NHA)",
        position: "Assistant Technology Consultant (Ayushman Bharat)",
        salary: "₹7.5 - 11 LPA",
        location: "New Delhi",
        matchScore: 85,
        eligibility: "Graduate with proficiency in public digital platforms and APIs",
      },
    ],
  };
}

function getFallbackVoiceAnswer(query: string = "", language: string = "English") {
  const q = query.toLowerCase();
  if (q.includes("income") || q.includes("certificate")) {
    return {
      spokenText:
        "Here are the complete details for the Income Certificate. It verifies your household annual income and is issued by the Revenue Department within 7 to 15 working days.",
      category: "Service",
      title: "Income Certificate (Revenue Department)",
      eligibility:
        "Resident citizen of the respective state/district with proof of residence and source of income declaration.",
      documents: [
        "Aadhaar Card / Voter ID (Identity Proof)",
        "Ration Card or Smart Card (Residence Proof)",
        "Salary Slips or Form 16 / Bank Statement",
        "Self-Declaration Affidavit",
        "Recent Passport Size Photograph",
      ],
      officialFees: "₹50 - ₹60 (Statutory Service Charge only)",
      processingTime: "7 to 15 Working Days",
      officialWebsite: "https://services.india.gov.in",
      actionSteps: [
        "Check your uploaded identity proof in CitizenOne Document Vault",
        "Review pre-filled applicant information",
        "Proceed to official State e-Seva / National Portal for final biometric submission",
      ],
    };
  }

  if (q.includes("scholarship") || q.includes("study") || q.includes("student")) {
    return {
      spokenText:
        "I found the National Scholarship Portal (NSP) schemes for Pre-matric, Post-matric, and Top Class Higher Education. Applications are processed through direct benefit transfer.",
      category: "Scholarship",
      title: "National Scholarship Portal (NSP) Unified Schemes",
      eligibility:
        "Enrolled students in recognized schools/colleges with annual family income within prescribed limits (up to ₹2.5 Lakh to ₹8 Lakh depending on scheme).",
      documents: [
        "Student Aadhaar Card",
        "Income Certificate from Competent Authority",
        "Previous Academic Marksheet & Bonafide Certificate",
        "Bank Passbook linked to Aadhaar",
        "Fee Receipt of Current Academic Year",
      ],
      officialFees: "₹0 (Completely Free of Cost)",
      processingTime: "Disbursal as per academic cycle directly via DBT",
      officialWebsite: "https://scholarships.gov.in",
      actionSteps: [
        "Verify your DigiLocker academic records in CitizenOne Document Vault",
        "Select your scholarship tier (School, UG, PG, or Research)",
        "Submit on the official National Scholarship Portal",
      ],
    };
  }

  if (q.includes("pension") || q.includes("senior") || q.includes("vaya")) {
    return {
      spokenText:
        "For Senior Citizens, we have Atal Pension Yojana, Indira Gandhi National Old Age Pension, and Jeevan Pramaan digital life certificates accessible directly.",
      category: "Scheme",
      title: "National Social Assistance & Senior Pension Services",
      eligibility: "Indian citizens aged 60 years and above.",
      documents: [
        "Aadhaar Card with biometric authentication",
        "Bank Account details with Aadhaar seeding",
        "Age Proof Certificate / Birth Certificate",
        "Passport size photograph",
      ],
      officialFees: "₹0 (Free Government Benefit)",
      processingTime: "15-30 Working Days for pension verification",
      officialWebsite: "https://myscheme.gov.in",
      actionSteps: [
        "Check pension scheme eligibility in the Senior Citizen Portal",
        "Verify Aadhaar and bank seeding status",
        "Submit application on the official Ministry of Social Justice portal",
      ],
    };
  }

  return {
    spokenText: `Here is the relevant information for "${query}". You can access verified government guidelines, eligibility rules, and official links directly on CitizenOne AI.`,
    category: "Service",
    title: "Unified Citizen Public Service Directory",
    eligibility: "All eligible Indian citizens as defined by respective Ministry guidelines.",
    documents: ["Aadhaar Card", "Address Proof", "Relevant category or income certificates"],
    officialFees: "Government prescribed standard fee (if applicable)",
    processingTime: "7 to 21 Working Days depending on the service",
    officialWebsite: "https://services.india.gov.in",
    actionSteps: [
      "Select your relevant citizen portal category",
      "Verify required documents in Document Vault",
      "Proceed to verified official government portal",
    ],
  };
}

// Start Server with Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CitizenOne AI server running on port ${PORT}`);
  });
}

startServer();
