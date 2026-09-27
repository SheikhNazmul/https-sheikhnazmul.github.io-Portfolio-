# Sheikh Nazmul Islam - Professional AI Engineer Portfolio

A client-conversion and proof-of-work portfolio website for **Sheikh Nazmul Islam** (AI Engineer | GenAI Developer | LLM & RAG Engineer | AI Automation Developer).

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

---

## Technical Stack & Architecture

- **Framework**: Next.js 16 (App Router, Static Export `output: 'export'`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Dark-first engineering theme)
- **Icons**: Lucide React
- **Hosting Compatibility**: Hostinger (Static export HTML/CSS/JS or Node.js)

---

## Core Features

1. **Client-Conversion Hero**: High-impact messaging ("AI Engineering That Turns Ideas Into Working Products"), CTAs, terminal visual, and primary stack ticker.
2. **Proof-of-Work Strip**: Quick navigation across Live Projects, GitHub, APIs, AI Systems, Automation, and Videos.
3. **Selected Work Showcase**: Filterable project cards (All, AI / GenAI, LLM, RAG, AI Agents, Machine Learning, Backend, Automation) with problem/solution cards and case study links.
4. **Interactive Tech Stack Connection**: Clicking technologies (Python, FastAPI, RAG, AI Agents) immediately filters and highlights the exact projects built with that technology.
5. **Interactive System Architecture**: Visual step-by-step breakdown ("How I Build AI Systems") from Client to FastAPI, AI Agent reasoning, RAG vector retrieval, PostgreSQL persistence, and automation.
6. **API Engineering Showcase**: Interactive REST endpoint inspector featuring syntax highlighting and request/response payloads for `POST /api/v1/predict` and `POST /api/v1/rag/query`.
7. **Video Explanation System**: Reusable `VideoPlayer` modal component supporting YouTube, Vimeo, and direct MP4 embeds with automatic fallback ("Project explanation video coming soon").
8. **GitHub Integration**: Dynamic fetching of public repositories for `@SheikhNazmul` with fallback to core project repositories.
9. **Client Services**: Service cards covering AI App Dev, RAG Knowledge Base Search, Autonomous AI Agents, Workflow Automation, and FastAPI Backend Dev.
10. **7-Step Engineering Workflow**: Clear process from problem understanding to production deployment.
11. **Validated Contact Form**: Interactive inquiry form with project scope selection.

---

## Project Structure

```text
├── app/
│   ├── layout.tsx         # Root layout with SEO, OpenGraph, JSON-LD schema
│   ├── page.tsx           # Portfolio main page
│   ├── globals.css        # Tailwind v4 dark theme styles
│   ├── robots.ts          # Search engine crawler directives
│   ├── sitemap.ts         # Dynamic SEO sitemap
│   └── projects/[slug]/   # Case study detail page
├── components/
│   ├── Navbar.tsx         # Navigation header & mobile drawer
│   ├── Hero.tsx           # Hero section & code terminal visual
│   ├── ProofOfWorkStrip.tsx # Proof of work navigation strip
│   ├── ProjectCard.tsx    # Project card component
│   ├── ProjectShowcase.tsx # Project showcase & filter tabs
│   ├── VideoPlayer.tsx    # Reusable video player & modal component
│   ├── TechStackSection.tsx # Tech stack with proof project connections
│   ├── ArchitectureSection.tsx # Interactive system diagram
│   ├── ApiShowcase.tsx    # Interactive REST API viewer
│   ├── GitHubSection.tsx  # GitHub public repository fetcher
│   ├── ServicesSection.tsx # Client-focused engineering services
│   ├── WorkflowSection.tsx # 7-step engineering process
│   ├── AboutSection.tsx   # Engineering about section
│   ├── ContactSection.tsx # Project inquiry form
│   └── Footer.tsx         # Footer with quick links
├── lib/
│   ├── types.ts           # TypeScript models & interfaces
│   └── projects.ts        # Centralized project data source
├── public/
│   └── .htaccess          # Hostinger Apache rewrite rules
├── HOSTINGER_DEPLOYMENT.md# Complete Hostinger deployment guide
├── PROJECTS.md            # Content management guide for projects & videos
└── package.json
```

---

## Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build Production Files**:
   ```bash
   npm run build
   ```
   Generates static output in the `out/` folder ready for Hostinger deployment.

---

## License & Copyright

© Sheikh Nazmul Islam. All rights reserved.
