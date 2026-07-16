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
  /** SEO-optimised meta description (~150 chars, sentence case). Falls back to basicDescription. */
  seoDescription?: string;
  /** JSON-LD schema type: 'SoftwareApplication' | 'CreativeWork' */
  schemaType?: 'SoftwareApplication' | 'CreativeWork';
};

export const currentProject: Project = projectsData.currentProject as Project;

export const projects: Project[] = projectsData.projects as Project[];
