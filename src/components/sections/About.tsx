import React from 'react';
import { Shield, Code, Search, Lock } from 'lucide-react';
import RollingText from '../RollingText';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 mt-0">
            Sanjay Ragavendar
            </h1>
          
          <div className="text-2xl md:text-3xl mb-8 h-16 flex items-center justify-center">
            <RollingText /> 
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            I am a dedicated computer science student focused on the field of cybersecurity. My experience includes conducting comprehensive vulnerability assessments as a cyber security analyst intern and developing innovative solutions as a full-stack developer. I have a passion for cybersecurity project development, evidenced by my achievements in competitive events like Cyberthon. My technical skills span multiple programming languages and cybersecurity tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300">
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-400 mb-2">Development</h3>
            <p className="text-gray-300">
              Full-stack development with security-first mindset
            </p>
          </div>
          
          <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/30 hover:bg-red-500/20 transition-all duration-300">
            <Search className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-2">Penetration Testing</h3>
            <p className="text-gray-300">
              Ethical hacking and vulnerability assessment
            </p>
          </div>
          
          <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/30 hover:bg-purple-500/20 transition-all duration-300">
            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-purple-400 mb-2">Security Analysis</h3>
            <p className="text-gray-300">
              Threat detection and security monitoring
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;