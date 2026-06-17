import {
  Anchor,
  Droplets,
  GraduationCap,
  Hammer,
  Sprout,
  Users,
} from 'lucide-react';
import conservationSeed from './conservation.json';

const STORAGE_KEY = 'lostcompass_conservation_v1';
export const CONSERVATION_PROJECT_URL = 'https://thelostcompassproject.org';

const visualsById = {
  'trail-maintenance': {
    icon: Hammer,
    image: '/assets/images/trail-crew.jpeg',
  },
  'habitat-restoration': {
    icon: Sprout,
    image: '/assets/images/forest-trail.jpeg',
  },
  'river-cleanup': {
    icon: Droplets,
    image: '/assets/images/coastal-overlook.jpeg',
  },
  'reef-restoration': {
    icon: Anchor,
    image: '/assets/images/reef-restoration.jpeg',
  },
  'outdoor-education': {
    icon: GraduationCap,
    image: '/assets/images/field-notes.jpeg',
  },
  'volunteer-support': {
    icon: Users,
    image: '/assets/images/hikers-golden-ridge.jpeg',
  },
};

function toSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeConservationItem(item) {
  const slug = item.slug || item.id || toSlug(item.cardTitle || item.detailTitle);
  const id = item.id || slug;
  // TODO: These card paths are temporary local detail pages. When the .org
  // conservation pages are built, link cards to:
  // https://thelostcompassproject.org/[trail-maintenance|habitat-restoration|river-cleanup|reef-restoration|outdoor-education|volunteer-support]
  const path = item.path || `/conservation/${slug}`;

  return {
    id,
    slug,
    path,
    cardTitle: item.cardTitle || item.title || 'Conservation Area',
    cardSubtitle: item.cardSubtitle || '',
    cardCategory: item.cardCategory || item.cardSubtitle || '',
    cardDescription: item.cardDescription || item.text || '',
    detailTitle: item.detailTitle || item.cardTitle || item.title || 'Conservation Area',
    detailIntro: item.detailIntro || 'Coming soon.',
    organizationNotes: item.organizationNotes || 'Coming soon.',
    donationNotes: item.donationNotes || 'Coming soon.',
    fieldUpdates: item.fieldUpdates || 'Coming soon.',
  };
}

export const defaultConservationItems = conservationSeed.items.map((item) => normalizeConservationItem(item));

export function loadConservationItems() {
  if (typeof window === 'undefined') {
    return defaultConservationItems;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultConservationItems;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return defaultConservationItems;
    }

    const storedById = new Map(parsed.map((item) => [item.id, normalizeConservationItem(item)]));
    const merged = defaultConservationItems.map((item) => storedById.get(item.id) || item);
    const extraItems = parsed
      .map((item) => normalizeConservationItem(item))
      .filter((item) => !defaultConservationItems.some((defaultItem) => defaultItem.id === item.id));

    return [...merged, ...extraItems];
  } catch (error) {
    console.error('Unable to load conservation records:', error);
    return defaultConservationItems;
  }
}

export function saveConservationItems(items) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items.map((item) => normalizeConservationItem(item))),
  );
}

export function clearStoredConservationItems() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function getConservationCard(item) {
  const visuals = visualsById[item.id] || {};

  return {
    title: item.cardTitle,
    text: item.cardDescription,
    path: item.path,
    icon: visuals.icon || Sprout,
    image: visuals.image,
  };
}
