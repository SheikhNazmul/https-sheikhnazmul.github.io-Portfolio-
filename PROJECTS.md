# Content & Project Management Guide

All portfolio content is central to `lib/projects.ts`. You do NOT need to modify UI components to add or update projects.

---

## How to Add a New Project

Open `lib/projects.ts` and add a new entry to the `PROJECTS` array:

```typescript
{
  id: "my-new-ai-project",
  title: "Custom AI Agent System",
  slug: "my-new-ai-project",
  category: ["AI Agents", "LLM", "Backend"],
  description: "Short high-level overview of what the system achieves.",
  problem: "The technical or business problem solved.",
  solution: "How the architecture solves the problem.",
  technologies: ["Python", "FastAPI", "OpenAI", "PostgreSQL"],
  features: [
    "Feature 1 description",
    "Feature 2 description"
  ],
  liveUrl: "https://your-live-demo.com", // Or leave undefined
  githubUrl: "https://github.com/SheikhNazmul/repo-name",
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // Optional YouTube/Vimeo link
  videoThumbnail: "https://images.unsplash.com/...", // Optional thumbnail
  videoDuration: "04:15",
  status: "Live Production", // "Live Production" | "Functional Demo" | "Development Preview"
  featured: true,
  screenshots: []
}
```

---

## Updating Video Explanation Links
When you record a YouTube breakdown video for a project:
1. Locate the project in `lib/projects.ts`.
2. Add or update `videoUrl: "https://www.youtube.com/watch?v=..."`.
3. Save and run `npm run build`.

If `videoUrl` is missing, the website automatically displays:
*"Project explanation video coming soon"* instead of rendering a broken player.

---

## Updating Live Demo & GitHub URLs
- `liveUrl`: Set to your live deployment link. If undefined, the UI displays *"Deployment coming soon"* instead of a broken link.
- `githubUrl`: Set to your public GitHub repository URL.
