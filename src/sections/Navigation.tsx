import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';

const navLinks = [
  { key: 'services', target: '#services' },
  { key: 'process', target: '#process' },
  { key: 'clients', target: '#clients' },
  { key: 'pricing', target: '#pricing' },
  { key: 'contact', target: '#contact' },
] as const;

export default function Navigation() {
  const { lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 100,
        height: '72px',
        background: 'rgba(245, 245, 240, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(27, 42, 74, 0.08)',
        transition: 'box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div
        className="flex items-center justify-between h-full"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Wordmark */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 no-underline"
          style={{ color: '#1B2A4A' }}
        >
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.06em' }}>
            {translations.nav.brand.en}
          </span>
          <span style={{ color: '#6B7280', fontWeight: 300 }}>/</span>
          <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>
            {translations.nav.brand.zh}
          </span>
        </a>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="no-underline"
              style={{
                color: '#6B7280',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#1B2A4A'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6B7280'; }}
            >
              {(
                translations.nav[link.key as keyof typeof translations.nav] as { en: string; zh: string }
              )[lang]}
            </a>
          ))}
        </div>

        {/* Right: Bilingual Toggle + CTA */}
        <div className="flex items-center" style={{ gap: '16px' }}>
          <div className="flex items-center" style={{ gap: '4px' }}>
            <button
              onClick={() => { if (lang !== 'en') toggleLang(); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: lang === 'en' ? '#1B2A4A' : '#6B7280',
                fontWeight: lang === 'en' ? 600 : 400,
                fontSize: '0.875rem',
                padding: '4px 6px',
                transition: 'color 0.2s ease',
              }}
            >
              EN
            </button>
            <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>/</span>
            <button
              onClick={() => { if (lang !== 'zh') toggleLang(); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: lang === 'zh' ? '#1B2A4A' : '#6B7280',
                fontWeight: lang === 'zh' ? 600 : 400,
                fontSize: '0.875rem',
                padding: '4px 6px',
                transition: 'color 0.2s ease',
              }}
            >
              中
            </button>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-block no-underline"
            style={{
              background: '#FFB800',
              color: '#1B2A4A',
              padding: '10px 28px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-1px)';
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(255, 184, 0, 0.35)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {translations.nav.cta[lang]}
          </a>
        </div>
      </div>
    </nav>
  );
}
