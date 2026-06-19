import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const steps = section.querySelectorAll('.process-step');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      steps,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
    );

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.out', transformOrigin: 'left center' },
        '-=0.8'
      );
    }

    return () => { tl.kill(); };
  }, [lang]);

  return (
    <section
      id="process"
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
          }}
        >
          {lang === 'en' ? `${translations.process.label.zh} / ${translations.process.label.en}` : `${translations.process.label.en} / ${translations.process.label.zh}`}
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            lineHeight: 1.15,
            fontWeight: 700,
            color: '#F5F5F0',
            marginBottom: '60px',
          }}
        >
          {translations.process.headline[lang]}
        </h2>

        {/* Connecting line - desktop only */}
        <div className="hidden md:block" style={{ position: 'relative', marginBottom: '-30px' }}>
          <div
            ref={lineRef}
            style={{
              height: '1px',
              background: 'rgba(245, 245, 240, 0.15)',
              position: 'absolute',
              top: '24px',
              left: '0',
              right: '0',
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: '32px' }}>
          {translations.process.steps.map((step, index) => (
            <div key={index} className="process-step relative">
              <span
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#FFB800',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '20px',
                }}
              >
                {step.num}
              </span>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#F5F5F0',
                  marginBottom: '12px',
                }}
              >
                {step.title[lang]}
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'rgba(245, 245, 240, 0.7)',
                }}
              >
                {step.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
