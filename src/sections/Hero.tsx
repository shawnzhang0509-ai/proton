import { useEffect, useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { translations } from '@/translations';
import gsap from 'gsap';

export default function Hero() {
  const { lang } = useLang();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

    return () => { tl.kill(); };
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center justify-center"
      style={{ height: '100vh', width: '100%', zIndex: 1 }}
    >
      {/* Radial gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(245,245,240,0.6) 0%, transparent 100%)',
        }}
      />

      <div className="relative text-center" style={{ zIndex: 2, padding: '0 1.5rem' }}>
        <h1
          ref={headlineRef}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            fontWeight: 700,
            color: '#1B2A4A',
            textShadow: '0 2px 24px rgba(245, 245, 240, 0.7)',
            opacity: 0,
          }}
        >
          <span className="block">{translations.hero.headline1[lang]}</span>
          <span
            className="block"
            style={{
              fontSize: '0.6em',
              color: '#6B7280',
              fontWeight: 400,
              marginTop: '12px',
              letterSpacing: '0.02em',
            }}
          >
            {lang === 'en' ? translations.hero.headline1.zh : translations.hero.headline1.en}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          style={{
            color: '#6B7280',
            fontSize: '1rem',
            letterSpacing: '0.08em',
            marginTop: '20px',
            fontWeight: 400,
            textShadow: '0 2px 24px rgba(245, 245, 240, 0.7)',
            opacity: 0,
          }}
        >
          {translations.hero.subtitle[lang]}
        </p>

        <a
          ref={ctaRef}
          href="#services"
          onClick={handleCtaClick}
          className="inline-block no-underline"
          style={{
            marginTop: '40px',
            border: '1.5px solid #1B2A4A',
            padding: '14px 36px',
            borderRadius: '100px',
            fontWeight: 500,
            color: '#1B2A4A',
            fontSize: '1rem',
            transition: 'all 0.35s ease',
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = '#1B2A4A';
            el.style.color = '#F5F5F0';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = 'transparent';
            el.style.color = '#1B2A4A';
          }}
        >
          {translations.hero.cta[lang]}
        </a>
      </div>
    </section>
  );
}
