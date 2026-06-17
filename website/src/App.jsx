import { ArrowRight, CheckCircle2, Compass, Edit3, MapPinned, RotateCcw, Save } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { IconCard, PageHero, SectionHeader } from './components/Section';
import { StoryArticleGrid, StoryArticlePage, StoryManagerPage } from './components/Stories';
import {
  allProducts,
  brandAssets,
  collectionPages,
  collections,
  contactEmailAddress,
  contactEmailIsPlaceholder,
  contactRoutes,
  homeContent,
  pageContent,
  pillars,
  storyCards,
} from './data/siteContent';
import {
  clearStoredConservationItems,
  CONSERVATION_PROJECT_URL,
  defaultConservationItems,
  getConservationCard,
  loadConservationItems,
  normalizeConservationItem,
  saveConservationItems,
} from './data/conservation';
import { getStoriesByCategory, getStoryPath, loadStories } from './data/stories';

function getPathFromHash() {
  const hash = window.location.hash.replace('#', '');
  return hash || '/';
}

export default function App() {
  const initialPath = getPathFromHash();
  const [path, setPath] = useState(initialPath);
  const [managedStories, setManagedStories] = useState(() => loadStories());
  const [conservationItems, setConservationItems] = useState(() => loadConservationItems());
  const pathRef = useRef(initialPath);
  const linkNavigationRef = useRef(false);
  const scrollPositionsRef = useRef(new Map());

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollAfterRender = (callback) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(callback);
      });
    };

    const updatePath = () => {
      const previousPath = pathRef.current;
      const nextPath = getPathFromHash();
      const cameFromSiteLink = linkNavigationRef.current;

      scrollPositionsRef.current.set(previousPath, window.scrollY);
      linkNavigationRef.current = false;
      pathRef.current = nextPath;
      setPath(nextPath);

      scrollAfterRender(() => {
        if (cameFromSiteLink) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const previousScrollY = scrollPositionsRef.current.get(nextPath);
        if (typeof previousScrollY === 'number') {
          window.scrollTo({ top: previousScrollY, behavior: 'auto' });
        }
      });
    };

    const handleSiteLinkClick = (event) => {
      const link = event.target.closest?.('a[href^="#/"]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href?.startsWith('#/')) {
        return;
      }

      linkNavigationRef.current = true;
      scrollPositionsRef.current.set(pathRef.current, window.scrollY);

      if (href.slice(1) === pathRef.current) {
        scrollAfterRender(() => {
          linkNavigationRef.current = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    };

    document.addEventListener('click', handleSiteLinkClick);
    window.addEventListener('hashchange', updatePath);
    return () => {
      document.removeEventListener('click', handleSiteLinkClick);
      window.removeEventListener('hashchange', updatePath);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  const Page = useMemo(() => {
    const storyPage = managedStories.find((story) => getStoryPath(story) === path);
    const storyCategory = path.startsWith('/stories/category/')
      ? path.replace('/stories/category/', '')
      : '';
    const conservationDetail = conservationItems.find((item) => item.path === path);

    if (storyPage) {
      return function StoryRoute() {
        return <StoryArticlePage story={storyPage} />;
      };
    }

    if (storyCategory) {
      return function StoryCategoryRoute() {
        const card = storyCards.find((item) => item.path === path);
        const title = card?.title || 'Story Category';
        return <StoriesCategoryPage title={title} stories={getStoriesByCategory(managedStories, title)} />;
      };
    }

    if (conservationDetail) {
      return function ConservationDetailRoute() {
        return <ConservationDetailPage item={conservationDetail} />;
      };
    }

    const productPage = allProducts.find((product) => product.path === path);

    if (productPage) {
      return function ProductRoute() {
        return <ProductPreviewPage product={productPage} />;
      };
    }

    const collectionPage = collectionPages.find((collection) => (
      collection.path === path || collection.legacyPath === path
    ));

    if (collectionPage) {
      return function CollectionRoute() {
        return <CollectionPreviewPage collection={collectionPage} />;
      };
    }

    switch (path) {
      case '/our-story':
        return OurStory;
      case '/stories':
        return function StoriesRoute() {
          return <StoriesPage stories={managedStories} />;
        };
      case '/admin/stories':
        return function StoryManagerRoute() {
          return <StoryManagerPage stories={managedStories} setStories={setManagedStories} />;
        };
      case '/admin/conservation':
        return function ConservationManagerRoute() {
          return <ConservationManagerPage items={conservationItems} setItems={setConservationItems} />;
        };
      case '/conservation':
        return function ConservationRoute() {
          return <ConservationPage items={conservationItems} />;
        };
      case '/apparel':
        return ApparelPage;
      case '/join':
        return JoinPage;
      case '/contact':
        return ContactPage;
      default:
        return function HomeRoute() {
          return <HomePage items={conservationItems} />;
        };
    }
  }, [path, managedStories, conservationItems]);

  return (
    <div className="min-h-screen bg-compass-black font-body text-compass-parchment">
      <Header currentPath={path} />
      <main>
        <Page />
      </main>
      <Footer />
    </div>
  );
}

function HomePage({ items }) {
  return (
    <>
      <Hero />
      <MissionSection />
      <ConservationSection items={items} />
      <StoriesSection />
      <CollectionSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-compass-black px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <img
        src={brandAssets.heroImage}
        alt={homeContent.hero.imageAlt}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,7,6,0.94),rgba(5,7,6,0.72)_43%,rgba(5,7,6,0.28)),linear-gradient(0deg,rgba(5,7,6,0.96),rgba(5,7,6,0.18)_46%,rgba(5,7,6,0.68))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-compass-black to-transparent" />
      <img
        src={brandAssets.logo}
        alt=""
        className="absolute right-[-5rem] top-24 -z-10 h-80 w-80 object-contain opacity-20 drop-shadow-[0_0_55px_rgba(201,154,59,0.18)] sm:right-8 sm:h-[30rem] sm:w-[30rem] lg:right-20 lg:top-28"
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <img
            src={brandAssets.logo}
            alt="The Lost Compass Project compass rose"
            className="mb-8 h-24 w-24 object-contain drop-shadow-[0_0_28px_rgba(201,154,59,0.28)] transition duration-300 ease-out hover:rotate-[8deg] hover:scale-[1.035] hover:drop-shadow-[0_0_32px_rgba(201,154,59,0.36)] sm:h-32 sm:w-32"
          />
          <p className="text-sm font-black uppercase tracking-[0.34em] text-compass-gold">{homeContent.hero.eyebrow}</p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.88] text-compass-parchment sm:text-7xl lg:text-8xl">
            {homeContent.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-4xl">
            {homeContent.hero.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-compass-muted">
            {homeContent.hero.text}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`#${homeContent.hero.primaryCta.path}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-compass-gold px-6 text-sm font-black uppercase tracking-[0.16em] text-compass-black transition hover:bg-compass-parchment">
              {homeContent.hero.primaryCta.label}
              <ArrowRight size={18} />
            </a>
            <a href={`#${homeContent.hero.secondaryCta.path}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-black uppercase tracking-[0.16em] text-compass-parchment backdrop-blur transition hover:border-compass-gold hover:text-compass-gold">
              {homeContent.hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow={homeContent.mission.eyebrow}
          title={homeContent.mission.title}
          text={homeContent.mission.text}
        />
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(243,234,216,0.1),rgba(63,159,152,0.08))] p-6 shadow-glow sm:p-8">
          <img src={brandAssets.missionImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-32" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75),rgba(0,0,0,0.62))]" />
          <img src={brandAssets.logo} alt="" className="absolute right-5 top-5 h-28 w-28 object-contain opacity-10" />
          <div className="relative max-w-2xl rounded-md bg-black/25 p-4 backdrop-blur-[2px] sm:p-5">
            <p className="text-2xl font-black uppercase leading-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] sm:text-3xl">
              {homeContent.mission.featureTitle}
            </p>
            <p className="mt-5 text-base leading-8 text-white/92">
              {homeContent.mission.featureText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoriesSection() {
  return (
    <section className="bg-compass-ink px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={homeContent.stories.eyebrow}
          title={homeContent.stories.title}
          text={homeContent.stories.text}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storyCards.map((item) => (
            <IconCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConservationSection({ items = [] }) {
  const cards = items.map((item) => getConservationCard(item));

  return (
    <section className="bg-compass-parchment px-4 py-20 text-compass-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <a href={CONSERVATION_PROJECT_URL} className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end" aria-label="Open The LostCompass Project conservation site">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-compass-forest">{homeContent.conservation.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
              {homeContent.conservation.title}
            </h2>
          </div>
          <p className="text-base leading-8 text-compass-ink/76 sm:text-lg">
            {homeContent.conservation.text}
          </p>
        </a>
        <a href={CONSERVATION_PROJECT_URL} className="mt-10 grid overflow-hidden rounded-lg border border-compass-black/10 bg-compass-black text-compass-parchment lg:grid-cols-[1fr_0.85fr]" aria-label="Open The LostCompass Project conservation site">
          <img src={brandAssets.conservationFeatureImage} alt="" className="h-72 w-full object-cover lg:h-full" />
          <div className="p-6 sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-compass-gold">{homeContent.conservation.featureEyebrow}</p>
            <h3 className="mt-4 text-3xl font-black uppercase leading-tight">{homeContent.conservation.featureTitle}</h3>
            <p className="mt-5 text-sm leading-7 text-compass-muted">
              {homeContent.conservation.featureText}
            </p>
          </div>
        </a>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((item) => (
            <IconCard key={item.title} item={item} tone="light" />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionSection() {
  return (
    <section className="relative overflow-hidden bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
      <img
        src={brandAssets.logo}
        alt=""
        className="absolute left-[-6rem] top-12 h-80 w-80 object-contain opacity-[0.06]"
      />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={homeContent.collection.eyebrow}
          title={homeContent.collection.title}
          text={homeContent.collection.text}
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_1fr_1fr]">
          {collections.map((collection) => (
            <article
              key={collection.title}
              className="rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(201,154,59,0.18),rgba(63,159,152,0.08)_48%,rgba(255,255,255,0.05))] p-5"
            >
              <a href={collection.path ? `#${collection.path}` : undefined} className="block">
                <div className="aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(243,234,216,0.18),transparent_30%),linear-gradient(135deg,#121817,#244436)]">
                  {collection.image ? (
                    <img src={collection.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6">
                      <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-compass-gold/45">
                        <img
                          src={brandAssets.logo}
                          alt=""
                          className="h-28 w-28 object-contain opacity-80"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-compass-teal">
                  {collection.label}
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase text-compass-parchment">
                  {collection.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-compass-muted">{collection.text}</p>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApparelPage() {
  return (
    <>
      <PageHero
        eyebrow={pageContent.apparel.hero.eyebrow}
        title={pageContent.apparel.hero.title}
        text={pageContent.apparel.hero.text}
      />
      <section className="relative overflow-hidden bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <img
          src={brandAssets.logo}
          alt=""
          className="absolute left-[-6rem] top-16 h-80 w-80 object-contain opacity-[0.05]"
        />
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-compass-gold/35 bg-[linear-gradient(135deg,rgba(201,154,59,0.18),rgba(63,159,152,0.08))] p-6 sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-compass-gold">
              {pageContent.apparel.banner.title}
            </p>
            <p className="mt-4 max-w-4xl text-lg font-semibold leading-8 text-compass-parchment">
              {pageContent.apparel.banner.text}
            </p>
          </div>

          <div className="mt-14">
            <SectionHeader
              eyebrow={pageContent.apparel.collections.eyebrow}
              title={pageContent.apparel.collections.title}
              text={pageContent.apparel.collections.text}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <article
                  key={collection.title}
                  className="rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(201,154,59,0.16),rgba(63,159,152,0.08)_48%,rgba(255,255,255,0.045))] p-5 transition duration-300 hover:-translate-y-1 hover:border-compass-gold/45"
                >
                  <a href={`#${collection.path}`} className="block">
                    <div className="aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-compass-ink">
                      <img src={collection.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-compass-teal">
                      {collection.label}
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase text-compass-parchment">
                      {collection.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-compass-muted">{collection.text}</p>
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeader
              eyebrow={pageContent.apparel.products.eyebrow}
              title={pageContent.apparel.products.title}
              text={pageContent.apparel.products.text}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {allProducts.map((product) => (
                <ProductPreviewCard key={product.path} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CollectionPreviewPage({ collection }) {
  return (
    <>
      <PageHero
        eyebrow={collection.hero.eyebrow}
        title={collection.hero.title}
        text={collection.hero.text}
      />
      <section className="relative overflow-hidden bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <img
          src={brandAssets.logo}
          alt=""
          className="absolute right-[-5rem] top-16 h-80 w-80 object-contain opacity-[0.05]"
        />
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={collection.intro.eyebrow}
            title={collection.intro.title}
            text={collection.intro.text}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {collection.items.map((item) => (
              <ProductPreviewCard
                key={item.path}
                product={{ ...item, collection: collection.title }}
              />
            ))}
          </div>
          <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.055] p-6 sm:p-8">
            <h2 className="text-2xl font-black uppercase text-compass-parchment">{collection.note.title}</h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-compass-muted">{collection.note.text}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductPreviewCard({ product }) {
  return (
    <article className="rounded-lg border border-white/10 bg-[linear-gradient(145deg,rgba(201,154,59,0.16),rgba(63,159,152,0.08)_48%,rgba(255,255,255,0.045))] p-5 transition duration-300 hover:-translate-y-1 hover:border-compass-gold/45">
      <a href={`#${product.path}`} className="block">
        <div className="aspect-square overflow-hidden rounded-md border border-white/10 bg-compass-ink">
          <img src={product.image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        </div>
        <p className="mt-5 inline-flex rounded-full border border-compass-gold/40 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-compass-gold">
          Coming Soon
        </p>
        <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-compass-teal">
          {product.collection}
        </p>
        <h2 className="mt-2 text-2xl font-black uppercase text-compass-parchment">
          {product.name}
        </h2>
        <p className="mt-3 text-sm leading-7 text-compass-muted">{product.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-compass-gold">
          View Preview <ArrowRight size={16} />
        </span>
      </a>
    </article>
  );
}

function ProductPreviewPage({ product }) {
  return (
    <>
      <PageHero
        eyebrow="Product Preview"
        title={product.name}
        text={product.description}
      />
      <section className="relative overflow-hidden bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <img
          src={brandAssets.logo}
          alt=""
          className="absolute right-[-6rem] top-20 h-80 w-80 object-contain opacity-[0.05]"
        />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-compass-ink p-4">
            <img src={product.image} alt="" className="aspect-square w-full rounded-md object-cover" />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-6 sm:p-8">
            <p className="inline-flex rounded-full border border-compass-gold/40 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-compass-gold">
              Coming Soon
            </p>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-compass-teal">
              {product.collection}
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-tight text-compass-parchment">
              {product.name}
            </h2>
            <p className="mt-5 text-base leading-8 text-compass-muted">
              {product.description}
            </p>
            <button
              type="button"
              disabled
              className="mt-8 inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-lg border border-compass-gold/40 bg-compass-gold/12 px-6 text-sm font-black uppercase tracking-[0.16em] text-compass-gold"
            >
              Coming Soon
            </button>
            <div className="mt-8 rounded-md border border-white/10 bg-compass-black/55 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-compass-gold">
                Future Store URL
              </p>
              <p className="mt-3 text-sm leading-7 text-compass-muted">
                {product.storeUrlPlaceholder || 'Future store URL placeholder. Not assigned for V0.1.'}
              </p>
            </div>
            {product.collectionPath ? (
              <a href={`#${product.collectionPath}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-compass-parchment hover:text-compass-gold">
                Back To Collection <ArrowRight size={16} />
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

function OurStory() {
  return (
    <>
      <PageHero
        eyebrow={pageContent.ourStory.hero.eyebrow}
        title={pageContent.ourStory.hero.title}
        text={pageContent.ourStory.hero.text}
      />
      <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
            <Compass className="text-compass-gold" size={42} />
            <p className="mt-5 text-2xl font-black uppercase leading-tight">
              {pageContent.ourStory.compassCard}
            </p>
          </div>
          <div className="space-y-6 text-base leading-8 text-compass-muted sm:text-lg">
            {pageContent.ourStory.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === pageContent.ourStory.paragraphs.length - 1 ? 'font-semibold text-compass-parchment' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-compass-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={pageContent.ourStory.pillarsHeader.eyebrow} title={pageContent.ourStory.pillarsHeader.title} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StoriesPage({ stories }) {
  return (
    <>
      <PageHero
        eyebrow={pageContent.stories.hero.eyebrow}
        title={pageContent.stories.hero.title}
        text={pageContent.stories.hero.text}
      />
      <StoriesSection />
      <StoryArticleGrid stories={stories} />
    </>
  );
}

function StoriesCategoryPage({ title, stories }) {
  return (
    <>
      <PageHero
        eyebrow="Story Archive"
        title={title}
        text={`Stories and field records filed under ${title}.`}
      />
      {stories.length ? (
        <StoryArticleGrid stories={stories} />
      ) : (
        <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/[0.045] p-8">
            <SectionHeader
              eyebrow="Coming Soon"
              title="No stories are published in this category yet"
              text="Return to Stories From The Trail to browse the full archive."
            />
            <a href="#/stories" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-compass-gold px-6 text-sm font-black uppercase tracking-[0.16em] text-compass-black">
              Back To Stories
            </a>
          </div>
        </section>
      )}
    </>
  );
}

function ConservationPage({ items }) {
  const impactPlaceholders = [
    'Volunteers',
    'Clubs',
    'Organizations',
    'Groups We Want To Support',
    'Groups We Have Supported',
    'Donations Made',
    'Cleanup Projects',
    'Impact Records',
  ];

  return (
    <>
      <PageHero
        eyebrow={pageContent.conservation.hero.eyebrow}
        title={pageContent.conservation.hero.title}
        text={pageContent.conservation.hero.text}
      />
      <ConservationSection items={items} />
      <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/[0.055] p-6 sm:p-8">
          <CheckCircle2 className="text-compass-gold" size={38} />
          <h2 className="mt-5 text-3xl font-black uppercase">{pageContent.conservation.responsibility.title}</h2>
          <p className="mt-4 text-base leading-8 text-compass-muted">
            {pageContent.conservation.responsibility.text}
          </p>
        </div>
      </section>
      <section className="bg-compass-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Mission Impact"
            title="Conservation support records"
            text="A placeholder impact area for volunteers, clubs, organizations, cleanup projects, donations, support notes, and future field records."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impactPlaceholders.map((item) => (
              <article key={item} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-compass-gold">Coming Soon</p>
                <h2 className="mt-3 text-xl font-black uppercase text-compass-parchment">{item}</h2>
                <p className="mt-3 text-sm leading-7 text-compass-muted">
                  Placeholder record area. Add verified names, links, dates, and support notes when ready.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ConservationDetailPage({ item }) {
  return (
    <>
      <PageHero
        eyebrow={item.cardCategory || 'Conservation'}
        title={item.detailTitle}
        text={item.detailIntro}
      />
      <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <ConservationDetailBlock
            title="Organizations / Clubs / Volunteers"
            text={item.organizationNotes}
          />
          <ConservationDetailBlock
            title="Donation or Support Notes"
            text={item.donationNotes}
          />
          <ConservationDetailBlock
            title="Field Updates"
            text={item.fieldUpdates}
          />
        </div>
      </section>
      <section className="bg-compass-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/[0.055] p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-compass-gold">Coming Soon</p>
          <h2 className="mt-4 text-3xl font-black uppercase text-compass-parchment">Impact record</h2>
          <p className="mt-4 text-base leading-8 text-compass-muted">
            This page will eventually hold verified support links, project updates, donation records, cleanup outcomes, partner notes, and field photos for this conservation area.
          </p>
          <a href="#/conservation" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg border border-compass-gold/45 px-5 text-sm font-black uppercase tracking-[0.14em] text-compass-gold transition hover:bg-compass-gold hover:text-compass-black">
            Back To Conservation <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}

function ConservationDetailBlock({ title, text }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.055] p-6">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-compass-gold">Coming Soon</p>
      <h2 className="mt-4 text-2xl font-black uppercase leading-tight text-compass-parchment">{title}</h2>
      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-compass-muted">
        {text || 'Coming soon.'}
      </p>
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-compass-parchment">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-compass-gold">{label}</span>
      {children}
    </label>
  );
}

function inputClass(extra = '') {
  return `min-h-11 w-full rounded-md border border-white/10 bg-compass-black/70 px-4 py-3 text-sm leading-6 text-compass-parchment outline-none transition placeholder:text-compass-muted/60 focus:border-compass-gold/70 ${extra}`;
}

function ConservationManagerPage({ items, setItems }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id || '');
  const selectedItem = items.find((item) => item.id === selectedId) || items[0] || defaultConservationItems[0];
  const [draft, setDraft] = useState(() => normalizeConservationItem(selectedItem));
  const [message, setMessage] = useState('');

  useEffect(() => {
    const nextItem = items.find((item) => item.id === selectedId) || items[0] || defaultConservationItems[0];
    setDraft(normalizeConservationItem(nextItem));
  }, [items, selectedId]);

  function beginEdit(item) {
    setSelectedId(item.id);
    setDraft(normalizeConservationItem(item));
    setMessage(`Editing ${item.cardTitle}`);
  }

  function setDraftValue(field, value) {
    setDraft((current) => normalizeConservationItem({ ...current, [field]: value }));
  }

  function saveDraft() {
    const normalized = normalizeConservationItem(draft);
    const nextItems = items.map((item) => (item.id === normalized.id ? normalized : item));

    setItems(nextItems);
    saveConservationItems(nextItems);
    setSelectedId(normalized.id);
    setDraft(normalized);
    setMessage(`Saved locally: ${normalized.cardTitle}`);
  }

  function resetLocalConservation() {
    const confirmed = window.confirm('Reset local conservation edits and restore the data file records?');
    if (!confirmed) {
      setMessage('Reset canceled.');
      return;
    }

    clearStoredConservationItems();
    setItems(defaultConservationItems);
    setSelectedId(defaultConservationItems[0]?.id || '');
    setDraft(defaultConservationItems[0]);
    setMessage('Local conservation edits reset. Default records restored from src/data/conservation.json.');
  }

  return (
    <>
      <PageHero
        eyebrow="Conservation Admin V0.1"
        title="Edit conservation mission records."
        text="Local draft admin. Saved in this browser only. No public accounts, visitor login, or database."
      />
      <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.34fr_0.66fr]">
          <aside className="space-y-5">
            <div className="rounded-lg border border-compass-gold/35 bg-compass-gold/10 p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-compass-gold">Local Only</p>
              <p className="mt-3 text-sm leading-7 text-compass-muted">
                Changes save to browser localStorage. The seed records live in src/data/conservation.json.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={saveDraft} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-compass-gold px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-black">
                  <Save size={16} /> Save
                </button>
                <button type="button" onClick={resetLocalConservation} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-teal/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-teal">
                  <RotateCcw size={16} /> Reset Local
                </button>
              </div>
              {message ? <p className="mt-4 text-sm leading-6 text-compass-muted">{message}</p> : null}
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <h2 className="text-xl font-black uppercase text-compass-parchment">Conservation Cards</h2>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => beginEdit(item)}
                    className={`block w-full rounded-md border p-4 text-left transition ${
                      item.id === draft.id
                        ? 'border-compass-gold/60 bg-compass-gold/10'
                        : 'border-white/10 bg-compass-black/55 hover:border-compass-gold/35'
                    }`}
                  >
                    <span className="block text-sm font-bold leading-6 text-compass-parchment">{item.cardTitle}</span>
                    <span className="mt-2 block text-xs font-black uppercase tracking-[0.14em] text-compass-gold">{item.path}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 text-2xl font-black uppercase text-compass-parchment">
                  <Edit3 size={22} className="text-compass-gold" /> Conservation Record
                </h2>
                <button type="button" onClick={saveDraft} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-compass-gold px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-black">
                  <Save size={16} /> Save Record
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Card Title">
                  <input value={draft.cardTitle || ''} onChange={(event) => setDraftValue('cardTitle', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Card Subtitle / Category">
                  <input value={draft.cardSubtitle || ''} onChange={(event) => setDraftValue('cardSubtitle', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Card Category">
                  <input value={draft.cardCategory || ''} onChange={(event) => setDraftValue('cardCategory', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Detail Page Title">
                  <input value={draft.detailTitle || ''} onChange={(event) => setDraftValue('detailTitle', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Public Route">
                  <input value={draft.path || ''} readOnly className={inputClass('opacity-80')} />
                </Field>
                <Field label="Card Description">
                  <textarea value={draft.cardDescription || ''} onChange={(event) => setDraftValue('cardDescription', event.target.value)} rows="4" className={inputClass()} />
                </Field>
                <Field label="Detail Page Intro">
                  <textarea value={draft.detailIntro || ''} onChange={(event) => setDraftValue('detailIntro', event.target.value)} rows="4" className={inputClass()} />
                </Field>
                <Field label="Organizations / Clubs / Volunteers">
                  <textarea value={draft.organizationNotes || ''} onChange={(event) => setDraftValue('organizationNotes', event.target.value)} rows="7" className={inputClass()} />
                </Field>
                <Field label="Donation or Support Notes">
                  <textarea value={draft.donationNotes || ''} onChange={(event) => setDraftValue('donationNotes', event.target.value)} rows="7" className={inputClass()} />
                </Field>
                <Field label="Field Updates">
                  <textarea value={draft.fieldUpdates || ''} onChange={(event) => setDraftValue('fieldUpdates', event.target.value)} rows="7" className={inputClass('md:col-span-2')} />
                </Field>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-compass-gold">Preview Links</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`#${draft.path}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                  Detail Page <ArrowRight size={16} />
                </a>
                <a href="#/conservation" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-teal/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-teal">
                  Main Conservation <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow={pageContent.join.hero.eyebrow}
        title={pageContent.join.hero.title}
        text={pageContent.join.hero.text}
      />
      <section className="bg-compass-ink px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-6">
            <MapPinned className="text-compass-gold" size={44} />
            <h2 className="mt-5 text-3xl font-black uppercase">{pageContent.join.guide.title}</h2>
            <p className="mt-4 leading-8 text-compass-muted">
              {pageContent.join.guide.text}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-compass-black/70 p-6 sm:p-8">
            <h2 className="text-3xl font-black uppercase">{pageContent.join.mission.title}</h2>
            <p className="mt-5 leading-8 text-compass-muted">
              {pageContent.join.mission.text}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  function buildMailtoLink(item) {
    const subject = encodeURIComponent(item.mailtoSubject);
    const body = encodeURIComponent(item.mailtoBody);
    return `mailto:${contactEmailAddress}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageHero
        eyebrow={pageContent.contact.hero.eyebrow}
        title={pageContent.contact.hero.title}
        text={pageContent.contact.hero.text}
      />
      <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-lg border border-compass-gold/25 bg-compass-gold/10 p-5">
            <p className="text-sm font-bold leading-7 text-compass-parchment">
              No public account is required. For V0.1, story leads and contact notes are sent by email.
            </p>
            {contactEmailIsPlaceholder ? (
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-compass-muted">
                Email inbox placeholder. Final address may change before public launch.
              </p>
            ) : null}
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {contactRoutes.map((item) => (
            <a
              key={item.title}
              href={buildMailtoLink(item)}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] p-6 text-compass-parchment transition duration-300 hover:-translate-y-1 hover:border-compass-gold/50 focus:border-compass-gold focus:outline-none focus:ring-2 focus:ring-compass-gold/40"
              aria-label={`${item.cta}: ${item.title}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-compass-gold/40 bg-compass-gold/12 text-compass-gold">
                <item.icon size={23} strokeWidth={1.8} />
              </div>
              <h2 className="mt-5 text-xl font-black uppercase tracking-[0.04em]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-compass-muted">{item.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-compass-gold">
                {item.cta}
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
