import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to CyberSec Terminal v1.0',
    'Type "help" for available commands',
    ''
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  about        - Display personal information',
      '  experience   - List work experience and internships',
      '  projects     - Show completed projects',
      '  achievements - Display achievements and recognition',
      '  certs        - Display certifications',
      '  skills       - List technical skills',
      '  contact      - Show contact information',
      '  clear        - Clear terminal',
      '  exit         - Close terminal',
      ''
    ],
    about: () => [
      'Sanjay Ragavendar - Cybersecurity Student',
      'Computer Science Major with Cybersecurity Focus',
      'Passionate about ethical hacking, penetration testing, and digital forensics',
      'Dedicated to cybersecurity project development and competitive events',
      'Secretary at Cybersecurity Community - Tech Society',
      ''
    ],
    experience: () => [
      'WORK EXPERIENCE:',
      '',
      '• Security Analyst Intern - Arjun Vision (June 2024 - July 2024)',
      '  Location: Chennai, TN',
      '  - Utilized tools like Wireshark, Burp Suite, and Metasploit',
      '  - Performed network traffic analysis and vulnerability assessments',
      '  - Developed StegPy tool to detect steganography in images',
      '',
      '• Full Stack Developer Intern - Failsafe Hiring (Sept 2024 - August 2025)',
      '  Location: Remote',
      '  - Designed Role-Based Access Control (RBAC) for LMS',
      '  - Developed custom assessment platform with real-time analytics',
      '  - Conducted security audits and implemented best practices',
      '  - Used SQLite3, Flask, Python for scalable components',
      ''
    ],
    projects: () => [
      'FEATURED PROJECTS:',
      '',
      '• B.O.L.T - Botnet Overwatch Detection',
      '  Tech: Python, Suricata, Scapy, Netfilterqueue, Cowrie',
      '  AI-driven IoT threat detection and mitigation system',
      '  Runner-Up at Cyberthon 2025',
      '',
      '• Wii-Secure - Multilayer Security Approach',
      '  Tech: Python, Netfilterqueue, Flask, JavaScript, React, VPN',
      '  Real-time network traffic analysis and threat detection',
      '',
      '• ForenSense - Digital Forensic Tool',
      '  Tech: Python, TensorFlow, Flask, Torch, HTML, CSS',
      '  Cross-platform forensics tool with web interface',
      '  Runner-Up at Cyberthon 2024',
      '',
      '• Web App Firewall',
      '  Tech: Python, TensorFlow, Flask, Torch',
      '  WAF to detect and block common web attacks',
      ''
    ],
    achievements: () => [
      'ACHIEVEMENTS:',
      '',
      'COMPETITIONS:',
      '• Runner-Up, Cyberthon 2024 - ForenSense Project',
      '• Runner-Up, Cyberthon 2025 - B.O.L.T Botnet Detection',
      '',
      'LEADERSHIP:',
      '• Secretary - Cybersecurity Community, Tech Society',
      '• Technical Lead - HACKHUSTLE (240+ participants)',
      '',
      'PLATFORM RANKINGS:',
      '• TryHackMe Top 5% ranking (2023-Present)',
      '• Hack The Box Hacker Rank (2023-Present)',
      ''
    ],
    certs: () => [
      'CERTIFICATIONS:',
      '',
      '✓ eJPT v2 - INE (August 2024)',
      '✓ Google Cybersecurity Specialization (March 2024)',
      '✓ IBM Cybersecurity Analyst (August 2025)',
      '✓ Google IT Support Specialization (June 2025)',
      '✓ Jr Penetration Tester Certificate - TryHackMe (July 2025)',
      '✓ Web Fundamentals Certificate - TryHackMe (July 2025)',
      '✓ Pre Security Certificate - TryHackMe (June 2025)',
      '✓ Cyber Security 101 Certificate - TryHackMe (July 2025)',
      ''
    ],
    skills: () => [
      'TECHNICAL SKILLS:',
      '',
      'Programming Languages:',
      '  Python, JavaScript, TypeScript, C++, Bash, PowerShell',
      '',
      'Security Tools:',
      '  Wireshark, Burp Suite, Metasploit, Nmap, Suricata',
      '  Kali Linux, OWASP ZAP, Scapy, Netfilterqueue',
      '',
      'Frameworks & Technologies:',
      '  React, Node.js, Flask, TensorFlow, SQLite3',
      '  Docker, Git, VPN, Cowrie',
      ''
    ],
    contact: () => [
      'CONTACT INFORMATION:',
      '',
      'Email: sanjayragavendar2610@gmail.com',
      'LinkedIn: linkedin.com/in/sanjay-ragavendar',
      'GitHub: github.com/sanjayragavendar',
      'TryHackMe: tryhackme.com/p/0x1cb',
      'Hack The Box: app.hackthebox.com/profile/1353647',
      'Location: Chennai, India',
      ''
    ],
    clear: () => {
      setHistory(['Welcome to CyberSec Terminal v1.0', 'Type "help" for available commands', '']);
      return [];
    },
    exit: () => {
      onClose();
      return [];
    }
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const output = commands[command as keyof typeof commands];
    
    if (output) {
      const result = output();
      setHistory(prev => [...prev, `> ${cmd}`, ...result]);
    } else {
      setHistory(prev => [...prev, `> ${cmd}`, `Command not found: ${cmd}`, 'Type "help" for available commands', '']);
    }
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full max-w-4xl h-96 bg-gray-900 border border-blue-400 rounded-lg shadow-2xl shadow-blue-500/20">
      <div className="flex items-center justify-between bg-blue-500/10 px-4 py-2 border-b border-blue-400">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm">CyberSec Terminal</span>
        </div>
        <button
          onClick={onClose}
          className="text-blue-400 hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div
        ref={terminalRef}
        className="h-80 p-4 overflow-y-auto text-sm"
      >
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line.startsWith('>') ? (
              <span className="text-blue-300">{line}</span>
            ) : (
              <span className="text-gray-300">{line}</span>
            )}
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-blue-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent text-white outline-none flex-1"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;