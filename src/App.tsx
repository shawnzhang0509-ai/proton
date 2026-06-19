import ParticleCanvas from '@/components/ParticleCanvas';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import Process from '@/sections/Process';
import Clients from '@/sections/Clients';
import CaseStudy from '@/sections/CaseStudy';
import Pricing from '@/sections/Pricing';
import Footer from '@/sections/Footer';
import { LangContext, useLangState } from '@/hooks/useLang';
import { useLenis } from '@/hooks/useLenis';

export default function App() {
  const { lang, toggleLang } = useLangState();
  useLenis();

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      <ParticleCanvas />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />
        <Hero />
        <Services />
        <Process />
        <Clients />
        <CaseStudy />
        <Pricing />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
