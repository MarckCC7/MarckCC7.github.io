/**
 * Content contracts for the whole garden.
 *
 * Every file in `src/data/` is typed against these shapes. If you add a field
 * here the compiler will walk you through every place that must be updated —
 * that is the point. Content is data, never markup.
 */

/* ── Shared ─────────────────────────────────────────────────────────────── */

/** ISO-8601 date, `YYYY-MM-DD`. Always absolute, never relative. */
export type IsoDate = string;

export interface ExternalLink {
  label: string;
  href: string;
  /** Renders the "opens in a new tab" affordance. Defaults to true for http(s). */
  external?: boolean;
}

/* ── Projects ───────────────────────────────────────────────────────────── */

/**
 * A project's life stage. The garden metaphor is not decoration: the stage
 * drives the plant's height, leaf count and glow in `/garden`.
 */
export type ProjectStage = 'idea' | 'research' | 'building' | 'prototype' | 'shipped';

export interface Project {
  /** URL segment. Stable forever — changing it breaks inbound links. */
  slug: string;
  title: string;
  /** One line. Shown on the card. Aim for < 90 characters. */
  tagline: string;
  /** The problem in the real world. Two or three sentences. */
  problem: string;
  /** How the software answers it. */
  approach: string;
  stage: ProjectStage;
  year: number;
  /** Free-form technology labels; no need to exist in `stack.ts`. */
  stack: string[];
  /** Bullet points of what makes it non-obvious. Optional. */
  highlights?: string[];
  links?: ExternalLink[];
  /** Pin to the top of listings and grow taller in the garden. */
  featured?: boolean;
  /** Two-character glyph rendered in the card's pixel plate. */
  glyph: string;
}

/* ── Stack ──────────────────────────────────────────────────────────────── */

export type StackCategory = 'languages' | 'frontend' | 'gamedev' | 'tools';

/**
 * Honest self-assessment, 1–5.
 * 1 exploring · 2 learning · 3 comfortable · 4 confident · 5 fluent
 */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface StackItem {
  name: string;
  category: StackCategory;
  level: SkillLevel;
  /** Why it is in the toolbox — one sentence, first person. */
  note: string;
  /** Hover glow colour. Any CSS colour. */
  accent: string;
  /**
   * 1–3 character monogram rendered in the pixel font.
   *
   * Deliberately not a brand logo: monograms sidestep trademark questions,
   * stay legible at 24px, and match the RPG detailing. A wall of official
   * logos is the single most generic thing a developer portfolio can do.
   */
  mark: string;
}

/* ── Roadmap ────────────────────────────────────────────────────────────── */

export type RoadmapStatus = 'done' | 'active' | 'next';

/** Icon ids resolved by `<RoadmapIcon />`. Add new ones there, not here. */
export type RoadmapIconId = 'seed' | 'frontend' | 'backend' | 'cloud' | 'devops' | 'ai' | 'startup';

export interface RoadmapNode {
  id: string;
  /** Stage name: Semilla, Frontend, Backend… */
  title: string;
  /** What "done" means at this stage. */
  description: string;
  status: RoadmapStatus;
  icon: RoadmapIconId;
  /** Skills that make up this branch. */
  branches: string[];
  /** Rough horizon, e.g. "2026" or "2027 – 2028". */
  horizon: string;
}

/* ── Experience ─────────────────────────────────────────────────────────── */

export interface ExperienceEntry {
  id: string;
  role: string;
  organisation: string;
  /** Displayed verbatim, e.g. "2025" or "2024 – 2025". */
  period: string;
  /** What the job actually was, in one or two sentences. */
  summary: string;
  /**
   * Transferable skills the role built. Kept separate from `summary` so the
   * card can show them as chips — recruiters scan these before they read.
   */
  skills: string[];
}

/* ── Certificates ───────────────────────────────────────────────────────── */

export type CertificateKind = 'certification' | 'course' | 'award' | 'event';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Displayed verbatim, e.g. "2026" or "Marzo 2026". */
  period: string;
  kind: CertificateKind;
  description: string;
  /** Optional standout line: "Tercer puesto", "Top 10%"… */
  badge?: string;
  credentialUrl?: string;
}

/* ── Garden Updates ─────────────────────────────────────────────────────── */

export type UpdateKind = 'event' | 'hackathon' | 'launch' | 'milestone' | 'note';

export interface GardenUpdate {
  slug: string;
  title: string;
  date: IsoDate;
  kind: UpdateKind;
  /** Card summary. One or two sentences. */
  excerpt: string;
  /**
   * Body copy, one string per paragraph. A string starting with `## ` becomes
   * a subheading, `- ` becomes a list item. That is the whole "format" — no CMS,
   * no markdown dependency.
   */
  body: string[];
  /** Images live in `public/updates/`. Reference them as `/updates/name.jpg`. */
  images?: { src: string; alt: string; caption?: string }[];
  tags?: string[];
  links?: ExternalLink[];
}

/* ── Profile & navigation ───────────────────────────────────────────────── */

/** Brand marks drawn by `<BrandIcon />`. */
export type BrandIconId = 'github' | 'linkedin' | 'instagram' | 'mail';

export interface SocialLink {
  id: BrandIconId;
  label: string;
  handle: string;
  href: string;
}

export interface NavItem {
  label: string;
  /** Route path, or `/#section-id` for an in-page anchor. */
  href: string;
}
