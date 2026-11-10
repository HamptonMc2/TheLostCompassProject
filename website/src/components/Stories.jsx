import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Edit3,
  Eye,
  FileText,
  Image,
  ListChecks,
  Plus,
  Printer,
  RotateCcw,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  baseInterviewQuestions,
  clearStoredStories,
  createEmptyStory,
  createStoryId,
  defaultStories,
  getStoryPath,
  imagePathInstructions,
  normalizeStory,
  readStoredStoryPayload,
  researchItemStatuses,
  researchPriorities,
  saveStories,
  storyStatuses,
} from '../data/stories';
import { PageHero, SectionHeader } from './Section';

const emptySection = {
  id: '',
  heading: '',
  body: '',
  imagePath: '',
  imageAlt: '',
  imageCaption: '',
};

const emptyGalleryItem = {
  id: '',
  imagePath: '',
  altText: '',
  caption: '',
};

const emptyResearchItem = {
  id: '',
  question: '',
  category: '',
  priority: 'Medium',
  status: 'Needed',
  notes: '',
  sourceContact: '',
  dateChecked: '',
  verified: false,
};

const emptyInterviewQuestion = {
  id: '',
  question: '',
  notes: '',
  required: false,
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-compass-gold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function inputClass(extra = '') {
  return `w-full rounded-md border border-white/10 bg-compass-black/70 px-4 py-3 text-sm leading-6 text-compass-parchment outline-none transition placeholder:text-compass-muted/55 focus:border-compass-gold ${extra}`;
}

function updateAt(items, index, patch) {
  return items.map((item, itemIndex) => {
    if (itemIndex !== index) {
      return item;
    }

    if (typeof patch === 'object' && patch !== null && !Array.isArray(patch)) {
      return { ...item, ...patch };
    }

    return patch;
  });
}

function removeAt(items, index) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function moveAt(items, index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const next = [...items];
  const [item] = next.splice(index, 1);
  next.splice(nextIndex, 0, item);
  return next;
}

function toSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatStoryDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function createSectionDraft() {
  return { ...emptySection, id: createStoryId('section') };
}

function createGalleryDraft() {
  return { ...emptyGalleryItem, id: createStoryId('gallery') };
}

function createChecklistDraft() {
  return { id: createStoryId('checklist'), text: '' };
}

function createResearchItemDraft() {
  return { ...emptyResearchItem, id: createStoryId('research') };
}

function createInterviewQuestionDraft() {
  return { ...emptyInterviewQuestion, id: createStoryId('interview') };
}

function BlankNoteLines({ count = 4 }) {
  return (
    <div className="print-note-lines">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`note-line-${index}`} className="print-note-line" />
      ))}
    </div>
  );
}

function PrintCheckbox({ checked }) {
  return <span className="print-checkbox" aria-hidden="true">{checked ? 'X' : ''}</span>;
}

function PrintableResearchPacket({ story }) {
  return (
    <div className="print-packet">
      <header className="print-packet-header">
        <p className="print-kicker">The LostCompass Project</p>
        <h1>Research Packet</h1>
        <p>{story.title}</p>
      </header>

      <section className="print-meta-grid">
        <div><strong>Slug:</strong> {story.slug}</div>
        <div><strong>Category:</strong> {story.category}</div>
        <div><strong>Location / Region:</strong> {story.location}</div>
        <div><strong>Status:</strong> {story.status}</div>
      </section>

      <section>
        <h2>Short Summary</h2>
        <p>{story.excerpt}</p>
      </section>

      <section>
        <h2>Research Needed Checklist</h2>
        <div className="print-research-list">
          {story.researchItems.map((item, index) => (
            <article key={item.id} className="print-research-item">
              <h3><PrintCheckbox checked={item.verified} /> {index + 1}. {item.question}</h3>
              <p><strong>Category:</strong> {item.category || 'General'} | <strong>Priority:</strong> {item.priority || 'Medium'} | <strong>Status:</strong> {item.status || 'Needed'}</p>
              <p><strong>Source / Contact:</strong> {item.sourceContact || '________________________________________'}</p>
              <p><strong>Date Checked:</strong> {item.dateChecked || '________________'} | <strong>Verified:</strong> {item.verified ? 'Yes' : 'No'}</p>
              <p><strong>Notes:</strong></p>
              {item.notes ? <p className="print-notes-text">{item.notes}</p> : <BlankNoteLines count={4} />}
            </article>
          ))}
        </div>
      </section>

      <section className="print-page-break">
        <h2>Interview Checklist</h2>
        <div className="print-field-grid">
          <span>Interviewer: ________________________________</span>
          <span>Interviewee: ________________________________</span>
          <span>Date: ___________________</span>
          <span>Location: _________________________________</span>
          <span>Permission to quote: [ ] Yes  [ ] No  [ ] Anonymous</span>
          <span>Permission to use photos/documents: [ ] Yes  [ ] No  [ ] Ask Later</span>
        </div>
        {story.interviewQuestions.map((item, index) => (
          <article key={item.id} className="print-question">
            <h3>{index + 1}. {item.question}</h3>
            {item.notes ? <p className="print-notes-text">{item.notes}</p> : <BlankNoteLines count={5} />}
          </article>
        ))}
      </section>

      <section>
        <h2>Blank Field Notes</h2>
        <BlankNoteLines count={10} />
      </section>
    </div>
  );
}

function PrintableInterviewChecklist({ story }) {
  return (
    <div className="print-packet">
      <header className="print-packet-header">
        <p className="print-kicker">The LostCompass Project</p>
        <h1>Interview Checklist</h1>
        <p>{story.title}</p>
      </header>

      <section className="print-field-grid">
        <span>Interviewer name: ________________________________</span>
        <span>Interviewee name: ________________________________</span>
        <span>Date: ___________________</span>
        <span>Location: _________________________________</span>
        <span>Permission to quote: [ ] Yes  [ ] No  [ ] Anonymous</span>
        <span>Permission to use photos/documents: [ ] Yes  [ ] No  [ ] Ask Later</span>
      </section>

      <section>
        <h2>Questions</h2>
        {story.interviewQuestions.map((item, index) => (
          <article key={item.id} className="print-question">
            <h3>{index + 1}. {item.question}</h3>
            {item.notes ? <p className="print-notes-text">{item.notes}</p> : <BlankNoteLines count={6} />}
          </article>
        ))}
      </section>
    </div>
  );
}

export function StoryArticleGrid({ stories }) {
  return (
    <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Story Archive"
          title="Field notes, forgotten places, and local history"
          text="Draft and published stories from the trail, including researched articles, field notes, conservation leads, and forgotten-place records."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story.id || story.slug} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] transition duration-300 hover:-translate-y-1 hover:border-compass-gold/50">
              <a href={`#${getStoryPath(story)}`} className="block">
                <div className="aspect-[16/10] bg-[linear-gradient(135deg,#121817,#244436)]">
                  {story.heroImage ? (
                    <img
                      src={story.heroImage}
                      alt=""
                      className="h-full w-full object-cover opacity-88"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center text-xs font-black uppercase tracking-[0.18em] text-compass-gold/80">
                      The Lost Compass Project
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-compass-gold/40 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-compass-gold">
                      {story.category}
                    </span>
                    <span className="rounded-full border border-compass-teal/35 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-compass-teal">
                      {story.status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black uppercase leading-tight text-compass-parchment">{story.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-compass-muted">{story.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-compass-gold">
                    {story.status === 'Published' ? 'Read Story' : 'Read Draft'} <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StoryArticlePage({ story }) {
  if (!story) {
    return (
      <>
        <PageHero eyebrow="Story Not Found" title="This trail record is not available." text="Return to Stories From The Trail to choose an available article." />
        <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <a href="#/stories" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-compass-gold px-6 text-sm font-black uppercase tracking-[0.16em] text-compass-black">
              Back To Stories
            </a>
          </div>
        </section>
      </>
    );
  }

  const researchList = story.researchItems?.length
    ? story.researchItems.map((item) => ({ id: item.id, text: item.question }))
    : story.researchChecklist;
  const storyDate = formatStoryDate(story.date || story.createdAt);
  const metaItems = [
    ['Category', story.category],
    ['Location', story.location],
    ['Author', story.author],
    ['Date', storyDate],
  ].filter(([, value]) => String(value || '').trim());

  return (
    <>
      <PageHero eyebrow={`${story.category} / ${story.status}`} title={story.title} text={story.subtitle} />
      <article className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#121817,#244436)]">
              {story.heroImage ? (
                <img
                  src={story.heroImage}
                  alt={story.heroImageAlt}
                  className="max-h-[34rem] w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="flex min-h-[18rem] items-center justify-center p-8 text-center text-sm font-black uppercase tracking-[0.2em] text-compass-gold/80">
                  The Lost Compass Project
                </div>
              )}
            </div>
            {metaItems.length ? (
              <dl className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-5 sm:grid-cols-2">
                {metaItems.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-black uppercase tracking-[0.18em] text-compass-gold">{label}</dt>
                    <dd className="mt-2 text-sm leading-6 text-compass-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {story.status !== 'Published' && <div className="mt-8 rounded-lg border border-compass-gold/30 bg-compass-gold/10 p-5">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-compass-gold">
                <AlertTriangle size={18} /> Draft / Human Review Required
              </p>
              <p className="mt-3 text-sm font-bold leading-7 text-compass-parchment">
                Draft Status: Human review required.
              </p>
              <p className="mt-3 text-sm leading-7 text-compass-muted">
                This article framework is not final historical reporting. Research notes, source links, access details, and human review are required before public publishing.
              </p>
            </div>
            }
            <div className="mt-10 space-y-10">
              {story.sections.map((section) => (
                <section key={section.id} className="rounded-lg border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                  <h2 className="text-3xl font-black uppercase leading-tight text-compass-parchment">{section.heading}</h2>
                  <p className="mt-5 whitespace-pre-line text-base leading-8 text-compass-muted">{section.body}</p>
                  {section.imagePath ? (
                    <figure className="mt-6 overflow-hidden rounded-md border border-white/10 bg-compass-ink">
                      <img
                        src={section.imagePath}
                        alt={section.imageAlt || ''}
                        className="w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                      {section.imageCaption ? <figcaption className="p-4 text-sm leading-6 text-compass-muted">{section.imageCaption}</figcaption> : null}
                    </figure>
                  ) : null}
                </section>
              ))}
            </div>
            {story.gallery.length ? (
              <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.045] p-6 sm:p-8">
                <h2 className="text-3xl font-black uppercase text-compass-parchment">Gallery Drafts</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {story.gallery.map((item) => (
                    <figure key={item.id} className="overflow-hidden rounded-md border border-white/10 bg-compass-ink">
                      {item.imagePath ? (
                        <img
                          src={item.imagePath}
                          alt={item.altText || ''}
                          className="aspect-[4/3] w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <figcaption className="p-4 text-sm leading-6 text-compass-muted">{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
          <aside className="sticky top-24 space-y-5">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-compass-gold">Location / Region</p>
              <p className="mt-3 text-sm leading-7 text-compass-muted">{story.location}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-compass-gold">{story.status === 'Published' ? 'About This History' : 'Research Needed'}</p>
              {story.status === 'Published' && <p className="mt-3 text-sm leading-7 text-compass-muted">{story.researchNotes}</p>}
              <ul className="mt-4 space-y-3 text-sm leading-6 text-compass-muted">
                {researchList.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-compass-teal" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-compass-gold">Sources Notes</p>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-compass-muted">{story.sourcesNotes}</p>
            </div>
            <a href="#/stories" className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-lg border border-compass-gold/45 px-5 text-sm font-black uppercase tracking-[0.14em] text-compass-gold transition hover:bg-compass-gold hover:text-compass-black">
              Back To Stories <ArrowRight size={17} />
            </a>
          </aside>
        </div>
      </article>
    </>
  );
}

export function StoryManagerPage({ stories, setStories }) {
  const orderedStories = useMemo(() => [...stories], [stories]);
  const firstStory = orderedStories[0];
  const [selectedSlug, setSelectedSlug] = useState(firstStory?.slug || '');
  const [draft, setDraft] = useState(() => (firstStory ? normalizeStory(firstStory) : createEmptyStory()));
  const [deletedStoryIds, setDeletedStoryIds] = useState(() => readStoredStoryPayload().deletedStoryIds);
  const [message, setMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [printMode, setPrintMode] = useState('');

  const duplicateSlug = draft.slug
    ? stories.some((story) => story.slug === draft.slug && story.id !== draft.id)
    : false;
  const previewStory = normalizeStory({
    ...draft,
    slug: draft.slug || toSlug(draft.title),
    status: draft.status || 'Draft / Human Review Required',
  });
  const missingRequired = getMissingRequiredFields(previewStory);

  function getMissingRequiredFields(story) {
    return [
      ['Title', story.title],
      ['Slug', story.slug],
      ['Subtitle', story.subtitle],
      ['Category', story.category],
      ['Location / Region', story.location],
      ['Status', story.status],
      ['Excerpt', story.excerpt],
      ['Hero image path', story.heroImage],
      ['Hero image alt text', story.heroImageAlt],
    ].filter(([, value]) => !String(value || '').trim()).map(([label]) => label);
  }

  function setDraftValue(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleTitleChange(value) {
    setDraft((current) => ({
      ...current,
      title: value,
      slug: current.slug ? current.slug : toSlug(value),
    }));
  }

  function beginAdd() {
    const next = createEmptyStory();
    setSelectedSlug('');
    setDraft(next);
    setPreviewOpen(false);
    setPrintMode('');
    setMessage('New blank story form ready. Fill required fields, then Save Story or Save as Draft.');
  }

  function beginEdit(story) {
    setSelectedSlug(story.slug);
    setDraft(normalizeStory(story));
    setPreviewOpen(false);
    setPrintMode('');
    setMessage(`Editing ${story.title}`);
  }

  function saveDraft(statusOverride) {
    try {
      const normalized = normalizeStory({
        ...draft,
        slug: draft.slug || toSlug(draft.title),
        status: statusOverride || draft.status || 'Draft / Human Review Required',
        createdAt: draft.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const nextMissingRequired = getMissingRequiredFields(normalized);

      if (nextMissingRequired.length) {
        setDraft(normalized);
        setMessage(`Error: missing required fields: ${nextMissingRequired.join(', ')}`);
        return;
      }

      if (stories.some((story) => story.slug === normalized.slug && story.id !== normalized.id)) {
        setDraft(normalized);
        setMessage(`Error: duplicate slug "${normalized.slug}" is already used by another story.`);
        return;
      }

      const existingIndex = stories.findIndex((story) => story.id === normalized.id);
      const nextStories = existingIndex >= 0
        ? stories.map((story) => (story.id === normalized.id ? normalized : story))
        : [...stories, normalized];
      const nextDeletedIds = deletedStoryIds.filter((id) => id !== normalized.id);

      setStories(nextStories);
      setDeletedStoryIds(nextDeletedIds);
      saveStories(nextStories, nextDeletedIds);
      setSelectedSlug(normalized.slug);
      setDraft(normalized);
      setPrintMode('');
      setMessage(statusOverride ? `Draft saved: ${normalized.title}` : `Saved successfully: ${normalized.title}`);
    } catch (error) {
      console.error('Error saving story:', error);
      setMessage(`Error: ${error.message || 'Save failed'}`);
    }
  }

  function deleteStory(storySlug = selectedSlug) {
    const storyToDelete = stories.find((story) => story.slug === storySlug || story.id === draft.id);

    if (!storyToDelete) {
      setDraft(createEmptyStory());
      setMessage('Unsaved story cleared.');
      return;
    }

    const confirmed = window.confirm(`Delete "${storyToDelete?.title || storySlug}" from local story drafts?`);
    if (!confirmed) {
      setMessage('Delete canceled.');
      return;
    }

    const storedIds = new Set(readStoredStoryPayload().stories.map((story) => story.id));
    const defaultIds = new Set(defaultStories.map((story) => story.id));

    if (defaultIds.has(storyToDelete.id)) {
      const seedStory = normalizeStory(defaultStories.find((story) => story.id === storyToDelete.id));
      const localStories = stories.filter((story) => story.id !== storyToDelete.id);
      const defaultIndex = defaultStories.findIndex((story) => story.id === seedStory.id);
      const insertIndex = defaultIndex >= 0 ? defaultIndex : 0;
      const nextStories = [
        ...localStories.slice(0, insertIndex),
        seedStory,
        ...localStories.slice(insertIndex),
      ];
      const nextDeletedIds = deletedStoryIds.filter((id) => id !== storyToDelete.id);

      setStories(nextStories);
      setDeletedStoryIds(nextDeletedIds);
      saveStories(nextStories, nextDeletedIds);
      setSelectedSlug(seedStory.slug);
      setDraft(seedStory);
      setPreviewOpen(false);
      setPrintMode('');
      setMessage('Default seed story restored. Local edits were removed, but the article remains in the archive.');
      return;
    }

    const nextStories = stories.filter((story) => story.id !== storyToDelete.id);
    const nextDeletedIds = deletedStoryIds;

    setStories(nextStories);
    setDeletedStoryIds(nextDeletedIds);
    saveStories(nextStories, nextDeletedIds);
    const nextDraft = nextStories[0] ? normalizeStory(nextStories[0]) : createEmptyStory();
    setSelectedSlug(nextStories[0]?.slug || '');
    setDraft(nextDraft);
    setPreviewOpen(false);
    setPrintMode('');
    setMessage('Story deleted from local draft storage.');
  }

  function cancelEditing() {
    const selectedStory = stories.find((story) => story.slug === selectedSlug);
    if (selectedStory) {
      setDraft(normalizeStory(selectedStory));
      setPrintMode('');
      setMessage('Editing canceled. Form restored to the saved story record.');
      return;
    }

    setDraft(createEmptyStory());
    setSelectedSlug('');
    setPrintMode('');
    setMessage('Editing canceled. Unsaved new story cleared.');
  }

  function resetLocalDrafts() {
    const confirmed = window.confirm('Reset local story drafts and clear browser localStorage for Story Manager V0.1? This restores the default story data file records.');
    if (!confirmed) {
      setMessage('Reset canceled.');
      return;
    }

    clearStoredStories();
    const restoredStories = defaultStories.map((story) => normalizeStory(story));
    setStories(restoredStories);
    setDeletedStoryIds([]);
    setSelectedSlug(restoredStories[0]?.slug || '');
    setDraft(restoredStories[0] ? normalizeStory(restoredStories[0]) : createEmptyStory());
    setPreviewOpen(false);
    setPrintMode('');
    setMessage('Local drafts reset. Default story records restored from the data file.');
  }

  function addSection() {
    setDraft((current) => ({
      ...current,
      sections: [...current.sections, createSectionDraft()],
    }));
  }

  function addGalleryItem() {
    setDraft((current) => ({
      ...current,
      gallery: [...current.gallery, createGalleryDraft()],
    }));
  }

  function addChecklistItem() {
    setDraft((current) => ({
      ...current,
      researchChecklist: [...current.researchChecklist, createChecklistDraft()],
    }));
  }

  function addResearchItem() {
    setDraft((current) => ({
      ...current,
      researchItems: [...(current.researchItems || []), createResearchItemDraft()],
    }));
  }

  function addInterviewQuestion() {
    setDraft((current) => ({
      ...current,
      interviewQuestions: [...(current.interviewQuestions || []), createInterviewQuestionDraft()],
    }));
  }

  function resetInterviewQuestions() {
    const confirmed = window.confirm('Reset interview questions to the base LostCompass interview checklist? Current custom questions will be replaced.');
    if (!confirmed) {
      setMessage('Reset interview questions canceled.');
      return;
    }

    setDraft((current) => ({
      ...current,
      interviewQuestions: baseInterviewQuestions.map((question) => ({ ...question })),
    }));
    setMessage('Interview questions reset to base questions. Save Story to preserve this change.');
  }

  function previewDraft() {
    try {
      setPreviewOpen((value) => !value);
      setMessage('Preview ready.');
    } catch (error) {
      console.error('Error previewing story:', error);
      setMessage(`Error: ${error.message || 'Preview failed'}`);
    }
  }

  function printPacket(mode) {
    try {
      setPrintMode(mode);
      setMessage(mode === 'research' ? 'Research packet ready.' : 'Interview checklist ready.');
      window.setTimeout(() => {
        window.print();
      }, 100);
    } catch (error) {
      console.error('Error preparing print packet:', error);
      setMessage(`Error: ${error.message || 'Print failed'}`);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Story Manager / Article Admin V0.1"
        title="Manage Stories From The Trail drafts."
        text="Local draft admin. Saved in this browser only. Not for public deployment without authentication."
      />
      <section className="bg-compass-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.34fr_0.66fr]">
          <aside className="space-y-5">
            <div className="rounded-lg border border-compass-gold/35 bg-compass-gold/10 p-5">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-compass-gold">
                <AlertTriangle size={18} /> Local Only
              </p>
              <p className="mt-3 text-sm leading-7 text-compass-muted">
                Local draft admin. Saved in this browser only. Not for public deployment without authentication.
              </p>
              <p className="mt-3 text-sm font-semibold leading-7 text-compass-parchment">
                This admin page is for local drafting only. Do not deploy publicly without authentication.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={beginAdd} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-compass-gold px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-black">
                  <Plus size={16} /> Add New
                </button>
                <button type="button" onClick={() => saveDraft()} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                  <Save size={16} /> Save
                </button>
                <button type="button" onClick={cancelEditing} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-parchment">
                  <X size={16} /> Cancel
                </button>
                <button type="button" onClick={() => deleteStory()} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-400/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-red-200">
                  <Trash2 size={16} /> Delete
                </button>
                <button type="button" onClick={resetLocalDrafts} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-teal/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-teal">
                  <RotateCcw size={16} /> Reset Local Drafts / Clear Local Storage
                </button>
              </div>
              {message ? <p className="mt-4 text-sm leading-6 text-compass-muted">{message}</p> : null}
              {duplicateSlug ? <p className="mt-3 text-sm font-bold leading-6 text-red-200">Duplicate slug warning: this slug is already used by another story.</p> : null}
              {missingRequired.length ? <p className="mt-3 text-sm leading-6 text-compass-muted">Required fields still empty: {missingRequired.join(', ')}</p> : null}
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <h2 className="flex items-center gap-2 text-xl font-black uppercase text-compass-parchment">
                <FileText size={20} className="text-compass-gold" /> Story List
              </h2>
              <div className="mt-5 space-y-3">
                {orderedStories.map((story) => (
                  <div key={story.id || story.slug} className="rounded-md border border-white/10 bg-compass-black/55 p-4">
                    <p className="text-sm font-bold leading-6 text-compass-parchment">{story.title}</p>
                    <dl className="mt-3 grid gap-2 text-xs leading-5 text-compass-muted">
                      <div>
                        <dt className="font-black uppercase tracking-[0.14em] text-compass-gold">Slug</dt>
                        <dd>{story.slug}</dd>
                      </div>
                      <div>
                        <dt className="font-black uppercase tracking-[0.14em] text-compass-gold">Category</dt>
                        <dd>{story.category}</dd>
                      </div>
                      <div>
                        <dt className="font-black uppercase tracking-[0.14em] text-compass-gold">Status</dt>
                        <dd>{story.status}</dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" onClick={() => beginEdit(story)} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment">
                        <Edit3 size={14} /> Edit
                      </button>
                      <a href={`#${getStoryPath(story)}`} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-compass-teal/45 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-teal">
                        <Eye size={14} /> Preview
                      </a>
                      <button type="button" onClick={() => deleteStory(story.slug)} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-red-400/35 px-3 text-xs font-black uppercase tracking-[0.12em] text-red-200">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-black uppercase text-compass-parchment">Article Record</h2>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => saveDraft()} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-compass-gold px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-black">
                    <Save size={16} /> Save Story
                  </button>
                  <button type="button" onClick={() => saveDraft('Draft / Human Review Required')} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                    <Save size={16} /> Save as Draft
                  </button>
                  <button type="button" onClick={previewDraft} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-teal/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-teal">
                    <Eye size={16} /> Preview Story
                  </button>
                  <button type="button" onClick={cancelEditing} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-parchment">
                    <X size={16} /> Cancel Editing
                  </button>
                  <button type="button" onClick={() => deleteStory()} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-red-400/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-red-200">
                    <Trash2 size={16} /> Delete Story
                  </button>
                </div>
              </div>
              <p className="mb-5 rounded-md border border-white/10 bg-compass-black/55 p-4 text-sm leading-7 text-compass-muted">
                {imagePathInstructions}
              </p>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Title">
                  <input value={draft.title || ''} onChange={(event) => handleTitleChange(event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Slug">
                  <input value={draft.slug || ''} onChange={(event) => setDraftValue('slug', event.target.value ? toSlug(event.target.value) : '')} className={inputClass()} />
                </Field>
                <Field label="Subtitle">
                  <textarea value={draft.subtitle || ''} onChange={(event) => setDraftValue('subtitle', event.target.value)} rows="3" className={inputClass()} />
                </Field>
                <Field label="Excerpt">
                  <textarea value={draft.excerpt || ''} onChange={(event) => setDraftValue('excerpt', event.target.value)} rows="3" className={inputClass()} />
                </Field>
                <Field label="Category">
                  <input value={draft.category || ''} onChange={(event) => setDraftValue('category', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Location / Region">
                  <input value={draft.location || ''} onChange={(event) => setDraftValue('location', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Hero Image Path">
                  <input value={draft.heroImage || ''} onChange={(event) => setDraftValue('heroImage', event.target.value)} placeholder="/assets/images/stories/story-slug/hero.webp" className={inputClass()} />
                </Field>
                <Field label="Hero Image Alt Text">
                  <input value={draft.heroImageAlt || ''} onChange={(event) => setDraftValue('heroImageAlt', event.target.value)} className={inputClass()} />
                </Field>
                <Field label="Status">
                  <select value={draft.status || 'Draft / Human Review Required'} onChange={(event) => setDraftValue('status', event.target.value)} className={inputClass()}>
                    {storyStatuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-2 text-2xl font-black uppercase text-compass-parchment">
                  <FileText size={22} className="text-compass-gold" /> Article Sections
                </h2>
                <button type="button" onClick={addSection} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                  <Plus size={16} /> Add Section
                </button>
              </div>
              <div className="mt-6 space-y-5">
                {draft.sections.map((section, index) => (
                  <div key={section.id} className="rounded-md border border-white/10 bg-compass-black/55 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-compass-teal">Block {index + 1}</p>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" disabled={index === 0} onClick={() => setDraftValue('sections', moveAt(draft.sections, index, -1))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment disabled:cursor-not-allowed disabled:opacity-40">
                          <ArrowUp size={14} /> Move Up
                        </button>
                        <button type="button" disabled={index === draft.sections.length - 1} onClick={() => setDraftValue('sections', moveAt(draft.sections, index, 1))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment disabled:cursor-not-allowed disabled:opacity-40">
                          <ArrowDown size={14} /> Move Down
                        </button>
                        <button type="button" onClick={() => setDraftValue('sections', removeAt(draft.sections, index))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-red-400/35 px-3 text-xs font-black uppercase tracking-[0.12em] text-red-200">
                          <Trash2 size={14} /> Delete Section
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-4">
                      <Field label="Heading">
                        <input value={section.heading || ''} onChange={(event) => setDraftValue('sections', updateAt(draft.sections, index, { heading: event.target.value }))} className={inputClass()} />
                      </Field>
                      <Field label="Body Text">
                        <textarea value={section.body || ''} onChange={(event) => setDraftValue('sections', updateAt(draft.sections, index, { body: event.target.value }))} rows="7" className={inputClass()} />
                      </Field>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Optional Image Path">
                          <input value={section.imagePath || ''} onChange={(event) => setDraftValue('sections', updateAt(draft.sections, index, { imagePath: event.target.value }))} className={inputClass()} />
                        </Field>
                        <Field label="Optional Image Alt Text">
                          <input value={section.imageAlt || ''} onChange={(event) => setDraftValue('sections', updateAt(draft.sections, index, { imageAlt: event.target.value }))} className={inputClass()} />
                        </Field>
                        <Field label="Optional Image Caption">
                          <input value={section.imageCaption || ''} onChange={(event) => setDraftValue('sections', updateAt(draft.sections, index, { imageCaption: event.target.value }))} className={inputClass()} />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-black uppercase text-compass-parchment">
                    <Image size={22} className="text-compass-gold" /> Gallery Images
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-compass-muted">{imagePathInstructions}</p>
                </div>
                <button type="button" onClick={addGalleryItem} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                  <Plus size={16} /> Add Gallery Image
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {draft.gallery.map((item, index) => (
                  <div key={item.id} className="rounded-md border border-white/10 bg-compass-black/55 p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                      <Field label="Image Path">
                        <input value={item.imagePath || ''} onChange={(event) => setDraftValue('gallery', updateAt(draft.gallery, index, { imagePath: event.target.value }))} className={inputClass()} />
                      </Field>
                      <Field label="Alt Text">
                        <input value={item.altText || ''} onChange={(event) => setDraftValue('gallery', updateAt(draft.gallery, index, { altText: event.target.value }))} className={inputClass()} />
                      </Field>
                      <Field label="Caption">
                        <input value={item.caption || ''} onChange={(event) => setDraftValue('gallery', updateAt(draft.gallery, index, { caption: event.target.value }))} className={inputClass()} />
                      </Field>
                      <button type="button" onClick={() => setDraftValue('gallery', removeAt(draft.gallery, index))} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-400/35 px-4 text-xs font-black uppercase tracking-[0.12em] text-red-200">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-2xl font-black uppercase text-compass-parchment">
                <ListChecks size={22} className="text-compass-gold" /> Research Record
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Field label="Research Notes">
                  <textarea value={draft.researchNotes || ''} onChange={(event) => setDraftValue('researchNotes', event.target.value)} rows="7" className={inputClass()} />
                </Field>
                <Field label="Sources Notes">
                  <textarea value={draft.sourcesNotes || ''} onChange={(event) => setDraftValue('sourcesNotes', event.target.value)} rows="7" className={inputClass()} />
                </Field>
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-compass-gold">Research-needed checklist</p>
                <button type="button" onClick={addChecklistItem} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-compass-gold/45 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-gold">
                  <Plus size={14} /> Add Item
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {draft.researchChecklist.map((item, index) => (
                  <div key={item.id} className="grid gap-3 md:grid-cols-[1fr_auto]">
                    <input value={item.text || ''} onChange={(event) => setDraftValue('researchChecklist', updateAt(draft.researchChecklist, index, { text: event.target.value }))} className={inputClass()} />
                    <button type="button" onClick={() => setDraftValue('researchChecklist', removeAt(draft.researchChecklist, index))} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-400/35 px-4 text-xs font-black uppercase tracking-[0.12em] text-red-200">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-compass-teal/25 bg-white/[0.055] p-5 sm:p-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-black uppercase text-compass-parchment">
                    <ListChecks size={22} className="text-compass-gold" /> Research & Interview Toolkit
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-compass-muted">
                    Build printable research packets, track source checks, and prepare interview notes for field work. Save Story or Save as Draft preserves these records in localStorage.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => saveDraft()} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-compass-gold px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-black">
                    <Save size={16} /> Save Story
                  </button>
                  <button type="button" onClick={() => saveDraft('Draft / Human Review Required')} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                    <Save size={16} /> Save as Draft
                  </button>
                </div>
              </div>

              <div className="mt-8 rounded-md border border-white/10 bg-compass-black/55 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-black uppercase text-compass-parchment">Research Needed</h3>
                    <p className="mt-2 text-sm leading-7 text-compass-muted">Each item includes a few lines of notes, source/contact tracking, date checked, and verification status.</p>
                  </div>
                  <button type="button" onClick={addResearchItem} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                    <Plus size={16} /> Add Research Item
                  </button>
                </div>

                <div className="mt-5 space-y-5">
                  {(draft.researchItems || []).map((item, index) => (
                    <div key={item.id} className="rounded-md border border-white/10 bg-compass-black/70 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-compass-teal">Research Item {index + 1}</p>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setMessage(`Editing research item ${index + 1}.`)} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment">
                            <Edit3 size={14} /> Edit Item
                          </button>
                          <button type="button" disabled={index === 0} onClick={() => setDraftValue('researchItems', moveAt(draft.researchItems || [], index, -1))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment disabled:cursor-not-allowed disabled:opacity-40">
                            <ArrowUp size={14} /> Move Up
                          </button>
                          <button type="button" disabled={index === (draft.researchItems || []).length - 1} onClick={() => setDraftValue('researchItems', moveAt(draft.researchItems || [], index, 1))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment disabled:cursor-not-allowed disabled:opacity-40">
                            <ArrowDown size={14} /> Move Down
                          </button>
                          <button type="button" onClick={() => setDraftValue('researchItems', removeAt(draft.researchItems || [], index))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-red-400/35 px-3 text-xs font-black uppercase tracking-[0.12em] text-red-200">
                            <Trash2 size={14} /> Delete Item
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <Field label="Question / Research Item">
                          <textarea value={item.question || ''} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { question: event.target.value }))} rows="3" className={inputClass()} />
                        </Field>
                        <Field label="Category">
                          <input value={item.category || ''} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { category: event.target.value }))} className={inputClass()} />
                        </Field>
                        <Field label="Priority">
                          <select value={item.priority || 'Medium'} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { priority: event.target.value }))} className={inputClass()}>
                            {researchPriorities.map((priority) => (
                              <option key={priority} value={priority}>{priority}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Status">
                          <select value={item.status || 'Needed'} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { status: event.target.value }))} className={inputClass()}>
                            {researchItemStatuses.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Source / Contact">
                          <textarea value={item.sourceContact || ''} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { sourceContact: event.target.value }))} rows="3" className={inputClass()} />
                        </Field>
                        <Field label="Date Checked">
                          <input type="date" value={item.dateChecked || ''} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { dateChecked: event.target.value }))} className={inputClass()} />
                        </Field>
                        <label className="flex min-h-12 items-center gap-3 rounded-md border border-white/10 bg-compass-black/70 px-4 py-3 text-sm font-bold text-compass-parchment">
                          <input type="checkbox" checked={Boolean(item.verified)} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { verified: event.target.checked, status: event.target.checked ? 'Verified' : item.status || 'Needed' }))} />
                          Verified
                        </label>
                        <div />
                        <Field label="Research Item Notes">
                          <textarea value={item.notes || ''} onChange={(event) => setDraftValue('researchItems', updateAt(draft.researchItems || [], index, { notes: event.target.value }))} rows="5" className={inputClass('md:col-span-2')} />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-md border border-white/10 bg-compass-black/55 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-black uppercase text-compass-parchment">Interview Questions</h3>
                    <p className="mt-2 text-sm leading-7 text-compass-muted">Base questions plus custom story-specific prompts. Use notes for prep reminders or interview context.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={addInterviewQuestion} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                      <Plus size={16} /> Add Question
                    </button>
                    <button type="button" onClick={resetInterviewQuestions} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-teal/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-teal">
                      <RotateCcw size={16} /> Reset To Base Questions
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {(draft.interviewQuestions || []).map((item, index) => (
                    <div key={item.id} className="rounded-md border border-white/10 bg-compass-black/70 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-compass-teal">Question {index + 1}</p>
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setMessage(`Editing interview question ${index + 1}.`)} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black uppercase tracking-[0.12em] text-compass-parchment">
                            <Edit3 size={14} /> Edit Question
                          </button>
                          <button type="button" onClick={() => setDraftValue('interviewQuestions', removeAt(draft.interviewQuestions || [], index))} className="inline-flex min-h-9 items-center gap-2 rounded-md border border-red-400/35 px-3 text-xs font-black uppercase tracking-[0.12em] text-red-200">
                            <Trash2 size={14} /> Delete Question
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
                        <Field label="Question">
                          <textarea value={item.question || ''} onChange={(event) => setDraftValue('interviewQuestions', updateAt(draft.interviewQuestions || [], index, { question: event.target.value }))} rows="3" className={inputClass()} />
                        </Field>
                        <label className="flex min-h-12 items-center gap-3 rounded-md border border-white/10 bg-compass-black/70 px-4 py-3 text-sm font-bold text-compass-parchment md:self-end">
                          <input type="checkbox" checked={Boolean(item.required)} onChange={(event) => setDraftValue('interviewQuestions', updateAt(draft.interviewQuestions || [], index, { required: event.target.checked }))} />
                          Required
                        </label>
                        <Field label="Question Notes">
                          <textarea value={item.notes || ''} onChange={(event) => setDraftValue('interviewQuestions', updateAt(draft.interviewQuestions || [], index, { notes: event.target.value }))} rows="4" className={inputClass()} />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-md border border-white/10 bg-compass-black/55 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-black uppercase text-compass-parchment">Printable Packets</h3>
                    <p className="mt-2 text-sm leading-7 text-compass-muted">Browser print is used for V0.1. The print view switches to white background, black text, checkboxes, and blank note lines.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => printPacket('research')} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-gold/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-gold">
                      <Printer size={16} /> Print Research Packet
                    </button>
                    <button type="button" onClick={() => printPacket('interview')} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-compass-teal/45 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-teal">
                      <Printer size={16} /> Print Interview Checklist
                    </button>
                    {printMode ? (
                      <button type="button" onClick={() => setPrintMode('')} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-xs font-black uppercase tracking-[0.14em] text-compass-parchment">
                        <X size={16} /> Close Print Preview
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {printMode ? (
        <section className="print-area">
          {printMode === 'research' ? <PrintableResearchPacket story={previewStory} /> : <PrintableInterviewChecklist story={previewStory} />}
        </section>
      ) : null}
      {previewOpen ? (
        <section className="border-t border-compass-gold/25">
          <StoryArticlePage story={previewStory} />
        </section>
      ) : null}
    </>
  );
}
