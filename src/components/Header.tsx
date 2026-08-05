import { useEffect, useState } from 'react';
import { Package, Menu, X, Languages, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { headquarters } from '@/lib/branches';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
  const { t, toggleLang, lang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/branches', label: t.nav.branches },
    { path: '/contact', label: t.nav.contact },
    { path: '/faq', label: t.nav.faq },
  ];

  const isActive = (path: string) => (path === '/' ? currentPath === '/' : currentPath.startsWith(path));

  const go = (path: string) => {
    onNavigate(path);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container-x flex h-full items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => go('/')} className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
            <Package className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-start leading-tight">
            <div className={`font-display text-base font-bold ${scrolled ? 'text-ink-900' : 'text-ink-900'}`}>
              Worldway<span className="text-primary-600">-cargo</span>
            </div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-ink-500">{t.brand.tagline}</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.path) ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${headquarters.phone.replace(/\s/g, '')}`}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-primary-700 xl:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="tabular-nums">{headquarters.phone}</span>
          </a>

          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white/80 px-3 py-2 text-sm font-semibold text-ink-700 transition-all hover:border-primary-400 hover:text-primary-700"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" />
            <span>{lang === 'en' ? t.lang.switchTo : t.lang.label}</span>
          </button>

          <button onClick={() => go('/faq')} className="hidden btn-primary !px-4 !py-2.5 sm:inline-flex">
            {t.nav.quote}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={`rounded-lg px-4 py-3 text-start text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'bg-primary-50 text-primary-700' : 'text-ink-700 hover:bg-ink-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => go('/faq')} className="btn-primary mt-2 w-full">
              {t.nav.quote}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
