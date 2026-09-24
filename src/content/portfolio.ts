/**
 * Portfolio content is intentionally separate from the scene and interface.
 * Replace these placeholders as the islands and their drawers arrive in later phases.
 */
export type PortfolioCategory = 'resume' | 'projects' | 'writing' | 'media'

export interface ResumeEntry {
  id: string
  role: string
  organisation: string
  period: string
  summary: string
}

export interface ProjectEntry {
  id: string
  title: string
  summary: string
  year: number
  link?: string
}

export interface WritingEntry {
  id: string
  title: string
  publication: string
  year: number
  excerpt: string
  link?: string
}

export interface MediaEntry {
  id: string
  label: string
  url: string
  kind: 'image' | 'video' | 'audio' | 'document'
}

export interface PortfolioContent {
  resume: ResumeEntry[]
  projects: ProjectEntry[]
  writing: WritingEntry[]
  media: MediaEntry[]
}

export const portfolioContent: PortfolioContent = {
  resume: [
    {
      id: 'resume-01',
      role: 'Creative technologist',
      organisation: 'Independent practice',
      period: '2024 — present',
      summary: 'Placeholder for a role, practice, or collaboration.',
    },
  ],
  projects: [
    {
      id: 'project-01',
      title: 'A small digital shoreline',
      summary: 'Placeholder for a project log and its short field note.',
      year: 2025,
      link: '#',
    },
  ],
  writing: [
    {
      id: 'writing-01',
      title: 'Notes from the weather line',
      publication: 'Personal notebook',
      year: 2025,
      excerpt: 'Placeholder for a writing sample excerpt.',
      link: '#',
    },
  ],
  media: [
    {
      id: 'media-01',
      label: 'Portfolio media placeholder',
      url: '#',
      kind: 'image',
    },
  ],
}
