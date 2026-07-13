import projectsData from './content/projects.json';



export type Project = {
  num: string;
  slug: string;
  title: string;
  basicDescription: string;
  mainDescription: string;
  problemStatement?: string;
  technologies: string[];
  keyFeatures?: string[];
  futureScopes?: string;
  imagePaths?: string[];
  github?: string;
  marker?: string;
};

export const currentProject: Project = projectsData.currentProject as Project;

export const projects: Project[] = projectsData.projects as Project[];
