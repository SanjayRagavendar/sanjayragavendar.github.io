import React from 'react';
import { Github, ExternalLink, Shield, Code, Search, Database } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'B.O.L.T - Botnet Overwatch Detection',
      description: 'AI-driven IoT threat detection and mitigation system using advanced threat intelligence and active deception techniques to counter cyber attacks in real-time.',
      tech: ['Python', 'Suricata', 'Scapy', 'Netfilterqueue', 'Cowrie'],
      icon: Shield,
      github: 'https://github.com/SanjayRagavendar/bolt',
      features: [
        'Updated 100K+ Suricata rules with Generative AI',
        'Real-time threat detection for IoT devices',
        'Active deception techniques',
        'Runner-Up at Cyberthon 2025'
      ]
    },
    {
      title: 'Wii-Secure - Multilayer Security Approach',
      description: 'Advanced cybersecurity solution providing real-time network traffic analysis, threat detection, and proactive protection for organizational networks.',
      tech: ['Python', 'Netfilterqueue', 'Flask', 'JavaScript', 'React', 'VPN'],
      icon: Search,
      github: 'https://github.com/SanjayRagavendar/wii-secure',
      features: [
        'Deep Packet Inspection (DPI)',
        'Machine learning-based threat detection',
        'Intelligent alerting system',
        'Continuous network monitoring'
      ]
    },
    {
      title: 'ForenSense - Digital Forensic Tool',
      description: 'Digital forensics tool accessible to both technical and non-technical users, supporting Windows and Linux platforms with a simple web interface.',
      tech: ['Python', 'TensorFlow', 'Flask', 'Torch', 'HTML', 'CSS'],
      icon: Database,
      github: 'https://github.com/SanjayRagavendar/forensense-v1',
      features: [
        'Cross-platform support (Windows/Linux)',
        'User-friendly web interface',
        'Intrusion detection capabilities',
        'Comprehensive forensic analysis'
      ]
    },
    {
      title: 'Web App Firewall',
      description: 'Python-based Web Application Firewall (WAF) to detect and block common web attacks with anomaly-based detection using machine learning algorithms.',
      tech: ['Python', 'TensorFlow', 'Flask', 'Torch', 'HTML', 'CSS'],
      icon: Code,
      github: 'https://github.com/SanjayRagavendar/web-app-firewall',
      features: [
        'SQL injection protection',
        'XSS and CSRF attack blocking',
        'Anomaly-based detection',
        'Machine learning HTTP request analysis'
      ]
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Projects</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing practical cybersecurity solutions and security-focused applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                  <project.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-6">
                <h4 className="text-blue-400 font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={project.github}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>Code</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;