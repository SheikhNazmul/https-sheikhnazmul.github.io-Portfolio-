import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sheikh Nazmul Islam | AI Engineer, GenAI & FastAPI Developer",
  description:
    "Portfolio of Sheikh Nazmul Islam, Senior AI Engineer & GenAI Developer specializing in LLM systems, RAG pipelines, autonomous AI agents, FastAPI backends, and Python automation.",
  keywords: [
    "AI Engineer",
    "AI Developer",
    "Generative AI Developer",
    "LLM Developer",
    "RAG Developer",
    "AI Agent Developer",
    "Python AI Developer",
    "FastAPI Developer",
    "AI Automation Developer",
    "GenAI Freelancer",
    "AI Application Developer",
  ],
  authors: [{ name: "Sheikh Nazmul Islam" }],
  creator: "Sheikh Nazmul Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sheikhnazmul.github.io/portfolio/",
    title: "Sheikh Nazmul Islam | AI Engineer & GenAI Developer",
    description:
      "AI Engineering That Turns Ideas Into Working Products. Production LLM, RAG, AI Agents & FastAPI Systems.",
    siteName: "Sheikh Nazmul Islam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheikh Nazmul Islam | AI Engineer & GenAI Developer",
    description:
      "AI Engineering That Turns Ideas Into Working Products. Production LLM, RAG, AI Agents & FastAPI Systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sheikh Nazmul Islam",
    jobTitle: "AI Engineer & GenAI Developer",
    url: "https://sheikhnazmul.github.io/portfolio/",
    sameAs: [
      "https://github.com/SheikhNazmul",
      "https://linkedin.com/in/sheikh-nazmul-islam",
    ],
    knowsAbout: [
      "Python",
      "FastAPI",
      "Generative AI",
      "Large Language Models",
      "RAG Systems",
      "AI Agents",
      "LangChain",
      "PostgreSQL",
      "n8n Automation",
      "Machine Learning",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Analytics Placeholder: Render tracking script only when GA_MEASUREMENT_ID environment variable is configured */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
