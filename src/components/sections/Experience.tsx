import React from 'react';
import { Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      title: 'Security Analyst Intern',
      company: 'Arjun Vision',
      period: 'June 2024 - July 2024',
      location: 'Chennai, TN',
      type: 'internship',
      description: [
        'Utilized tools like Wireshark, Burp Suite, and Metasploit to perform network traffic analysis and vulnerability assessments.',
        'Developed a Tool StegPy to detect steganography in images.',
      ]
    },
    {
      title: 'Full Stack Developer Intern',
      company: 'Failsafe Hiring',
      period: 'Sept 2024 - August 2025',
      location: 'Remote',
      type: 'internship',
      description: [
        ' Designed and implemented a Role-Based Access Control (RBAC) for a Learning Management System (LMS) to enable efficient administration and monitoring of company-wide assessments.',
        ' Developed a custom-built assessment platform with features like question bank management, real-time analytics, and user-friendly interfaces.',
        ' Conducted security audits and implemented best practices to ensure data integrity and confidentiality.',
        ' Utilized Sqlite3, Flask, Python to build scalable and user-friendly components.',
      ]
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Building expertise through hands-on experience in cybersecurity roles
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-red-400"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-black z-10 shadow-lg shadow-blue-400/50"></div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg mr-3">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-400">{exp.title}</h3>
                        <h4 className="text-lg text-white">{exp.company}</h4>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <ChevronRight className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exp.type === 'internship' ? 'bg-green-500/20 text-green-400' :
                        exp.type === 'research' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;