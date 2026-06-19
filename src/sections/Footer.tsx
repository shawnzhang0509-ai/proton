import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      section.querySelector('.footer-content'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    return () => { tl.kill(); };
  }, [lang]);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#F5F5F0',
        borderTop: '1px solid rgba(27, 42, 74, 0.08)',
      }}
    >
      <div
        className="footer-content"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: '48px', marginBottom: '60px' }}>
          {/* Left: CTA */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                lineHeight: 1.15,
                fontWeight: 700,
                color: '#1B2A4A',
                marginBottom: '16px',
              }}
            >
              {translations.footer.headline[lang]}
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: '#6B7280',
                maxWidth: '480px',
                marginBottom: '28px',
              }}
            >
              {translations.footer.sub[lang]}
            </p>
            <a
              href={`mailto:${translations.footer.email}`}
              className="inline-block no-underline"
              style={{
                background: '#FFB800',
                color: '#1B2A4A',
                padding: '14px 36px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 184, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {translations.footer.cta[lang]}
            </a>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col" style={{ gap: '16px' }}>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6B7280',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Email
              </span>
              <a
                href={`mailto:${translations.footer.email}`}
                className="no-underline"
                style={{ color: '#1B2A4A', fontWeight: 500, fontSize: '1rem' }}
              >
                {translations.footer.email}
              </a>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6B7280',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Phone
              </span>
              <a
                href={`tel:${translations.footer.phone.replace(/\s/g, '')}`}
                className="no-underline"
                style={{ color: '#1B2A4A', fontWeight: 500, fontSize: '1rem' }}
              >
                {translations.footer.phone}
              </a>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6B7280',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Location
              </span>
              <span style={{ color: '#1B2A4A', fontWeight: 500, fontSize: '1rem' }}>
                {translations.footer.location[lang]}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(27, 42, 74, 0.08)', marginBottom: '32px' }} />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between" style={{ gap: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            {translations.footer.copyright[lang]}
          </span>

          <div className="flex items-center" style={{ gap: '24px' }}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="no-underline"
              style={{ fontSize: '0.85rem', color: '#6B7280', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#1B2A4A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}
            >
              {translations.footer.privacy[lang]}
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="no-underline"
              style={{ fontSize: '0.85rem', color: '#6B7280', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#1B2A4A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#6B7280'; }}
            >
              {translations.footer.terms[lang]}
            </a>
            <div className="flex items-center" style={{ gap: '12px' }}>
              <span style={{ fontSize: '1rem', cursor: 'default' }} title="LinkedIn">💼</span>
              <span style={{ fontSize: '1rem', cursor: 'default' }} title="WeChat">💬</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
