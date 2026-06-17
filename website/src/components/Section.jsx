export function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="text-sm font-black uppercase tracking-[0.28em] text-compass-gold">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-compass-parchment sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-5 whitespace-pre-line text-base leading-8 text-compass-muted sm:text-lg">{text}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="relative isolate overflow-hidden bg-compass-black px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(201,154,59,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(63,159,152,0.14),transparent_30%),linear-gradient(135deg,#050706,#121817_52%,#244436)]" />
      <img
        src="/assets/logos/compass-rose-transparent.webp"
        alt=""
        className="absolute right-[-4rem] top-24 -z-10 h-72 w-72 object-contain opacity-[0.07] sm:h-96 sm:w-96"
      />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-compass-gold">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-compass-parchment sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-compass-muted sm:text-xl">{text}</p>
        </div>
      </div>
    </section>
  );
}

export function IconCard({ item, tone = 'dark' }) {
  const Icon = item.icon;
  const isLight = tone === 'light';

  return (
    <article
      className={`group relative overflow-hidden rounded-lg border p-6 transition duration-300 ${
        isLight
          ? 'border-compass-black/10 bg-white/70 text-compass-ink shadow-sm'
          : 'border-white/10 bg-white/[0.055] text-compass-parchment hover:-translate-y-1 hover:border-compass-gold/50'
      }`}
    >
      {item.path ? (
        <a
          href={`#${item.path}`}
          className="absolute inset-0 z-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-compass-gold/70 focus:ring-offset-2 focus:ring-offset-compass-black"
          aria-label={item.title}
        />
      ) : null}
      {item.image ? (
        <div className="-mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden border-b border-inherit bg-compass-black">
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-compass-gold/40 bg-compass-gold/12 text-compass-gold">
        <Icon size={23} strokeWidth={1.8} />
      </div>
      {item.eyebrow ? (
        <p className={`mt-5 text-xs font-black uppercase tracking-[0.24em] ${isLight ? 'text-compass-forest' : 'text-compass-teal'}`}>
          {item.eyebrow}
        </p>
      ) : null}
      <h3 className="mt-3 text-xl font-black uppercase tracking-[0.04em]">{item.title}</h3>
      <p className={`mt-3 text-sm leading-7 ${isLight ? 'text-compass-ink/72' : 'text-compass-muted'}`}>{item.text}</p>
    </article>
  );
}
