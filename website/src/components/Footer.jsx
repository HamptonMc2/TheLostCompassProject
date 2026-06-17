import { navItems } from '../data/siteContent';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-compass-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xl whitespace-pre-line text-sm leading-7 text-compass-muted">
            Exploring trails, uncovering history, telling meaningful stories, and supporting the people protecting the places we love.

            Find Your Way.
            Explore More.
            Leave It Wild.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-compass-gold">Navigate</h2>
            <div className="mt-4 grid gap-2">
              {navItems.map((item) => (
                <a key={item.path} href={`#${item.path}`} className="text-sm text-compass-parchment/78 hover:text-compass-gold">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-compass-gold">Domain</h2>
            <p className="mt-4 text-sm text-compass-parchment">thelostcompassproject.com</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-compass-muted">
              Draft Status: Human review required.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs uppercase tracking-[0.18em] text-compass-muted">
        © 2026 The Lost Compass Project. Adventure With Purpose.
      </div>
    </footer>
  );
}
