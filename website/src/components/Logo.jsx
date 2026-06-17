export default function Logo({ size = 'md', showText = true }) {
  const dimensions = size === 'lg' ? 'h-28 w-28' : size === 'sm' ? 'h-9 w-9' : 'h-12 w-12';

  return (
    <a href="#/" className="group inline-flex items-center gap-3" aria-label="The Lost Compass Project home">
      <img
        src="/assets/logos/compass-rose-transparent.webp"
        alt=""
        className={`${dimensions} shrink-0 object-contain drop-shadow-[0_0_18px_rgba(201,154,59,0.22)] transition duration-300 ease-out group-hover:rotate-[8deg] group-hover:scale-[1.035] group-hover:drop-shadow-[0_0_24px_rgba(201,154,59,0.34)]`}
      />
      {showText ? (
        <span className="leading-none">
          <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-compass-gold">
            The Lost
          </span>
          <span className="block text-sm font-black uppercase tracking-[0.2em] text-compass-parchment">
            Compass Project
          </span>
        </span>
      ) : null}
    </a>
  );
}
