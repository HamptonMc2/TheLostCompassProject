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
    "id": "lost-cove-forgotten-mountain-town",
    "slug": "lost-cove-forgotten-mountain-town",
    "title": "Lost Cove: The Mountain Community Above the Nolichucky",
    "subtitle": "The families, work, and changing connections behind a vanished North Carolina community.",
    "category": "Local History",
    "secondaryCategories": [
      "Forgotten Places",
      "Trail Stories"
    ],
    "location": "Yancey County, North Carolina — near the Tennessee border",
    "status": "Published",
    "heroImage": "",
    "heroImageAlt": "",
    "excerpt": "From Civil War-era settlement to the last departures in 1957, Lost Cove’s history is a story of mountain families, shared work, timber, rail connections, and a changing way of life.",
    "sections": [
      {
        "id": "lost-cove-history-0",
        "heading": "A community above the Nolichucky",
        "body": "Lost Cove, in Yancey County, North Carolina, is remembered today as a deserted mountain settlement near the Tennessee border. Its story reaches back to the Civil War era. Historian Christy A. Smith’s ETSU research follows the community from 1864 to 1957, drawing on interviews with former residents as well as written records. Those voices offer a way to understand Lost Cove as a home, rather than simply a ghost town.",
        "imagePath": "",
        "imageAlt": "",
        "imageCaption": ""
      },
      {
        "id": "lost-cove-history-1",
        "heading": "Families, farms, and shared work",
        "body": "Bailey, Tipton, and Miller families were central to the settlement. Gardens, orchards, and neighbors’ help sustained daily life. Families exchanged goods and labor, helped with harvests, and preserved food together. A shared school and church building connected education, worship, and community gatherings. In Smith’s account, kinship was as essential to survival as the land itself.",
        "imagePath": "",
        "imageAlt": "",
        "imageCaption": ""
      },
      {
        "id": "lost-cove-history-2",
        "heading": "Timber, trains, and moonshine",
        "body": "Lost Cove was secluded, but it was connected to a wider economy. Sawmill work and the railroad provided opportunities beyond farming. Timber was processed for products including railroad ties, and a local commissary supplied purchased goods. Moonshine also brought income to some families, particularly during the Depression. It was one part of a working community whose history also included classrooms, orchards, and church services.",
        "imagePath": "",
        "imageAlt": "",
        "imageCaption": ""
      },
      {
        "id": "lost-cove-history-3",
        "heading": "Why families left",
        "body": "Lost Cove did not disappear in a single event. Smith identifies several pressures: dwindling timber, the loss of passenger-train service, an unsuccessful effort to secure a community road, declining population, and educational needs. Together, these made remaining in the cove increasingly difficult. The community’s inhabited history ended in 1957.",
        "imagePath": "",
        "imageAlt": "",
        "imageCaption": ""
      },
      {
        "id": "lost-cove-history-4",
        "heading": "Protecting what remains",
        "body": "Preservation has become another chapter in Lost Cove’s story. In December 2012, the Southern Appalachian Highlands Conservancy purchased a 95-acre portion of the historic cove. The organization organized cleanups and guided visits before transferring that property to the U.S. Forest Service in 2017 for inclusion in Pisgah National Forest. That transfer concerned the protected parcel, not a claim that every surrounding tract was acquired.",
        "imagePath": "",
        "imageAlt": "",
        "imageCaption": ""
      },
      {
        "id": "lost-cove-history-5",
        "heading": "Remember the people. Leave it wild.",
        "body": "A place can lose its residents without losing its meaning. Lost Cove invites us to remember the work, relationships, and ordinary days that made a mountain settlement a home. Treat surviving structures, grave markers, and objects with care: leave them where they belong. This is a historical overview, not a current trail guide; consult the land manager for access and conditions before planning a visit.",
        "imagePath": "",
        "imageAlt": "",
        "imageCaption": ""
      }
    ],
    "gallery": [],
    "researchNotes": "Sourced historical overview. No original interviews or site visit claimed. Current hiking access and conditions are outside this article’s scope.",
    "sourcesNotes": "Christy A. Smith, Lost Cove, North Carolina: The Life and Death of a Thriving Community (1864–1957), ETSU thesis (2007): https://dc.etsu.edu/etd/2147/\n\nChristy A. Smith, The vanished community of Lost Cove, Appalachian History (2021): https://www.appalachianhistory.net/2021/04/the-vanished-community-of-lost-cove.html\n\nSouthern Appalachian Highlands Conservancy, Lost Cove in Pisgah National Forest: https://appalachian.org/get-connected/explore-protected-lands/lost-cove/\n\nSources checked November 10, 2026.",
    "researchChecklist": [],
    "researchItems": [],
    "interviewQuestions": [],
    "createdAt": "2026-05-31T00:00:00.000Z",
    "updatedAt": "2026-11-10T00:00:00.000Z",
    "date": "2026-11-10"
  }
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
