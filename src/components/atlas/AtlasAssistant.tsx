"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtlas } from './AtlasProvider';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaUser, FaRobot, FaAccessibleIcon, FaCog, FaTimes } from 'react-icons/fa';
import { speech } from '@/lib/atlas/speech';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  action?: 'navigate' | 'speak' | 'search';
  target?: string;
  suggestions?: string[];
}

interface AtlasAssistantProps {
  onNavigate?: (section: string) => void;
}

export default function AtlasAssistant({ onNavigate }: AtlasAssistantProps) {
  const {
    config,
    updateConfig,
    isAssistantOpen,
    setAssistantOpen,
    processQuery,
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    stopListening,
    isListening,
    announce,
    navigate
  } = useAtlas();

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize component
  useEffect(() => {
    // Load voices
    const voices = speech.getVoices();
    setAvailableVoices(voices);

    // Add welcome message if assistant opens for first time
    if (isAssistantOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hello! I'm ATLAS, your AI assistant. I can help you navigate Alshafaraz's portfolio, read content aloud, or answer questions about his work. How can I assist you today?",
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          "Show me his projects",
          "What are his skills?",
          "Tell me about his experience",
          "Read the about section"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isAssistantOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isAssistantOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAssistantOpen]);

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Process query with ATLAS
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate thinking
      
      const response = processQuery(text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
        action: response.action,
        target: response.target,
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Handle actions
      if (response.action === 'navigate' && response.target) {
        navigate(response.target);
        onNavigate?.(response.target);
      }

      // Speak response if voice enabled and auto-speak is on
      if (config.voice.enabled && config.assistant.autoSpeak) {
        await speak(response.response);
      }

      // Announce to screen readers
      announce(response.response);

    } catch (error) {
      console.error('Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I encountered an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      stopListening();
      return;
    }

    try {
      announce("Listening for voice input...");
      const transcript = await startListening();
      if (transcript) {
        handleUserMessage(transcript);
      }
    } catch (error) {
      console.warn('Voice input failed:', error);
      announce("Voice input failed. Please try typing your message.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserMessage(inputText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleUserMessage(suggestion);
  };

  const handleMessageSpeak = async (text: string) => {
    try {
      if (isSpeaking) {
        stopSpeaking();
      } else {
        await speak(text);
      }
    } catch (error) {
      console.warn('Speech failed:', error);
    }
  };

  const SettingsPanel = () => (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-b border-cyan-500/30 bg-[#1a1a2e]/50 p-4 space-y-4"
        >
          <h4 className="text-sm font-semibold text-[#00d4ff] mb-3">ATLAS SETTINGS</h4>
          
          {/* Voice Settings */}
          <div className="space-y-2">
            <label className="text-xs text-cyan-400 block">Voice</label>
            <select
              value={config.voice.preferredVoice}
              onChange={(e) => updateConfig({
                voice: { ...config.voice, preferredVoice: e.target.value }
              })}
              className="w-full bg-[#0a0a0f] border border-cyan-500/30 rounded px-2 py-1 text-cyan-100 text-xs focus:outline-none focus:border-[#00d4ff]"
            >
              <option value="">Default Voice</option>
              {availableVoices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Auto-speak toggle */}
          <div className="flex items-center justify-between">
            <label className="text-xs text-cyan-400">Auto-speak responses</label>
            <input
              type="checkbox"
              checked={config.assistant.autoSpeak}
              onChange={(e) => updateConfig({
                assistant: { ...config.assistant, autoSpeak: e.target.checked }
              })}
              className="rounded"
            />
          </div>

          {/* High contrast toggle */}
          <div className="flex items-center justify-between">
            <label className="text-xs text-cyan-400">High contrast mode</label>
            <input
              type="checkbox"
              checked={config.accessibility.highContrast}
              onChange={(e) => updateConfig({
                accessibility: { ...config.accessibility, highContrast: e.target.checked }
              })}
              className="rounded"
            />
          </div>

          {/* Font size slider */}
          <div className="space-y-1">
            <label className="text-xs text-cyan-400 block">Font size: {config.accessibility.fontSize}px</label>
            <input
              type="range"
              min="14"
              max="24"
              value={config.accessibility.fontSize}
              onChange={(e) => updateConfig({
                accessibility: { ...config.accessibility, fontSize: parseInt(e.target.value) }
              })}
              className="w-full"
            />
          </div>

          {/* Test voice button */}
          <button
            onClick={() => speak("Hello! This is how I sound with the current voice settings.")}
            className="w-full px-3 py-2 bg-[#00d4ff] text-black rounded hover:bg-cyan-400 transition-colors text-xs font-semibold"
            disabled={isSpeaking}
          >
            {isSpeaking ? 'Speaking...' : 'Test Voice'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!isAssistantOpen) {
    return (
      <motion.button
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          boxShadow: ['0 0 20px rgba(0, 212, 255, 0.3)', '0 0 30px rgba(0, 212, 255, 0.6)', '0 0 20px rgba(0, 212, 255, 0.3)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Open ATLAS Assistant"
      >
        <FaRobot className="text-white text-2xl group-hover:scale-110 transition-transform" />
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaAccessibleIcon className="text-white text-xs" />
        </motion.div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 100 }}
      className="fixed bottom-6 right-6 z-50 w-96 bg-[#0a0a0f]/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col"
      style={{ height: '500px' }}
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
            onClick={() => setShowSettings(!showSettings)}
            className="text-cyan-400 hover:text-white transition-colors p-1"
            aria-label="Assistant Settings"
          >
            <FaCog />
          </button>
          <button
            onClick={() => setAssistantOpen(false)}
            className="text-cyan-400 hover:text-white transition-colors"
            aria-label="Close Assistant"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel />

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
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
                {!message.isUser && <FaRobot className="text-[#00d4ff] text-sm mt-1 flex-shrink-0" />}
                {message.isUser && <FaUser className="text-black text-sm mt-1 flex-shrink-0" />}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              {!message.isUser && (
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => handleMessageSpeak(message.text)}
                    className="text-xs text-[#00d4ff] hover:text-cyan-300 flex items-center space-x-1"
                    aria-label={isSpeaking ? "Stop speaking" : "Read message aloud"}
                  >
                    <FaVolumeUp />
                    <span>{isSpeaking ? 'Stop' : 'Read aloud'}</span>
                  </button>
                </div>
              )}
              
              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-cyan-400/70">Suggestions:</p>
                  {message.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-2 py-1 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#1a1a2e] p-3 rounded-lg border border-cyan-500/30">
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-[#00d4ff] rounded-full"
                  />
                ))}
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
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me about the portfolio..."
            className="flex-1 bg-[#1a1a2e] border border-cyan-500/30 rounded px-3 py-2 text-cyan-100 text-sm focus:outline-none focus:border-[#00d4ff]"
            aria-label="Type your message"
            disabled={isTyping}
          />
          
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2 rounded transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-[#00d4ff] text-black hover:bg-cyan-400'
            }`}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            disabled={isTyping}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2 bg-[#00d4ff] text-black rounded hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
        
        <p className="text-xs text-cyan-400/60 mt-2 text-center">
          Try: "Show me projects" • "What are his skills?" • "Read about section"
        </p>
      </div>
    </motion.div>
  );
}