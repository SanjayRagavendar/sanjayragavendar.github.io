import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Terminal from './components/Terminal';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentSection, setCurrentSection] = useState('about');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'achievements', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);
    
    handleHashChange(); // Handle initial load
    handleScroll(); // Handle initial scroll position

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono relative overflow-x-hidden">
      {/* Matrix-like background effect */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
      </div>

      <Navigation currentSection={currentSection} />
      
      <main className="relative z-10">
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>

      {/* Terminal toggle button */}
      <button
        onClick={() => setShowTerminal(!showTerminal)}
        className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
      >
        {showTerminal ? 'Close Terminal' : 'Open Terminal'}
      </button>

      {/* Terminal overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4">
          <Terminal onClose={() => setShowTerminal(false)} />
        </div>
      )}
    </div>
  );
}

export default App;