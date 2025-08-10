import React from 'react';
import { Award, CheckCircle, Clock, Target, ExternalLink } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      name: 'eJPT v2',
      issuer: 'INE',
      date: 'August 2024',
      status: 'completed',
      description: 'Junior Penetration Tester certification covering vulnerability assessment, network security, and ethical hacking.',
      verifyUrl: 'https://certs.ine.com/49dbbb18-5055-4d1a-99a1-1d5d7b0887d9'
    },
    {
      name: 'Google Cybersecurity Specialization',
      issuer: 'Google',
      date: 'March 2024',
      status: 'completed',
      description: 'Comprehensive cybersecurity program covering Linux, Python, incident response, and SIEM tools.',
      verifyUrl: 'https://coursera.org/verify/specialization/HHWB4SDMNDYQ'
    },
    {
      name: 'IBM Cybersecurity Analyst',
      issuer: 'IBM',
      date: 'August 2025',
      status: 'completed',
      description: 'Professional certification in cybersecurity analysis, threat detection, and incident response.',
      verifyUrl: 'https://coursera.org/verify/professional-cert/ZVOGH7NPW640'
    },
    {
      name: 'Google IT Support Specialization',
      issuer: 'Google',
      date: 'June 2025',
      status: 'completed',
      description: 'Comprehensive IT support certification covering troubleshooting, system administration, and security.',
      verifyUrl: 'https://coursera.org/verify/specialization/XJZ6DLMJWWOZ'
    },
    {
      name: 'Jr Penetration Tester Certificate',
      issuer: 'TryHackMe',
      date: 'July 2025',
      status: 'completed',
      description: 'Hands-on penetration testing certification with focus on practical exploitation skills.',
      verifyUrl: 'https://tryhackme.com/certificate/THM-1NX2PH5XON'
    },
    {
      name: 'Web Fundamentals Certificate',
      issuer: 'TryHackMe',
      date: 'July 2025',
      status: 'completed',
      description: 'Certification in web application security fundamentals and testing methodologies.',
      verifyUrl: 'https://tryhackme.com/certificate/THM-SR6KI4XSFE'
    },
    {
      name: 'Pre Security Certificate',
      issuer: 'TryHackMe',
      date: 'June 2025',
      status: 'completed',
      description: 'Foundational security certification focusing on Linux and computer networking skills.',
      verifyUrl: 'https://tryhackme.com/certificate/THM-9BGXKNST5S'
    },
    {
      name: 'Cyber Security 101 Certificate',
      issuer: 'TryHackMe',
      date: 'July 2025',
      status: 'completed',
      description: 'Introduction to core cybersecurity concepts and best practices.',
      verifyUrl: 'https://tryhackme.com/certificate/THM-ELGEHLLOQM'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-400" />;
      case 'planned':
        return <Target className="w-6 h-6 text-blue-400" />;
      default:
        return <Award className="w-6 h-6 text-green-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/50 bg-green-500/10';
      case 'in-progress':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'planned':
        return 'border-blue-500/50 bg-blue-500/10';
      default:
        return 'border-gray-700 bg-gray-800/50';
    }
  };

  return (
    <section id="certifications" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Certifications</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Continuous learning through industry-recognized certifications and credentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${getStatusColor(cert.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(cert.status)}
                  <div>
                    <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                    <p className="text-gray-300">{cert.issuer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-300">{cert.date}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed flex-grow">
                {cert.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => window.open(cert.verifyUrl, '_blank')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-all duration-300 text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">Verify</span>
                </button>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  cert.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  cert.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {cert.status.charAt(0).toUpperCase() + cert.status.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
          <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Committed to staying current with the evolving cybersecurity landscape through 
            ongoing education, practical training, and industry certifications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;