import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../data/siteContent';
import Logo from './Logo';

export default function Header({ currentPath }) {
  const [open, setOpen] = useState(false);
  const isActive = (item) => (
    currentPath === item.path ||
    (item.path === '/stories' && currentPath.startsWith('/stories/')) ||
    (item.path === '/apparel' && (
      currentPath.startsWith('/collections/') ||
      currentPath.startsWith('/products/')
    ))
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-compass-black/78 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Logo size="sm" />
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={`#${item.path}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(item)
                  ? 'bg-compass-gold text-compass-black'
                  : 'text-compass-parchment/82 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-compass-parchment lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/10 bg-compass-black px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                  isActive(item)
                    ? 'bg-compass-gold text-compass-black'
                    : 'bg-white/[0.04] text-compass-parchment'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
