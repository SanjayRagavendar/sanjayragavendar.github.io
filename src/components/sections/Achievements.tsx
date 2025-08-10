import React from 'react';
import { Trophy, Star, Award, Target, Users, BookOpen, ExternalLink } from 'lucide-react';

const Achievements: React.FC = () => {
  const cyberCompetitions = [
    {
      title: 'Runner-Up, Cyberthon 2024',
      description: 'SRM IST Project: ForenSense',
      icon: Trophy,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/50',
      date: '2024',
      type: 'Competition',
      verifyUrl: '#'
    },
    {
      title: 'Runner-Up, Cyberthon 2025',
      description: 'SRM IST Project: B.O.L.T– Botnet Detection',
      icon: Award,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/50',
      date: '2025',
      type: 'Competition',
      verifyUrl: '#'
    }
  ];

  const leadershipRoles = [
    {
      title: 'Secretary',
      description: 'Cybersecurity Community- Tech Society- Saveetha Engineering College',
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/50',
      date: '2024-2025',
      type: 'Leadership',
      verifyUrl: '#'
    },
    {
      title: 'Technical Lead - HACKHUSTLE',
      description: 'Organized a 24-hour hackathon with 240+ participants as Technical Lead',
      icon: Target,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/50',
      date: '2024',
      type: 'Leadership',
      verifyUrl: '#'
    }
  ];

  const platformAchievements = [
    {
      title: 'TryHackMe Top 5%',
      description: 'Achieved top 5% ranking on the TryHackMe cybersecurity training platform',
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50',
      date: '2023-Present',
      type: 'Platform',
      verifyUrl: 'https://tryhackme.com/p/0x1cb'
    },
    {
      title: 'Hack The Box Hacker Rank',
      description: 'Attained Hacker rank on Hack The Box platform through practical penetration testing challenges',
      icon: Star,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/50',
      date: '2023-Present',
      type: 'Platform',
      verifyUrl: 'https://app.hackthebox.com/profile/1353647'
    }
  ];

  const achievements = [...cyberCompetitions, ...leadershipRoles, ...platformAchievements];

  return (
    <section id="achievements" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Achievements</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Recognition and accomplishments in cybersecurity and academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`${achievement.bgColor} border ${achievement.borderColor} rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group flex flex-col h-full`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 ${achievement.bgColor} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                  <span className={`text-sm ${achievement.color} font-semibold`}>{achievement.date}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                {achievement.description}
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-700 mt-auto">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${achievement.bgColor} ${achievement.color}`}>
                  <Star className="w-3 h-3 mr-1" />
                  {achievement.type}
                </div>
                
                {achievement.verifyUrl !== '#' && (
                  <button
                    onClick={() => window.open(achievement.verifyUrl, '_blank')}
                    className={`flex items-center space-x-2 px-3 py-1 ${achievement.bgColor} hover:${achievement.bgColor.replace('/20', '/30')} border ${achievement.borderColor} rounded-lg transition-all duration-300 ${achievement.color} hover:${achievement.color.replace('400', '300')} text-xs`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Verify</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Continuous Growth</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Committed to excellence in cybersecurity through active participation in competitions, 
            research, and community leadership while maintaining academic distinction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievements;