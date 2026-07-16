import { MetadataRoute } from 'next';
import projectsData from '@/data/content/projects.json';

// Fixed reference date — update manually when content meaningfully changes.
// Avoids marking every page as "modified now" on each deploy.
const SITE_UPDATED = new Date('2026-07-16');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://christophermathai.vercel.app';

  const allProjects = [
    projectsData.currentProject,
    ...projectsData.projects,
  ];

  const projectSlugEntries: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: SITE_UPDATED,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectSlugEntries,
  ];
}
