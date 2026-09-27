export type ProjectCategory = 
  | 'All'
  | 'AI / GenAI'
  | 'LLM'
  | 'RAG'
  | 'AI Agents'
  | 'Machine Learning'
  | 'Backend'
  | 'Automation';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory[];
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  apiUrl?: string;
  documentationUrl?: string;
  screenshots: string[];
  architectureDiagram?: string;
  architectureSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
  status: 'Live Production' | 'Functional Demo' | 'Development Preview';
  featured: boolean;
  challenges?: string[];
  futureImprovements?: string[];
}

export interface Technology {
  id: string;
  name: string;
  category: 'AI / GenAI' | 'Backend' | 'Database' | 'Automation' | 'Machine Learning' | 'Developer Tools';
  description: string;
  associatedProjectIds: string[];
  isPrimary?: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  whatIBuild: string;
  technologies: string[];
  typicalDeliverable: string;
}

export interface ArchitectureNode {
  id: string;
  stepNumber: string;
  label: string;
  sublabel: string;
  tech: string;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  title: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestPayload?: string;
  responsePayload: string;
  swaggerUrl?: string;
  postmanUrl?: string;
  githubUrl?: string;
}
