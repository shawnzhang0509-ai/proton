import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cards = section.querySelectorAll('.pricing-card');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
    );

    return () => { tl.kill(); };
  }, [lang]);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#1B2A4A',
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
            textAlign: 'center',
          }}
        >
          {lang === 'en' ? `${translations.pricing.label.zh} / ${translations.pricing.label.en}` : `${translations.pricing.label.en} / ${translations.pricing.label.zh}`}
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#F5F5F0',
            marginBottom: '60px',
            textAlign: 'center',
          }}
        >
          {translations.pricing.headline[lang]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px', alignItems: 'start' }}>
          {translations.pricing.plans.map((plan, index) => {
            const isRec = 'recommended' in plan && plan.recommended;
            return (
            <div
              key={index}
              className="pricing-card"
              style={{
                background: isRec
                  ? 'rgba(245, 245, 240, 0.08)'
                  : 'rgba(245, 245, 240, 0.05)',
                border: '1px solid rgba(245, 245, 240, 0.1)',
                borderTop: isRec ? '4px solid #FFB800' : '1px solid rgba(245, 245, 240, 0.1)',
                borderRadius: '16px',
                padding: '48px 36px',
                position: 'relative',
              }}
            >
              {isRec && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#FFB800',
                    color: '#1B2A4A',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 16px',
                    borderRadius: '100px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {lang === 'en' ? 'RECOMMENDED' : '推荐'}
                </span>
              )}

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: '#F5F5F0',
                  marginBottom: '4px',
                }}
              >
                {plan.name[lang]}
              </h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(245, 245, 240, 0.5)',
                  marginBottom: '20px',
                }}
              >
                {plan.desc[lang]}
              </p>

              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#F5F5F0',
                  marginBottom: '32px',
                  lineHeight: 1,
                }}
              >
                {typeof plan.price === 'string' ? plan.price : plan.price[lang]}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px 0' }}>
                {plan.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    style={{
                      fontSize: '0.9rem',
                      color: 'rgba(245, 245, 240, 0.7)',
                      padding: '8px 0',
                      borderBottom: fIndex < plan.features.length - 1 ? '1px solid rgba(245, 245, 240, 0.06)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span style={{ color: '#FFB800', fontSize: '0.8rem' }}>✓</span>
                    {feature[lang]}
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: isRec ? '#FFB800' : 'transparent',
                  color: isRec ? '#1B2A4A' : '#F5F5F0',
                  border: isRec ? 'none' : '1px solid rgba(245, 245, 240, 0.25)',
                }}
                onMouseEnter={(e) => {
                  if (isRec) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 184, 0, 0.3)';
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isRec) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  } else {
                    e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.25)';
                  }
                }}
              >
                {plan.cta[lang]}
              </button>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
