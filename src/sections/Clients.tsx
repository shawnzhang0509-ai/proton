import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = section.querySelectorAll('.client-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      cards,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
    );

    return () => { tl.kill(); };
  }, [lang]);

  return (
    <section
      id="clients"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#F5F5F0',
        padding: '120px 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
        <span
          style={{
            color: '#FFB800',
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '20px',
          }}
        >
          {lang === 'en' ? `${translations.clients.label.zh} / ${translations.clients.label.en}` : `${translations.clients.label.en} / ${translations.clients.label.zh}`}
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#1B2A4A',
            marginBottom: '48px',
          }}
        >
          {translations.clients.headline[lang]}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '32px' }}>
          {translations.clients.cards.map((card, index) => (
            <div
              key={index}
              className="client-card"
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '40px 32px',
                border: '1px solid rgba(27, 42, 74, 0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: 'rgba(255, 184, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '1.5rem',
                }}
              >
                {index === 0 && '🛒'}
                {index === 1 && '🎓'}
                {index === 2 && '🏪'}
                {index === 3 && '📋'}
              </div>
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#1B2A4A',
                  marginBottom: '8px',
                }}
              >
                {card.title[lang]}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#6B7280',
                }}
              >
                {card.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
