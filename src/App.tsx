import React, { useState } from "react";
import {
  AppScreen,
  SupportedLanguage,
  UserRole,
  UserProfile,
  GovernmentService,
  GovernmentScheme,
  ScholarshipItem,
  ResumeAnalysisResult,
  VaultDocument,
  ApplicationRecord,
} from "./types";
import {
  INITIAL_VAULT_DOCUMENTS,
  INITIAL_APPLICATIONS,
} from "./data/governmentData";
import { SplashScreen } from "./components/SplashScreen";
import { LanguageSelection } from "./components/LanguageSelection";
import { RoleSelection } from "./components/RoleSelection";
import { AuthModal } from "./components/AuthModal";
import { OtpVerification } from "./components/OtpVerification";
import { OnboardingAbout } from "./components/OnboardingAbout";
import { Header } from "./components/Header";
import { CategoryNav } from "./components/CategoryNav";
import { CitizenPortal } from "./components/CitizenPortal";
import { SeniorPortal } from "./components/SeniorPortal";
import { StudentPortal } from "./components/StudentPortal";
import { JobSeekerPortal } from "./components/JobSeekerPortal";
import { DocumentVaultView } from "./components/DocumentVaultView";
import { ApplicationTrackingView } from "./components/ApplicationTrackingView";
import { ServiceModal } from "./components/ServiceModal";
import { SchemeModal } from "./components/SchemeModal";
import { ScholarshipModal } from "./components/ScholarshipModal";
import { VoiceAssistant } from "./components/VoiceAssistant";
import { Footer } from "./components/Footer";

export default function App() {
  // Navigation & Screen Flow State
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash");
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>("en");
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");

  // User Profile & Authentication State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [pendingProfile, setPendingProfile] = useState<UserProfile | null>(null);

  // Accessibility State
  const [largeFont, setLargeFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Modals & Selected Items
  const [activeService, setActiveService] = useState<GovernmentService | null>(null);
  const [activeScheme, setActiveScheme] = useState<GovernmentScheme | null>(null);
  const [activeScholarship, setActiveScholarship] = useState<ScholarshipItem | null>(null);

  // User Data State (Vault & Applications)
  const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>(INITIAL_VAULT_DOCUMENTS);
  const [applications, setApplications] = useState<ApplicationRecord[]>(INITIAL_APPLICATIONS);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult | null>(null);

  // Navigation Handlers
  const handleSplashComplete = () => {
    setCurrentScreen("language-select");
  };

  const handleLanguageContinue = () => {
    setCurrentScreen("role-select");
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentScreen("auth-register");
  };

  const handleAuthSubmit = (profile: UserProfile) => {
    setPendingProfile(profile);
    setCurrentScreen("otp-verify");
  };

  const handleOtpVerified = () => {
    if (pendingProfile) {
      const verifiedProfile: UserProfile = {
        ...pendingProfile,
        isVerified: true,
        mobileVerified: true,
        emailVerified: true,
      };
      setUserProfile(verifiedProfile);
      setSelectedRole(verifiedProfile.role);
      setCurrentScreen("onboarding-about");
    } else {
      setCurrentScreen("guided-category");
    }
  };

  const handleEnterPlatform = () => {
    // Navigate based on user role or guided category
    if (selectedRole === "senior") {
      setCurrentScreen("senior-portal");
    } else if (selectedRole === "student") {
      setCurrentScreen("student-portal");
    } else if (selectedRole === "jobseeker") {
      setCurrentScreen("jobseeker-portal");
    } else if (selectedRole === "citizen") {
      setCurrentScreen("citizen-portal");
    } else {
      setCurrentScreen("guided-category");
    }
  };

  // Application Tracking additions
  const handleTrackNewApplication = (
    title: string,
    dept: string,
    fee: string,
    portalUrl: string
  ) => {
    const newRecord: ApplicationRecord = {
      id: "app-" + Date.now(),
      type: "Service",
      title,
      departmentOrOrg: dept,
      appliedDate: new Date().toISOString().split("T")[0],
      applicationRefNumber: `C1-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "Applied",
      officialWebsite: portalUrl,
      officialFees: fee,
      timeline: [
        {
          step: "Application Initiated from CitizenOne AI",
          date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          done: true,
        },
        {
          step: "Transferred to Official Ministry Portal",
          date: "Redirected",
          done: true,
        },
        {
          step: "Departmental Scrutiny & Field Report",
          date: "Pending Verification",
          done: false,
        },
      ],
    };

    setApplications((prev) => [newRecord, ...prev]);
  };

  const handleSignOut = () => {
    setUserProfile(null);
    setPendingProfile(null);
    setCurrentScreen("role-select");
  };

  // Render Splash Screen
  if (currentScreen === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Render Language Selection
  if (currentScreen === "language-select") {
    return (
      <LanguageSelection
        currentLanguage={currentLanguage}
        onSelectLanguage={(lang) => setCurrentLanguage(lang)}
        onContinue={handleLanguageContinue}
      />
    );
  }

  // Render Role Selection
  if (currentScreen === "role-select") {
    return (
      <RoleSelection
        currentLanguage={currentLanguage}
        onSelectRole={handleRoleSelect}
      />
    );
  }

  // Render Auth Registration / Sign In Form
  if (currentScreen === "auth-register") {
    return (
      <AuthModal
        currentLanguage={currentLanguage}
        selectedRole={selectedRole}
        onSubmitSuccess={handleAuthSubmit}
        onBackToRoles={() => setCurrentScreen("role-select")}
      />
    );
  }

  // Render Mandatory OTP Verification (Mobile & Email OTP)
  if (currentScreen === "otp-verify") {
    return (
      <OtpVerification
        currentLanguage={currentLanguage}
        mobileNumber={pendingProfile?.mobile || "+91 98765 43210"}
        emailAddress={pendingProfile?.email || "citizen@digitalindia.gov.in"}
        userRole={pendingProfile?.role || selectedRole}
        onVerificationSuccess={handleOtpVerified}
        onBack={() => setCurrentScreen("auth-register")}
      />
    );
  }

  // Render Onboarding Cards (About CitizenOne AI)
  if (currentScreen === "onboarding-about") {
    return (
      <OnboardingAbout
        currentLanguage={currentLanguage}
        onEnterPlatform={handleEnterPlatform}
      />
    );
  }

  // Main Authenticated Platform Experience
  return (
    <div
      className={`min-h-screen flex flex-col ${
        highContrast
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      } ${largeFont ? "text-lg" : "text-sm"}`}
    >
      {/* Top Header with Accessibility, Multilingual switch, and Navigation */}
      <Header
        currentLanguage={currentLanguage}
        currentScreen={currentScreen}
        userRole={selectedRole}
        userProfile={userProfile}
        highContrast={highContrast}
        largeFont={largeFont}
        onLanguageChange={(lang) => setCurrentLanguage(lang)}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        onToggleLargeFont={() => setLargeFont(!largeFont)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Guided Category Selection */}
        {currentScreen === "guided-category" && (
          <CategoryNav
            currentLanguage={currentLanguage}
            onSelectCategory={(screen) => setCurrentScreen(screen)}
            onSelectService={(service) => setActiveService(service)}
            onSelectScheme={(scheme) => setActiveScheme(scheme)}
          />
        )}

        {/* Citizen Portal */}
        {currentScreen === "citizen-portal" && (
          <CitizenPortal
            currentLanguage={currentLanguage}
            onSelectService={(service) => setActiveService(service)}
            onSelectScheme={(scheme) => setActiveScheme(scheme)}
          />
        )}

        {/* Senior Citizen Portal */}
        {currentScreen === "senior-portal" && (
          <SeniorPortal
            currentLanguage={currentLanguage}
            userProfile={userProfile}
            onQuickSeniorLogin={(seniorProf) => {
              setUserProfile(seniorProf);
              setSelectedRole("senior");
            }}
            onOpenSeniorAuth={() => {
              setSelectedRole("senior");
              setCurrentScreen("auth-register");
            }}
            onSelectService={(service) => setActiveService(service)}
            onSelectScheme={(scheme) => setActiveScheme(scheme)}
            onNavigateToTracking={() => setCurrentScreen("application-tracking")}
          />
        )}

        {/* Student Portal */}
        {currentScreen === "student-portal" && (
          <StudentPortal
            currentLanguage={currentLanguage}
            resumeAnalysis={resumeAnalysis}
            onResumeAnalysisComplete={(result) => setResumeAnalysis(result)}
            onSelectScholarship={(item) => setActiveScholarship(item)}
            onSelectScheme={(scheme) => setActiveScheme(scheme)}
            onTrackApplication={handleTrackNewApplication}
          />
        )}

        {/* Job Seeker & Professional Portal */}
        {currentScreen === "jobseeker-portal" && (
          <JobSeekerPortal
            currentLanguage={currentLanguage}
            resumeAnalysis={resumeAnalysis}
            onResumeAnalysisComplete={(result) => setResumeAnalysis(result)}
            onSelectService={(service) => setActiveService(service)}
            onSelectScheme={(scheme) => setActiveScheme(scheme)}
            onTrackApplication={handleTrackNewApplication}
          />
        )}

        {/* Document Vault (DigiLocker Inspired) */}
        {currentScreen === "document-vault" && (
          <DocumentVaultView
            documents={vaultDocs}
            currentLanguage={currentLanguage}
            onUploadDocument={(newDoc) => setVaultDocs((prev) => [newDoc, ...prev])}
            onDeleteDocument={(id) =>
              setVaultDocs((prev) => prev.filter((d) => d.id !== id))
            }
          />
        )}

        {/* Application Tracking */}
        {currentScreen === "application-tracking" && (
          <ApplicationTrackingView
            applications={applications}
            currentLanguage={currentLanguage}
          />
        )}
      </main>

      {/* Floating Multilingual AI Voice Assistant */}
      <VoiceAssistant
        currentLanguage={currentLanguage}
        userRole={selectedRole}
        onNavigateTo={(screen) => setCurrentScreen(screen as AppScreen)}
      />

      {/* Modals */}
      <ServiceModal
        service={activeService}
        userProfile={userProfile}
        vaultDocs={vaultDocs}
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        onTrackApplication={handleTrackNewApplication}
      />

      <SchemeModal
        scheme={activeScheme}
        userProfile={userProfile}
        isOpen={!!activeScheme}
        onClose={() => setActiveScheme(null)}
        onTrackApplication={handleTrackNewApplication}
      />

      <ScholarshipModal
        scholarship={activeScholarship}
        userProfile={userProfile}
        isOpen={!!activeScholarship}
        onClose={() => setActiveScholarship(null)}
        onTrackApplication={handleTrackNewApplication}
      />

      {/* Government-Grade Footer */}
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}
