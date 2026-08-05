import { Package, MapPin, Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { headquarters } from '@/lib/branches';

interface FooterProps {
  onNavigate: (path: string) => void;
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.73 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useI18n();

  const linkGroups = [
    {
      title: t.nav.home,
      links: [
        { label: t.nav.home, path: '/' },
        { label: t.nav.services, path: '/services' },
        { label: t.nav.branches, path: '/branches' },
      ],
    },
    {
      title: t.nav.contact,
      links: [
        { label: t.nav.contact, path: '/contact' },
        { label: t.nav.faq, path: '/faq' },
        { label: t.nav.quote, path: '/faq' },
      ],
    },
  ];

  const socials = [
    { Icon: Instagram, label: 'Instagram', href: `https://instagram.com/worldwaycargo` },
    { Icon: TikTokIcon, label: 'TikTok', href: 'https://tiktok.com/@worldwaycargo' },
    { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com/worldwaycargo' },
    { Icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${headquarters.whatsapp.replace(/\D/g, '')}` },
  ];

  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-300">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
                <Package className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-display text-base font-bold text-white">
                Worldway<span className="text-primary-400">-cargo</span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Global leader in shipping electronics and accessories by air, sea, and land. Trusted since 2010 across Asia, Europe, and the Americas.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-ink-300 transition-all hover:bg-primary-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white">{group.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => onNavigate(link.path)} className="text-sm text-ink-400 transition-colors hover:text-primary-400">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* HQ contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">Main Headquarters</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" />
                <span className="text-ink-400">{headquarters.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary-400" />
                <a href={`tel:${headquarters.phone.replace(/\s/g, '')}`} className="text-ink-400 hover:text-primary-400">
                  {headquarters.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary-400" />
                <a href={`mailto:${headquarters.email}`} className="text-ink-400 hover:text-primary-400">
                  {headquarters.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Worldway-cargo. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-success-500" />
            ISO 9001 Certified · Fully Insured · Founded 2010
          </p>
        </div>
      </div>
    </footer>
  );
}
