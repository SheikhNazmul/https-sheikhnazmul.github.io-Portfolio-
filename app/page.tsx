import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofOfWorkStrip from "@/components/ProofOfWorkStrip";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechStackSection from "@/components/TechStackSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ApiShowcase from "@/components/ApiShowcase";
import ServicesSection from "@/components/ServicesSection";
import WorkflowSection from "@/components/WorkflowSection";
import GitHubSection from "@/components/GitHubSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 relative">
      <Navbar />
      <Hero />
      <ProofOfWorkStrip />
      <ProjectShowcase />
      <TechStackSection />
      <ArchitectureSection />
      <ApiShowcase />
      <ServicesSection />
      <WorkflowSection />
      <GitHubSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
