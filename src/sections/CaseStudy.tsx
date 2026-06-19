import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy() {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const img = section.querySelector('.case-img');
    const text = section.querySelector('.case-text');
    const stats = section.querySelectorAll('.case-stat');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    });

    if (img) {
      tl.fromTo(img, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
    }
    if (text) {
      tl.fromTo(text, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.7');
    }
    if (stats.length) {
      tl.fromTo(
        stats,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );
    }

    return () => { tl.kill(); };
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 1,
        background: '#F5F5F0',
        padding: '120px 0',
      }}
    >
      <div
        className="flex flex-col md:flex-row items-center"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Image - 60% */}
        <div className="case-img w-full md:w-[60%]" style={{ position: 'relative' }}>
          <img
            src="/images/img-1.jpg"
            alt="Modern Auckland office"
            style={{
              width: '100%',
              height: '420px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Text - 40%, overlapping */}
        <div
          className="case-text w-full md:w-[45%]"
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '48px 40px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
            marginTop: '32px',
            marginLeft: '0',
          }}
        >
          <span
            style={{
              color: '#FFB800',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            {lang === 'en' ? `${translations.caseStudy.label.zh} / ${translations.caseStudy.label.en}` : `${translations.caseStudy.label.en} / ${translations.caseStudy.label.zh}`}
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              lineHeight: 1.15,
              fontWeight: 700,
              color: '#1B2A4A',
              marginBottom: '20px',
            }}
          >
            {translations.caseStudy.headline[lang]}
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#6B7280',
              marginBottom: '36px',
            }}
          >
            {translations.caseStudy.body[lang]}
          </p>

          <div className="flex flex-wrap" style={{ gap: '32px' }}>
            {translations.caseStudy.stats.map((stat, index) => (
              <div key={index} className="case-stat">
                <span
                  style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#FFB800',
                    display: 'block',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#6B7280',
                    fontWeight: 500,
                  }}
                >
                  {stat.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
