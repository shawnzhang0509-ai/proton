import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textCol = textRef.current;
    const accentBlock = accentRef.current;
    if (!section || !textCol || !accentBlock) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const children = textCol.querySelectorAll('.animate-item');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    ).fromTo(
      accentBlock,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    return () => { tl.kill(); };
  }, [lang]);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#process');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#F5F5F0',
        padding: '120px 0',
      }}
    >
      <div
        className="relative flex flex-col md:flex-row items-start"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Text Column - 55% */}
        <div ref={textRef} className="w-full md:w-[55%]" style={{ paddingRight: '40px' }}>
          <span
            className="animate-item block"
            style={{
              color: '#FFB800',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            {lang === 'en' ? `${translations.services.label.zh} / ${translations.services.label.en}` : `${translations.services.label.en} / ${translations.services.label.zh}`}
          </span>

          <h2
            className="animate-item"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              color: '#1B2A4A',
              marginBottom: '24px',
            }}
          >
            {translations.services.headline[lang]}
          </h2>

          <p
            className="animate-item"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.75,
              color: '#6B7280',
              marginBottom: '40px',
              maxWidth: '520px',
            }}
          >
            {translations.services.body[lang]}
          </p>

          <div className="flex flex-col" style={{ gap: '24px' }}>
            {translations.services.items.map((item, index) => (
              <div key={index} className="animate-item flex items-start" style={{ gap: '16px' }}>
                <span
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#FFB800',
                    minWidth: '24px',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#1B2A4A',
                      marginBottom: '4px',
                    }}
                  >
                    {item.title[lang]}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#6B7280', lineHeight: 1.6 }}>
                    {item.desc[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#process"
            onClick={handleCtaClick}
            className="animate-item inline-flex items-center no-underline"
            style={{
              marginTop: '40px',
              color: '#1B2A4A',
              fontWeight: 500,
              fontSize: '0.95rem',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.3s ease',
              gap: '8px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = '#1B2A4A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = 'transparent'; }}
          >
            {translations.services.cta[lang]}
            <span style={{ transition: 'transform 0.3s ease' }}>→</span>
          </a>
        </div>

        {/* Accent Block - 45% */}
        <div
          ref={accentRef}
          className="hidden md:block w-[45%]"
          style={{ position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: 0,
              width: '100%',
              height: '400px',
              background: '#FFB800',
              borderRadius: '12px',
            }}
          />
          <img
            src="/images/img-2.jpg"
            alt="Workspace transformation"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '85%',
              height: '320px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginTop: '60px',
              marginLeft: '-20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
