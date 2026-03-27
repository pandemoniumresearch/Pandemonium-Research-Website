import { RepositoryProject } from "@/lib/types";

export const repositories: RepositoryProject[] = [
  {
    id: "devmonitor",
    name: "DevMonitor",
    description:
      "DevMonitor is a real-time developer dashboard that aggregates AI research, LLM leaderboards, and tech updates into a customizable drag-and-drop interface.",
    repositoryUrl: "https://github.com/Pandemonium-Research/DevMonitor",
    repositoryFullName: "Pandemonium-Research/DevMonitor",
    liveUrl: "https://devmonitor.vercel.app",
  },
  {
    id: "skilldex",
    name: "Skilldex",
    description:
      "A structured index for tracking and organizing skills, built for developers and researchers who want to map their technical knowledge systematically.",
    repositoryUrl: "https://github.com/Pandemonium-Research/Skilldex",
    repositoryFullName: "Pandemonium-Research/Skilldex",
    liveUrl: "https://skilldex-web.vercel.app",
  },
  {
    id: "stacked",
    name: "Stacked",
    description:
      "A modern tool for managing and visualizing stacked pull requests, making code review workflows faster and clearer.",
    liveUrl: "https://stacked-cm.vercel.app",
  },
];
