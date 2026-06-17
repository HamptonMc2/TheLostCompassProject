export const STORY_STORAGE_KEY = 'lostcompass_story_manager_v1';
import portalStoriesSeed from './portal-stories.json';

const seededPortalStories = Array.isArray(portalStoriesSeed?.stories) ? portalStoriesSeed.stories : [];

export const storyStatuses = [
  'Draft / Human Review Required',
  'Human Review',
  'Published',
];

export const researchPriorities = ['Low', 'Medium', 'High'];

export const researchItemStatuses = [
  'Needed',
  'In Progress',
  'Verified',
  'Not Found',
  'Not Applicable',
];

export const imagePathInstructions = 'Place images in website/public/assets/images/stories/[story-slug]/ and reference them as /assets/images/stories/[story-slug]/filename.webp';

export const baseInterviewQuestions = [
  {
    id: 'base-interview-connection',
    question: 'What is your connection to this place or story?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-local-memory',
    question: 'What do you remember hearing about this place from family, neighbors, or local people?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-active-place',
    question: 'What was this place like when it was active or more commonly visited?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-people',
    question: 'Who lived, worked, traveled, or gathered here?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-landmarks',
    question: 'Are there any landmarks, buildings, trails, rail lines, roads, creeks, or natural features people should know about?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-changes',
    question: 'What changed over time that caused the place to become quieter, abandoned, forgotten, or harder to reach?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-overlooked',
    question: 'Are there any stories, names, dates, events, or local traditions that are often overlooked?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-visitor-understanding',
    question: 'What should visitors understand before going there?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-leave-wild',
    question: 'What should people avoid doing so the place is respected and left wild?',
    notes: '',
    required: true,
  },
  {
    id: 'base-interview-referrals',
    question: 'Is there anyone else you recommend speaking with, or any books, records, maps, photos, or archives worth checking?',
    notes: '',
    required: true,
  },
  {
    id: 'followup-interview-quote-permission',
    question: 'Can I quote you by name, anonymously, or not at all?',
    notes: '',
    required: false,
  },
  {
    id: 'followup-interview-records',
    question: 'Do you have any photos, maps, documents, or family records that may help verify the story?',
    notes: '',
    required: false,
  },
  {
    id: 'followup-interview-common-errors',
    question: 'Is there anything people commonly get wrong about this place?',
    notes: '',
    required: false,
  },
];

const handWrittenStories = [
  {
    id: 'lost-cove-forgotten-mountain-town',
    title: 'Lost Cove: The Forgotten Mountain Town Between Tennessee and North Carolina',
    slug: 'lost-cove-forgotten-mountain-town',
    subtitle: 'A draft field-journal framework for a future researched story about Lost Cove near Erwin, Tennessee and the North Carolina border area.',
    category: 'Forgotten Places',
    secondaryCategories: ['Local History', 'Trail Stories'],
    location: 'Lost Cove area near Erwin, Tennessee / North Carolina border region',
    status: 'Draft / Human Review Required',
    heroImage: '/assets/images/stories/lost-cove-forgotten-mountain-town/lost-cove-hero-placeholder.webp',
    heroImageAlt: 'Research-needed placeholder image for Lost Cove trail and mountain landscape',
    excerpt: 'A respectful draft framework for a future Lost Compass story about a hard-to-reach mountain place, the routes around it, and why forgotten places deserve careful attention.',
    sections: [
      {
        id: 'lost-cove-section-intro',
        heading: 'Short Intro: Why Lost Cove Fits The Lost Compass Project',
        body: 'Lost Cove fits The Lost Compass Project because it sits at the edge of exploration, local memory, and responsibility. This draft should become a researched story about a mountain community and the landscape around it, written with care for the people, families, trails, and remaining traces connected to the place.\n\nResearch needed before publication: confirm exact location language, historical timeline, access guidance, and any preservation or ownership considerations.',
        imagePath: '',
        imageAlt: '',
        imageCaption: '',
      },
      {
        id: 'lost-cove-section-hard-to-reach',
        heading: 'A Place That Became Hard To Reach',
        body: 'Placeholder draft: describe the feeling of approaching Lost Cove as a place that is no longer part of everyday travel. Keep this section grounded in verified trail access notes, current route conditions, land-management guidance, and respectful language about private or protected areas.\n\nResearch needed: verify current public access routes, trail names, seasonal considerations, safety concerns, and whether any areas should be avoided.',
        imagePath: '',
        imageAlt: '',
        imageCaption: '',
      },
      {
        id: 'lost-cove-section-railroad-river-mountain',
        heading: 'Railroad, River, and Mountain Life',
        body: 'Placeholder draft: this section should explain the relationship between the surrounding mountains, river corridor, railroad history, and daily life only after sources are checked. Do not add dates, railroad names, population numbers, ownership details, or causes of decline until verified.\n\nResearch needed: confirm railroad details, community timeline, family names only if appropriate and sourced, economic context, school/church/post office history if applicable, and what can be responsibly shared.',
        imagePath: '',
        imageAlt: '',
        imageCaption: '',
      },
      {
        id: 'lost-cove-section-hike-remains',
        heading: 'The Hike Into What Remains',
        body: 'Placeholder draft: write this section as a field-journal route experience once the trail is walked or reliable route reports are verified. Focus on what a respectful visitor should notice without encouraging damage, trespass, artifact removal, or risky exploration.\n\nResearch needed: confirm trail mileage, difficulty, route descriptions, legal parking, hazards, current signage, and Leave No Trace guidance.',
        imagePath: '',
        imageAlt: '',
        imageCaption: '',
      },
      {
        id: 'lost-cove-section-forgotten-places',
        heading: 'Why Forgotten Places Matter',
        body: 'Forgotten places matter because they remind us that landscapes are not empty. They hold work, weather, families, routes, loss, resilience, and stories that can disappear when nobody asks careful questions. This section should connect Lost Cove to the wider Lost Compass mission without turning the place into a spectacle.',
        imagePath: '',
        imageAlt: '',
        imageCaption: '',
      },
      {
        id: 'lost-cove-section-leave-it-wild',
        heading: 'Leave It Wild Respect Note',
        body: 'Draft respect note: visit lightly, stay on legal routes, do not remove objects, do not disturb structures or markers, avoid sharing sensitive location details that could cause harm, and treat local history as something entrusted to visitors rather than something to consume.\n\nThis article is not final and must be reviewed before public publishing.',
        imagePath: '',
        imageAlt: '',
        imageCaption: '',
      },
    ],
    gallery: [
      {
        id: 'lost-cove-gallery-placeholder',
        imagePath: '/assets/images/stories/lost-cove-forgotten-mountain-town/example-field-view.webp',
        altText: 'Research-needed placeholder gallery image for the Lost Cove story draft',
        caption: 'Placeholder only: replace with a verified field photo, permitted image, or archival image with source notes.',
      },
    ],
    researchNotes: 'Draft framework only. Needs sourced research before publication. Do not publish as a final historical account until dates, names, access notes, and context are verified.',
    sourcesNotes: 'SOURCE LINK MISSING — DO NOT PUBLISH. Add reliable local history sources, land-management or trail references, maps, archival material, and any image credits before publication.',
    researchChecklist: [
      { id: 'lost-cove-check-location-access', text: 'Verify exact location wording and current public access guidance.' },
      { id: 'lost-cove-check-timeline', text: 'Confirm historical timeline with reliable local history or archival sources.' },
      { id: 'lost-cove-check-railroad', text: 'Confirm railroad, river, and mountain-life details before naming dates or organizations.' },
      { id: 'lost-cove-check-trail', text: 'Verify trail route, mileage, parking, current conditions, and land ownership or access restrictions.' },
      { id: 'lost-cove-check-sensitive-sites', text: 'Identify whether any sensitive sites, structures, cemeteries, or artifacts should not be described in detail.' },
      { id: 'lost-cove-check-sources', text: 'Add source links, image credits, and human review notes before changing status to Published.' },
    ],
    researchItems: [
      {
        id: 'lost-cove-research-location-access',
        question: 'Confirm exact location and access route.',
        category: 'Access',
        priority: 'High',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-boundary-context',
        question: 'Verify county/state boundary context.',
        category: 'Location',
        priority: 'High',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-historical-dates',
        question: 'Verify historical dates for settlement, activity, decline, and abandonment.',
        category: 'History',
        priority: 'High',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-railroad-history',
        question: 'Verify railroad history connected to the area.',
        category: 'Transportation',
        priority: 'High',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-families-community',
        question: 'Verify families, community names, or residents associated with the place.',
        category: 'Community',
        priority: 'Medium',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-structures',
        question: 'Verify school/church/business/community structures if applicable.',
        category: 'Structures',
        priority: 'Medium',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-land-ownership',
        question: 'Verify current land ownership/access rules.',
        category: 'Access',
        priority: 'High',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-hiking-safety',
        question: 'Verify hiking route safety and legal access.',
        category: 'Trail Safety',
        priority: 'High',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-archives',
        question: 'Find historic photos, maps, newspaper mentions, or archive records.',
        category: 'Sources',
        priority: 'Medium',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
      {
        id: 'lost-cove-research-interview-contacts',
        question: 'Identify potential local interview contacts.',
        category: 'Interviews',
        priority: 'Medium',
        status: 'Needed',
        notes: '',
        sourceContact: '',
        dateChecked: '',
        verified: false,
      },
    ],
    interviewQuestions: baseInterviewQuestions,
    createdAt: '2026-05-31T00:00:00.000Z',
    updatedAt: 'Draft seed record',
  },
];

export const defaultStories = [
  ...handWrittenStories,
  ...seededPortalStories,
];

export function storyRouteSlug(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStoryPath(story) {
  return `/stories/${story.slug}`;
}

export function getStoryCategoryPath(category) {
  return `/stories/category/${storyRouteSlug(category)}`;
}

const storyCategoryAliases = {
  'field-notes': ['field-journal'],
  'local-history': ['forgotten-places'],
  'wild-places': ['conservation'],
};

export function storyMatchesCategory(story, routeCategory) {
  const categorySlug = storyRouteSlug(routeCategory);
  const acceptedSlugs = new Set([categorySlug, ...(storyCategoryAliases[categorySlug] || [])]);
  const values = [
    story.category,
    ...(Array.isArray(story.secondaryCategories) ? story.secondaryCategories : []),
  ];
  return values.some((value) => acceptedSlugs.has(storyRouteSlug(value)));
}

export function getStoriesByCategory(stories, routeCategory) {
  return stories.filter((story) => storyMatchesCategory(story, routeCategory));
}

export function createStoryId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

function createEmptySection() {
  return {
    id: createStoryId('section'),
    heading: '',
    body: '',
    imagePath: '',
    imageAlt: '',
    imageCaption: '',
  };
}

export function createEmptyStory() {
  const storyId = createStoryId('story');

  return {
    id: storyId,
    title: '',
    slug: '',
    subtitle: '',
    category: '',
    secondaryCategories: [],
    location: '',
    status: 'Draft / Human Review Required',
    heroImage: '',
    heroImageAlt: '',
    excerpt: '',
    sections: [createEmptySection()],
    gallery: [],
    researchNotes: '',
    sourcesNotes: '',
    researchChecklist: [],
    researchItems: [],
    interviewQuestions: baseInterviewQuestions.map((question) => ({ ...question })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function normalizeStory(story) {
  const baseId = story.id || story.slug || 'story';
  const sections = Array.isArray(story.sections) && story.sections.length
    ? story.sections.map((section, index) => ({
      id: section.id || `${baseId}-section-${index}`,
      heading: section.heading || '',
      body: section.body || '',
      imagePath: section.imagePath || '',
      imageAlt: section.imageAlt || '',
      imageCaption: section.imageCaption || '',
    }))
    : [{
      id: `${baseId}-section-0`,
      heading: '',
      body: '',
      imagePath: '',
      imageAlt: '',
      imageCaption: '',
    }];
  const gallery = Array.isArray(story.gallery)
    ? story.gallery.map((item, index) => ({
      id: item.id || `${baseId}-gallery-${index}`,
      imagePath: item.imagePath || '',
      altText: item.altText || '',
      caption: item.caption || '',
    }))
    : [];

  const researchChecklist = Array.isArray(story.researchChecklist)
    ? story.researchChecklist.map((item, index) => (
      typeof item === 'string'
        ? { id: `${baseId}-checklist-${index}`, text: item }
        : { id: item.id || `${baseId}-checklist-${index}`, text: item.text || '' }
    ))
    : [];
  const researchItems = Array.isArray(story.researchItems) && story.researchItems.length
    ? story.researchItems.map((item, index) => ({
      id: item.id || `${baseId}-research-${index}`,
      question: item.question || item.text || '',
      category: item.category || 'General',
      priority: researchPriorities.includes(item.priority) ? item.priority : 'Medium',
      status: researchItemStatuses.includes(item.status) ? item.status : 'Needed',
      notes: item.notes || '',
      sourceContact: item.sourceContact || '',
      dateChecked: item.dateChecked || '',
      verified: Boolean(item.verified),
    }))
    : researchChecklist.map((item, index) => ({
      id: item.id ? `${item.id}-research` : `${baseId}-research-${index}`,
      question: item.text || '',
      category: 'General',
      priority: 'Medium',
      status: 'Needed',
      notes: '',
      sourceContact: '',
      dateChecked: '',
      verified: false,
    }));
  const interviewQuestions = Array.isArray(story.interviewQuestions) && story.interviewQuestions.length
    ? story.interviewQuestions.map((item, index) => ({
      id: item.id || `${baseId}-interview-${index}`,
      question: item.question || '',
      notes: item.notes || '',
      required: Boolean(item.required),
    }))
    : baseInterviewQuestions.map((item) => ({ ...item }));

  return {
    id: baseId,
    title: story.title || '',
    slug: story.slug || '',
    subtitle: story.subtitle || '',
    category: story.category || '',
    secondaryCategories: Array.isArray(story.secondaryCategories) ? story.secondaryCategories : [],
    location: story.location || '',
    author: story.author || story.authorCredit || '',
    photographer: story.photographer || story.photographerCredit || '',
    date: story.date || story.publishedAt || story.createdAt || '',
    status: story.status || 'Draft / Human Review Required',
    heroImage: story.heroImage || '',
    heroImageAlt: story.heroImageAlt || '',
    excerpt: story.excerpt || '',
    sections,
    gallery,
    researchNotes: story.researchNotes || '',
    sourcesNotes: story.sourcesNotes || '',
    researchChecklist,
    researchItems,
    interviewQuestions,
    createdAt: story.createdAt || '',
    updatedAt: story.updatedAt || '',
  };
}

export function readStoredStoryPayload() {
  if (typeof window === 'undefined') {
    return { stories: [], deletedStoryIds: [] };
  }

  try {
    const stored = window.localStorage.getItem(STORY_STORAGE_KEY);
    if (!stored) {
      return { stories: [], deletedStoryIds: [] };
    }

    const parsed = JSON.parse(stored);
    if (parsed && Array.isArray(parsed.stories)) {
      return {
        stories: parsed.stories.map((story) => normalizeStory(story)),
        deletedStoryIds: Array.isArray(parsed.deletedStoryIds) ? parsed.deletedStoryIds : [],
      };
    }

    if (Array.isArray(parsed)) {
      return {
        stories: parsed.map((story) => normalizeStory(story)),
        deletedStoryIds: [],
      };
    }
  } catch (error) {
    console.error('Error loading Story Manager localStorage:', error);
  }

  return { stories: [], deletedStoryIds: [] };
}

export function loadStories() {
  if (typeof window === 'undefined') {
    return defaultStories.map((story) => normalizeStory(story));
  }

  const { stories } = readStoredStoryPayload();
  const byId = new Map(
    defaultStories
      .map((story) => normalizeStory(story))
      .map((story) => [story.id, story]),
  );

  stories.forEach((story) => {
    byId.set(story.id, normalizeStory(story));
  });

  return Array.from(byId.values());
}

export function saveStories(stories, deletedStoryIds = []) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    STORY_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      deletedStoryIds,
      stories: stories.map((story) => ({ ...normalizeStory(story), updatedAt: story.updatedAt || new Date().toISOString() })),
    }),
  );
}

export function clearStoredStories() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORY_STORAGE_KEY);
}
