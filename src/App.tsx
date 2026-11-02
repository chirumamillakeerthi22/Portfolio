import { About } from './components/About';
import { Contact } from './components/Contact';
import { Certifications, Education } from './components/Credentials';
import { Experience } from './components/Experience';
import { BackToTop, Footer } from './components/Footer';
import { GitHubSection } from './components/GitHubSection';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <GitHubSection />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
