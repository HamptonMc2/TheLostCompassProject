import {
  Anchor,
  BookOpen,
  Camera,
  Compass,
  Droplets,
  GraduationCap,
  Hammer,
  History,
  Mail,
  Map,
  Mountain,
  Sprout,
  Trees,
  Users,
  Waves,
} from 'lucide-react';

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Stories From The Trail', path: '/stories' },
  { label: 'Conservation', path: '/conservation' },
  { label: 'Apparel', path: '/apparel' },
  { label: 'Join The Journey', path: '/join' },
  { label: 'Contact', path: '/contact' },
];

export const brandAssets = {
  logo: '/assets/logos/compass-rose-transparent.webp',
  heroImage: '/assets/images/hero-hiker-sunset.jpeg',
  missionImage: '/assets/images/vintage-compass-map.jpeg',
  conservationFeatureImage: '/assets/images/reef-restoration.jpeg',
};

export const homeContent = {
  hero: {
    imageAlt: 'Hiker silhouetted on a mountain ridge at sunset',
    eyebrow: 'Adventure. Stories. History. Conservation.',
    title: 'The Lost Compass Project',
    tagline: 'Find Your Way. Explore More. Leave It Wild.',
    text: 'For explorers, storytellers, and caretakers of wild places. Following trails, uncovering history, and supporting the people who protect what matters.',
    primaryCta: { label: 'Explore The Journey', path: '/stories' },
    secondaryCta: { label: 'Join The Journey', path: '/join' },
  },
  mission: {
    eyebrow: 'Our Mission',
    title: 'A compass for Adventure With Purpose.',
    text: 'The Lost Compass Project is built for people who see meaning in the places others pass by.\n\nWe follow trails, uncover stories, preserve history, and celebrate the people who care for the places we love.\n\nOur mission is simple:\n\nExplore with purpose.\nTell stories worth remembering.\nSupport the heroes protecting what matters.\n\nFuture mission-support collections will help direct support toward trail crews, conservation groups, educators, volunteers, and organizations working to protect the places we explore.',
    featureTitle: 'Not every destination is marked. Not every story is written down.',
    featureText: 'The project follows places that ask for attention: trailheads with no sign, shorelines with old names, forests shaped by work and weather, and conservation crews whose effort makes responsible adventure possible for everyone who comes after.',
  },
  stories: {
    eyebrow: 'Stories & History',
    title: 'Stories From The Trail',
    text: 'This is where routes become records: photographs, local history, field notes, forgotten places, and the human work behind the landscapes we love.',
  },
  conservation: {
    eyebrow: 'Conservation',
    title: 'The Lost Compass Conservation Project',
    text: 'The Lost Compass Conservation Project exists to point attention toward the people and organizations protecting the places we love. The mission is simple: help support the work that keeps trails, waterways, reefs, forests, parks, and wild places alive.',
    featureEyebrow: 'Adventure With Purpose',
    featureTitle: 'Protect the places beneath the surface and beyond the next ridge.',
    featureText: 'Conservation is not a side note to adventure. It is the proof that the journey meant something: better stories, cleaner routes, protected habitats, and respect for the people already doing the work.',
  },
  collection: {
    eyebrow: 'Coming Soon',
    title: 'Featured Collection',
    text: 'Marks of the journey. Symbols of direction. Pieces inspired by the trails, stories, and people that make this project possible. Future collections will help support the heroes behind the journey: trail crews, conservation groups, educators, volunteers, and organizations protecting the places we love.',
  },
};

export const pageContent = {
  ourStory: {
    hero: {
      eyebrow: 'Our Story',
      title: 'There is still something worth discovering.',
      text: 'The Lost Compass Project was founded on the belief that slowing down, stepping outside, and reconnecting with real places can remind us what is worth discovering, remembering, and protecting.',
    },
    compassCard: 'The compass has always been a symbol of direction. But life does not always provide a clear path.',
    paragraphs: [
      'Sometimes we feel lost. Sometimes we are searching for purpose. Sometimes we simply need a reminder that the journey itself matters.',
      'This project exists for explorers, storytellers, photographers, local-history seekers, conservationists, and anyone who still believes meaningful adventure should protect the natural world it moves through.',
      'Every story shared, every trail walked, every river crossed, and every conservation lead followed should point toward the same mission: Find Your Way. Explore More. Leave It Wild.',
    ],
    pillarsHeader: { eyebrow: 'Brand Pillars', title: 'What guides the journey' },
  },
  stories: {
    hero: {
      eyebrow: 'Stories From The Trail',
      title: 'Every place has a history. Every adventure carries responsibility.',
      text: 'Stories From The Trail preserves photography, route notes, local history, conservation stories, and reflections from mountains, waterways, forests, coastlines, and forgotten places.',
    },
  },
  conservation: {
    hero: {
      eyebrow: 'Conservation',
      title: 'Support the people protecting the places we love.',
      text: 'The Lost Compass Conservation Project focuses on trail maintenance, habitat restoration, waterway cleanup, reef restoration, outdoor education, and volunteer support.',
    },
    responsibility: {
      title: 'Adventure with responsibility',
      text: 'The conservation direction is rooted in practical stewardship: maintained trails, healthier habitats, cleaner waterways, stronger outdoor education, and respect for the people doing the work.',
    },
  },
  join: {
    hero: {
      eyebrow: 'Join The Journey',
      title: 'Move with purpose. Leave the route wild.',
      text: 'The journey starts with attention: to the route, the history underfoot, the people maintaining the path, and the mark we leave behind.',
    },
    guide: {
      title: 'How to move through the world',
      text: 'Slow down. Read the sign. Ask who built the trail. Learn the old name of the river. Pack out more than you carried in. Let the story of a place change how you travel through it.',
    },
    mission: {
      title: 'Find Your Way. Explore More. Leave It Wild.',
      text: 'The Lost Compass Project is for people who want adventure to carry meaning: explorers, photographers, local-history seekers, conservationists, and anyone willing to treat the next journey as a responsibility as much as an escape.',
    },
  },
  contact: {
    hero: {
      eyebrow: 'Contact',
      title: 'Send a story lead, conservation lead, or collaboration note.',
      text: 'The Lost Compass Project is built around real places, meaningful adventures, local history, and the people helping wild places endure.',
    },
  },
  apparel: {
    hero: {
      eyebrow: 'Apparel Preview',
      title: 'Mission-support pieces, not a store.',
      text: 'A coming-soon catalog of shirt and field-good concepts shaped by exploration, history, storytelling, conservation, and the people protecting wild places.',
    },
    banner: {
      title: 'Coming Soon',
      text: 'The first Lost Compass apparel drop is being built now. These designs are previews only and are not available for purchase yet.',
    },
    collections: {
      eyebrow: 'Collections',
      title: 'Artifacts from the journey',
      text: 'Each collection is a visual preview of future mission-support pieces. No checkout, no cart, no prices, and no store links are active in V0.1.',
    },
    products: {
      eyebrow: 'Design Previews',
      title: 'Shirts as field marks',
      text: 'These previews are shown like a small field archive: symbols of direction, wild places, working crews, and stories waiting to be found.',
    },
  },
};

export const storyCards = [
  {
    title: 'Mountains',
    eyebrow: 'High country',
    icon: Mountain,
    image: '/assets/images/hero-hiker-sunset.jpeg',
    path: '/stories/category/mountains',
    text: 'Ridges at last light, cold mornings, hard climbs, and the quiet choice to keep moving with respect.',
  },
  {
    title: 'Waterways',
    eyebrow: 'Rivers and coasts',
    icon: Waves,
    image: '/assets/images/coastal-overlook.jpeg',
    path: '/stories/category/waterways',
    text: 'Tide lines, river bends, hidden falls, and the routes where water shapes memory, culture, and responsibility.',
  },
  {
    title: 'Forgotten Places',
    eyebrow: 'Beyond the map',
    icon: Map,
    image: '/assets/images/vintage-compass-map.jpeg',
    path: '/stories/category/forgotten-places',
    text: 'Old roads, weathered markers, vanished settlements, and the local stories still waiting beside the trail.',
  },
  {
    title: 'Local History',
    eyebrow: 'Place memory',
    icon: History,
    image: '/assets/images/field-notes.jpeg',
    path: '/stories/category/local-history',
    text: 'Field notes that connect a landscape to the people, work, routes, and decisions that shaped it.',
  },
  {
    title: 'Wild Places',
    eyebrow: 'Stewardship',
    icon: Trees,
    image: '/assets/images/forest-trail.jpeg',
    path: '/stories/category/wild-places',
    text: 'Forests, reefs, parks, and open spaces approached with curiosity, humility, and a lighter footprint.',
  },
  {
    title: 'Field Notes',
    eyebrow: 'Field records',
    icon: BookOpen,
    image: '/assets/images/hikers-golden-ridge.jpeg',
    path: '/stories/category/field-notes',
    text: 'Route observations, photographs, trail lessons, conservation leads, and the details that make a journey useful.',
  },
];

export const conservationCards = [
  {
    title: 'Trail Maintenance',
    icon: Hammer,
    image: '/assets/images/trail-crew.jpeg',
    text: 'Recognizing the crews and volunteers who clear, rebuild, mark, and protect the paths we depend on.',
  },
  {
    title: 'Habitat Restoration',
    icon: Sprout,
    image: '/assets/images/forest-trail.jpeg',
    text: 'Pointing attention toward patient work that lets damaged places recover and native life return.',
  },
  {
    title: 'River Cleanup',
    icon: Droplets,
    image: '/assets/images/coastal-overlook.jpeg',
    text: 'Following the waterways that connect communities, wildlife, recreation, and the health of everything downstream.',
  },
  {
    title: 'Reef Restoration',
    icon: Anchor,
    image: '/assets/images/reef-restoration.jpeg',
    text: 'Honoring the ocean stewards working below the surface to protect fragile blue places most people never see.',
  },
  {
    title: 'Outdoor Education',
    icon: GraduationCap,
    image: '/assets/images/field-notes.jpeg',
    text: 'Turning curiosity into awareness, better choices outside, and a deeper relationship with place.',
  },
  {
    title: 'Volunteer Support',
    icon: Users,
    image: '/assets/images/hikers-golden-ridge.jpeg',
    text: 'Keeping the focus on the people who show up, do the work, and leave the route wild for the next person.',
  },
];

export const collectionPages = [
  {
    title: 'Compass Rose Collection',
    folderName: 'Compass rose collection',
    label: 'Coming Soon',
    path: '/collections/compass-rose-collection',
    legacyPath: '/compass-rose-collection',
    previewImage: '/assets/images/collections/compass-rose-collection/compass-rose-front-back.webp',
    summary: 'The first mark of the mission: direction, discovery, and stewardship carried into the field.',
    hero: {
      eyebrow: 'Collection Preview',
      title: 'Compass Rose Collection',
      text: 'A static exhibit of Compass Rose shirt concepts: marks of direction, discovery, stewardship, and Adventure With Purpose.',
    },
    intro: {
      eyebrow: 'Marks of the journey',
      title: 'Symbols of direction. Built around the mission.',
      text: 'The Compass Rose Collection is a preview of future mission-support pieces inspired by the trails, stories, and people that make The Lost Compass Project possible. These designs are shown as artifacts of the project, not as a store.',
    },
    note: {
      title: 'Coming soon, mission first',
      text: 'Future collections will help support the heroes behind the journey: trail crews, conservation groups, educators, volunteers, and organizations protecting the places we love.',
    },
    items: [
      {
        name: 'Compass Rose Backmark',
        slug: 'compass-rose-backmark',
        path: '/products/compass-rose-backmark',
        image: '/assets/images/collections/compass-rose-collection/compass-rose-backmark.webp',
        sourcePath: 'assets/mockups/Shirt Collections/Compass rose collection/Shirt 1/ChatGPT Image May 30, 2026, 05_43_29 PM.png',
        description: 'Built for the ones who feel pulled toward mountains, water, trails, backroads, and stories waiting to be found.',
      },
      {
        name: 'Compass Rose Front Back',
        slug: 'compass-rose-front-back',
        path: '/products/compass-rose-front-back',
        image: '/assets/images/collections/compass-rose-collection/compass-rose-front-back.webp',
        sourcePath: 'assets/mockups/Shirt Collections/Compass rose collection/shirt 2/The LostCompass Project logo fr and back.png',
        description: 'Built for the ones who feel pulled toward mountains, water, trails, backroads, and stories waiting to be found.',
      },
      {
        name: 'Compass Rose Mountain Sea Mark',
        slug: 'compass-rose-mountain-sea-mark',
        path: '/products/compass-rose-mountain-sea-mark',
        image: '/assets/images/collections/compass-rose-collection/compass-rose-mountain-sea-mark.webp',
        sourcePath: 'assets/mockups/Shirt Collections/Compass rose collection/shirt 3/The LostCompass Project t-shirt mochup.png',
        description: 'Built for the ones who feel pulled toward mountains, water, trails, backroads, and stories waiting to be found.',
      },
    ],
  },
  {
    title: 'Mountain & Sea Collection',
    folderName: 'mountain and sea collection',
    label: 'Coming Soon',
    path: '/collections/mountain-and-sea-collection',
    previewImage: '/assets/images/collections/mountain-and-sea-collection/mountain-and-sea-series.webp',
    summary: 'Mission-support pieces shaped by ridgelines, tide lines, cold mornings, open water, and long horizons.',
    hero: {
      eyebrow: 'Collection Preview',
      title: 'Mountain & Sea Collection',
      text: 'A field-journal preview of designs inspired by ridgelines, tide lines, old routes, and the pull between mountain and ocean.',
    },
    intro: {
      eyebrow: 'Ridges and waterlines',
      title: 'Where high country meets open water.',
      text: 'The Mountain & Sea Collection gathers early shirt concepts around discovery, wayfinding, and the places where stories move from summit rock to shoreline.',
    },
    note: {
      title: 'Coming soon, mission first',
      text: 'Future collections will help support the heroes behind the journey: trail crews, conservation groups, educators, volunteers, and organizations protecting the places we love.',
    },
    items: [
      {
        name: 'Mountain And Sea Series',
        slug: 'mountain-and-sea-series',
        path: '/products/mountain-and-sea-series',
        image: '/assets/images/collections/mountain-and-sea-collection/mountain-and-sea-series.webp',
        sourcePath: 'assets/mockups/Shirt Collections/mountain and sea collection/ChatGPT Image May 30, 2026, 05_55_54 PM.png',
        description: 'A grouped preview of mountain-and-water concepts built around movement, memory, and the wild places that keep calling people back.',
      },
    ],
  },
  {
    title: 'Trail Crew Collection',
    folderName: 'crew gear',
    label: 'Coming Soon',
    path: '/collections/trail-crew-collection',
    previewImage: '/assets/images/collections/trail-crew-collection/keep-it-wild-crew-gear.webp',
    summary: 'Built to honor the crews, volunteers, educators, and conservation leaders who keep the journey possible.',
    hero: {
      eyebrow: 'Collection Preview',
      title: 'Trail Crew Collection / Official Crew Gear',
      text: 'A mission-first preview honoring the people who clear trails, teach stewardship, restore habitats, and keep wild places cared for.',
    },
    intro: {
      eyebrow: 'Keep it wild',
      title: 'For the people behind the path.',
      text: 'The Trail Crew Collection is built around respect for the hands-on work behind meaningful adventure: crews, volunteers, educators, conservation leaders, and local organizations protecting the places we love.',
    },
    note: {
      title: 'Coming soon, mission first',
      text: 'Future collections will help support the heroes behind the journey: trail crews, conservation groups, educators, volunteers, and organizations protecting the places we love.',
    },
    items: [
      {
        name: 'Keep It Wild Crew Gear',
        slug: 'keep-it-wild-crew-gear',
        path: '/products/keep-it-wild-crew-gear',
        image: '/assets/images/collections/trail-crew-collection/keep-it-wild-crew-gear.webp',
        sourcePath: 'assets/mockups/Shirt Collections/crew gear/ChatGPT Image May 30, 2026, 06_04_01 PM (1).png',
        description: 'For the people who show up, do the work, and help keep wild places wild.',
      },
    ],
  },
];

export const collections = collectionPages.map((collection) => ({
  title: collection.title,
  label: collection.label,
  image: collection.previewImage,
  path: collection.path,
  text: collection.summary,
}));

export const allProducts = collectionPages.flatMap((collection) => (
  collection.items.map((item) => ({
    ...item,
    collection: collection.title,
    collectionPath: collection.path,
    storeUrlPlaceholder: 'Future store URL placeholder. Not assigned for V0.1.',
  }))
));

export const pillars = [
  {
    title: 'Exploration',
    icon: Compass,
    text: 'Purposeful curiosity for what lies beyond the next bend, ridge, shoreline, or horizon.',
  },
  {
    title: 'Storytelling',
    icon: Camera,
    text: 'Real places, real adventures, and field records that turn a route into shared memory.',
  },
  {
    title: 'Conservation',
    icon: Sprout,
    text: 'Adventure With Purpose: trails cared for, waterways cleaned, habitats restored, and communities supported.',
  },
  {
    title: 'Stewardship',
    icon: Users,
    text: 'People who move through wild places with respect, responsibility, and a commitment to leave them wild.',
  },
];

export const contactEmailAddress = 'stories@thelostcompassproject.com';
export const contactEmailIsPlaceholder = true;

export const contactRoutes = [
  {
    title: 'Stories and Field Notes',
    icon: BookOpen,
    text: 'Share a route, place, photo essay idea, local history lead, or adventure story worth preserving.',
    cta: 'Send a story lead',
    mailtoSubject: 'Story / Field Note Lead — The LostCompass Project',
    mailtoBody: `Place / story name:
Location:
What do you know about it?
Why does it matter?
Can we contact you for follow-up?
Your name or nickname:`,
  },
  {
    title: 'Conservation Leads',
    icon: Sprout,
    text: 'Send names of trail crews, waterway groups, reef teams, educators, and local stewards doing meaningful work.',
    cta: 'Send a conservation lead',
    mailtoSubject: 'Conservation Lead — The LostCompass Project',
    mailtoBody: `Organization / group / person:
Location:
What work are they doing?
Why should The LostCompass Project know about them?
Website or contact info:
Can we contact you for follow-up?
Your name or nickname:`,
  },
  {
    title: 'Future Collaborations',
    icon: Mail,
    text: 'Connect about photography, mission-support collection concepts, conservation storytelling, or responsible partnerships.',
    cta: 'Start a conversation',
    mailtoSubject: 'Collaboration Inquiry — The LostCompass Project',
    mailtoBody: `Name / organization:
Type of collaboration:
Photography / story / conservation / apparel / other:
What would you like to discuss?
Best contact info:`,
  },
];
