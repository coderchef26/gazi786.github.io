"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaUser, FaRobot, FaAccessibleIcon } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AtlasAssistantProps {
  onNavigate?: (section: string) => void;
}

export default function AtlasAssistant({ onNavigate }: AtlasAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm ATLAS, your AI assistant. I can help you navigate Alshafaraz's portfolio, read content aloud, or answer questions about his work. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Portfolio knowledge base
  const portfolioData = {
    about: {
      name: "Alshafaraz Gazi",
      title: "Full-Stack Developer & System Architect",
      experience: "5+ years",
      location: "Available worldwide",
      description: "Passionate full-stack developer specializing in React, Node.js, and modern web technologies."
    },
    skills: [
      "React.js", "Next.js", "TypeScript", "Node.js", "Python", 
      "MongoDB", "PostgreSQL", "AWS", "Docker", "Git"
    ],
    projects: [
      { name: "E-commerce Platform", tech: "React, Node.js, MongoDB" },
      { name: "Task Management App", tech: "Next.js, TypeScript, Prisma" },
      { name: "Real-time Chat App", tech: "Socket.io, React, Express" }
    ],
    education: [
      { degree: "Bachelor's in Computer Science", year: "2018-2022" },
      { degree: "Full-Stack Web Development", year: "2022" }
    ]
  };

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Auto-select a good default voice
      if (!selectedVoice && voices.length > 0) {
        const defaultVoice = voices.find(voice => 
          voice.name.includes('Daniel') || 
          voice.name.includes('Alex') ||
          (voice.lang.includes('en') && voice.name.toLowerCase().includes('male'))
        ) || voices.find(voice => voice.lang.includes('en-US'));
        
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name);
        }
      }
    };
    
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Use selected voice or find a good default
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
      
      // ATLAS-style voice settings
      utterance.rate = 0.85;        // Slightly slower for authority
      utterance.pitch = 0.8;       // Lower pitch for deeper voice
      utterance.volume = 0.9;      // Clear volume
      
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Navigation commands
    if (input.includes('navigate') || input.includes('go to') || input.includes('show me')) {
      if (input.includes('project')) {
        onNavigate?.('projects');
        return "I'm taking you to the Projects section where you can see Alshafaraz's work including e-commerce platforms, task management apps, and real-time chat applications.";
      }
      if (input.includes('skill') || input.includes('technolog')) {
        onNavigate?.('skills');
        return "Here are Alshafaraz's technical skills: React.js, Next.js, TypeScript, Node.js, Python, MongoDB, PostgreSQL, AWS, Docker, and Git.";
      }
      if (input.includes('about') || input.includes('profile')) {
        onNavigate?.('about');
        return "This is Alshafaraz Gazi, a Full-Stack Developer & System Architect with 5+ years of experience, passionate about modern web technologies.";
      }
      if (input.includes('education') || input.includes('study')) {
        onNavigate?.('education');
        return "Alshafaraz has a Bachelor's degree in Computer Science (2018-2022) and completed Full-Stack Web Development certification in 2022.";
      }
      if (input.includes('contact') || input.includes('reach')) {
        onNavigate?.('contact');
        return "I'm taking you to the contact section where you can connect with Alshafaraz for collaborations and opportunities.";
      }
    }

    // Information queries
    if (input.includes('experience') || input.includes('years')) {
      return `Alshafaraz has ${portfolioData.about.experience} of professional experience in full-stack development.`;
    }
    
    if (input.includes('skill') || input.includes('technolog')) {
      return `Alshafaraz's main skills include: ${portfolioData.skills.slice(0, 5).join(', ')} and many more modern technologies.`;
    }
    
    if (input.includes('project')) {
      return `Some of Alshafaraz's notable projects include: ${portfolioData.projects.map(p => p.name).join(', ')}. Would you like me to show you the projects section?`;
    }

    // Accessibility features
    if (input.includes('read') || input.includes('speak')) {
      return "I can read any content on the page aloud. Just ask me to 'read the projects section' or 'read about skills' and I'll help you navigate through the content.";
    }

    if (input.includes('help') || input.includes('assist')) {
      return "I can help you: 1) Navigate to different sections, 2) Read content aloud, 3) Answer questions about Alshafaraz's work, 4) Provide accessibility support. Try saying 'show me projects' or 'tell me about skills'.";
    }

    // Default responses
    const responses = [
      "I'd be happy to help you explore Alshafaraz's portfolio! You can ask me about his projects, skills, experience, or ask me to navigate to any section.",
      "Great question! Feel free to ask me about Alshafaraz's technical skills, work experience, or any specific projects you'd like to know more about.",
      "I'm here to assist you! Try asking 'show me the projects' or 'tell me about his skills' and I'll guide you through the portfolio."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleUserMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Speak the response
      speak(response);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserMessage(inputText);
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: ['0 0 20px rgba(0, 212, 255, 0.3)', '0 0 30px rgba(0, 212, 255, 0.6)', '0 0 20px rgba(0, 212, 255, 0.3)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Open ATLAS Assistant"
      >
        <FaRobot className="text-white text-2xl" />
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaAccessibleIcon className="text-white text-xs" />
        </motion.div>
      </motion.button>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-[#0a0a0f]/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-cyan-500/30 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FaRobot className="text-[#00d4ff] text-xl" />
                </motion.div>
                <div>
                  <h3 className="text-[#00d4ff] font-bold">ATLAS Assistant</h3>
                  <p className="text-xs text-cyan-400/70">AI Portfolio Guide</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                  className="text-cyan-400 hover:text-white transition-colors p-1"
                  aria-label="Voice Settings"
                >
                  <FaVolumeUp />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-cyan-400 hover:text-white transition-colors"
                  aria-label="Close Assistant"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Voice Settings Panel */}
            <AnimatePresence>
              {showVoiceSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-cyan-500/30 bg-[#1a1a2e]/50"
                >
                  <div className="p-3 space-y-2">
                    <h4 className="text-xs font-semibold text-[#00d4ff] mb-2">VOICE SETTINGS</h4>
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-cyan-500/30 rounded px-2 py-1 text-cyan-100 text-xs focus:outline-none focus:border-[#00d4ff]"
                    >
                      <option value="">Default Voice</option>
                      {availableVoices
                        .filter(voice => voice.lang.includes('en'))
                        .map(voice => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => speak("Hello! This is how I sound with the current voice settings.")}
                      className="w-full px-2 py-1 bg-[#00d4ff] text-black rounded hover:bg-cyan-400 transition-colors text-xs"
                    >
                      Test Voice
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-[#00d4ff] text-black' 
                      : 'bg-[#1a1a2e] text-cyan-100 border border-cyan-500/30'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {!message.isUser && <FaRobot className="text-[#00d4ff] text-sm mt-1" />}
                      {message.isUser && <FaUser className="text-black text-sm mt-1" />}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    {!message.isUser && (
                      <button
                        onClick={() => speak(message.text)}
                        className="mt-2 text-xs text-[#00d4ff] hover:text-cyan-300 flex items-center space-x-1"
                        aria-label="Read message aloud"
                      >
                        <FaVolumeUp />
                        <span>Read aloud</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1a1a2e] p-3 rounded-lg border border-cyan-500/30">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-[#00d4ff] rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-[#00d4ff] rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-[#00d4ff] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyan-500/30">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me about the portfolio..."
                  className="flex-1 bg-[#1a1a2e] border border-cyan-500/30 rounded px-3 py-2 text-cyan-100 text-sm focus:outline-none focus:border-[#00d4ff]"
                  aria-label="Type your message"
                />
                
                {speechSupported && (
                  <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded transition-colors ${
                      isListening 
                        ? 'bg-red-500 text-white' 
                        : 'bg-[#00d4ff] text-black hover:bg-cyan-400'
                    }`}
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-[#00d4ff] text-black rounded hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  Send
                </button>
              </form>
              
              <p className="text-xs text-cyan-400/60 mt-2 text-center">
                Try: "Show me projects" • "Tell me about skills" • "Read this aloud"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}