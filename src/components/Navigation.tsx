import React from 'react';
import { Terminal, Shield, User, Briefcase, Code, Trophy, Award, Mail } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection }) => {
  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL without triggering page reload
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-sm border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">          
          <div className="hidden md:flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                  currentSection === id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-blue-500/20 hover:text-blue-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex justify-center">
            <Terminal className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;