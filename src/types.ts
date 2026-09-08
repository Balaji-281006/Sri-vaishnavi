export type SupportedLanguage =
  | "en"
  | "ta"
  | "hi"
  | "te"
  | "kn"
  | "ml"
  | "bn"
  | "mr"
  | "gu"
  | "pa"
  | "or"
  | "as";

export type UserRole = "citizen" | "senior" | "student" | "jobseeker";

export type AppScreen =
  | "splash"
  | "language-select"
  | "role-select"
  | "auth-register"
  | "otp-verify"
  | "onboarding-about"
  | "guided-category"
  | "citizen-portal"
  | "senior-portal"
  | "student-portal"
  | "jobseeker-portal"
  | "document-vault"
  | "application-tracking";

export interface UserProfile {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  dob: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  state: string;
  district: string;
  fullAddress: string;
  qualification: string;
  occupation: string;
  username: string;
  role: UserRole;
  isVerified: boolean;
  mobileVerified: boolean;
  emailVerified: boolean;
  registeredAt: string;
  resumeUploaded?: boolean;
  resumeFileName?: string;
}

export interface GovernmentService {
  id: string;
  title: string;
  category: "Certificates" | "Identity Services" | "Citizen Services";
  description: string;
  department: string;
  eligibility: string[];
  documentsRequired: string[];
  officialFees: string;
  processingTime: string;
  instructions: string[];
  officialWebsite: string;
  badge?: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  category:
    | "Women"
    | "Children"
    | "Students"
    | "Farmers"
    | "Senior Citizens"
    | "Healthcare"
    | "Housing"
    | "Employment"
    | "Entrepreneurship"
    | "Social Welfare"
    | "Education";
  ministry: string;
  benefits: string;
  eligibility: string[];
  documentsRequired: string[];
  lastDate: string;
  officialWebsite: string;
  tags: string[];
  forRoles: UserRole[];
}

export interface ScholarshipItem {
  id: string;
  title: string;
  category:
    | "School Students"
    | "UG Students"
    | "PG Students"
    | "Research Scholars"
    | "Women Scholarships"
    | "Minority Scholarships"
    | "Merit Scholarships"
    | "State Scholarships";
  amount: string;
  eligibility: string[];
  requiredDocuments: string[];
  lastDate: string;
  applicationProcess: string[];
  officialWebsite: string;
  provider: string;
}

export interface InternshipItem {
  id: string;
  companyName: string;
  role: string;
  stipend: string;
  duration: string;
  location: string;
  skillsRequired: string[];
  officialWebsite: string;
  deadline: string;
  openings: number;
  type: "GovTech / PSU" | "Research" | "Corporate / Startup";
}

export interface JobItem {
  id: string;
  companyName: string;
  position: string;
  salary: string;
  location: string;
  eligibility: string;
  skillsRequired: string[];
  officialWebsite: string;
  lastDate: string;
  vacancies: number;
  type: "Central Govt / PSU" | "State Govt" | "Autonomous Tech";
}

export interface CourseRecommendation {
  name: string;
  provider?: string;
  duration?: string;
  level?: string;
}

export interface ResumeAnalysisResult {
  candidateName?: string;
  candidateEmail?: string;
  candidatePhone?: string;
  skillsIdentified: string[];
  skillsFound?: string[];
  strengths: string[];
  weaknesses: string[];
  atsScore: number;
  summary: string;
  missingSkills: string[];
  recommendedCourses: Array<string | CourseRecommendation>;
  eligibleOpportunitiesCount?: number;
  matchedInternships?: Array<{
    company: string;
    role: string;
    stipend: string;
    duration: string;
    location: string;
    matchScore: number;
    skillsRequired: string[];
  }>;
  matchedJobs?: Array<{
    company: string;
    position: string;
    salary: string;
    location: string;
    matchScore: number;
    eligibility: string;
  }>;
}

export interface VaultDocument {
  id: string;
  title: string;
  type: "Aadhaar" | "PAN" | "Certificates" | "Academic Documents" | "Resume";
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  isDigiLockerVerified: boolean;
  documentNumber?: string;
  url?: string;
}

export interface ApplicationRecord {
  id: string;
  type: "Service" | "Scheme" | "Scholarship" | "Internship" | "Job";
  title: string;
  departmentOrOrg: string;
  appliedDate: string;
  applicationRefNumber: string;
  status: "Applied" | "Under Verification" | "Approved" | "Rejected" | "Submitted" | "Action Required" | "Disbursed";
  officialWebsite: string;
  timeline: Array<{
    step: string;
    date: string;
    done: boolean;
  }>;
  officialFees: string;
}
