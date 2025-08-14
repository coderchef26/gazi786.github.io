'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import EnhancedArcReactor from '@/components/effects/EnhancedArcReactor';

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'sent' | 'failed';
}

const Contact = ({ slice }: ContactProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [systemMessages, setSystemMessages] = useState<string[]>([
    'COMMUNICATION ARRAY: ONLINE',
    'ENCRYPTION PROTOCOLS: ACTIVE',
    'SIGNAL STRENGTH: 100%',
    'AWAITING TRANSMISSION...'
  ]);

  const contactChannels = [
    {
      name: 'DIRECT COMMUNICATION',
      type: 'email',
      value: 'alshafaraz.gazi@gmail.com',
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      color: '#00d4ff',
      status: 'SECURE'
    },
    {
      name: 'PROFESSIONAL NETWORK',
      type: 'linkedin',
      value: 'linkedin.com/in/gazi-ah',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      color: '#26de81',
      status: 'ACTIVE'
    },
    {
      name: 'CODE REPOSITORY',
      type: 'github',
      value: 'github.com/gazi786',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
      color: '#ff6b6b',
      status: 'MONITORED'
    },
    {
      name: 'LOCATION SERVICES',
      type: 'location',
      value: 'GLOBAL REMOTE ACCESS',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
      color: '#ffa502',
      status: 'AVAILABLE'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmissionStatus('idle');
    
    // Simulate transmission process
    setSystemMessages([
      'INITIALIZING TRANSMISSION...',
      'ENCODING MESSAGE DATA...',
      'ESTABLISHING SECURE CHANNEL...',
      'ROUTING THROUGH JARVIS NETWORK...',
      'TRANSMISSION IN PROGRESS...'
    ]);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
      
      setSystemMessages([
        'MESSAGE TRANSMITTED SUCCESSFULLY',
        'DELIVERY CONFIRMATION RECEIVED',
        'COMMUNICATION CHANNEL SECURED',
        'STANDING BY FOR RESPONSE...'
      ]);
      
      setTransmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSystemMessages([
        'TRANSMISSION FAILED',
        'COMMUNICATION ERROR DETECTED',
        'ATTEMPTING ALTERNATIVE ROUTES...',
        'PLEASE RETRY TRANSMISSION'
      ]);
      setTransmissionStatus('error');
    }
    
    setIsTransmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="contact" 
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="relative py-20 overflow-hidden"
    >
      {/* Background Communication Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='1'%3E%3Ccircle cx='50' cy='50' r='20'/%3E%3Cline x1='50' y1='30' x2='50' y2='10'/%3E%3Cline x1='70' y1='50' x2='90' y2='50'/%3E%3Cline x1='50' y1='70' x2='50' y2='90'/%3E%3Cline x1='30' y1='50' x2='10' y2='50'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold jarvis-text glow-text mb-4">
                COMMUNICATION INTERFACE
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />
              <p className="text-cyan-300/60 max-w-2xl mx-auto">
                SECURE TRANSMISSION PROTOCOLS FOR PROFESSIONAL COLLABORATION
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Communication Form */}
            <motion.div variants={itemVariants}>
              <div className="jarvis-panel p-8">
                <div className="flex items-center gap-3 mb-6">
                  <EnhancedArcReactor size="sm" powerLevel={100} className="scale-75" />
                  <div>
                    <h3 className="text-xl font-bold jarvis-text text-cyan-400">MESSAGE TRANSMISSION</h3>
                    <p className="text-sm text-cyan-300/60">Encrypted communication channel</p>
                  </div>
                </div>

                <form onSubmit={handleTransmission} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm jarvis-text text-cyan-400 mb-2">SENDER IDENTIFICATION</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-cyan-900/10 border border-cyan-500/30 text-cyan-300 jarvis-text focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="Enter your name"
                        required
                        disabled={isTransmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm jarvis-text text-cyan-400 mb-2">COMMUNICATION LINK</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-cyan-900/10 border border-cyan-500/30 text-cyan-300 jarvis-text focus:border-cyan-400 focus:outline-none transition-colors"
                        placeholder="your.email@domain.com"
                        required
                        disabled={isTransmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm jarvis-text text-cyan-400 mb-2">MESSAGE PRIORITY</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cyan-900/10 border border-cyan-500/30 text-cyan-300 jarvis-text focus:border-cyan-400 focus:outline-none transition-colors"
                      placeholder="Subject classification"
                      required
                      disabled={isTransmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm jarvis-text text-cyan-400 mb-2">MESSAGE PAYLOAD</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-cyan-900/10 border border-cyan-500/30 text-cyan-300 jarvis-text focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      placeholder="Enter your message here..."
                      required
                      disabled={isTransmitting}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isTransmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full arc-reactor-btn py-4 ${isTransmitting ? 'opacity-50' : ''}`}
                  >
                    {isTransmitting ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
                  </motion.button>
                </form>

                {/* System Messages */}
                <div className="mt-6 p-4 bg-cyan-900/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <span className="text-xs jarvis-text text-cyan-400">SYSTEM STATUS</span>
                  </div>
                  <div className="space-y-1">
                    <AnimatePresence>
                      {systemMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.2 }}
                          className="text-xs text-cyan-300/60 jarvis-text"
                        >
                          &gt; {message}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Communication Channels */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Direct Channels */}
              <div className="jarvis-panel p-6">
                <div className="flex items-center gap-2 mb-6">
                  <EnhancedArcReactor size="sm" powerLevel={85} className="scale-75" />
                  <h3 className="text-lg font-bold jarvis-text text-cyan-400">COMMUNICATION CHANNELS</h3>
                </div>
                
                <div className="space-y-4">
                  {contactChannels.map((channel, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 holo-card group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center relative">
                          <div 
                            className="absolute inset-0 rounded-full blur-lg group-hover:blur-xl transition-all"
                            style={{ backgroundColor: `${channel.color}40` }}
                          />
                          <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill={channel.color}>
                            <path d={channel.icon} />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold jarvis-text" style={{ color: channel.color }}>
                            {channel.name}
                          </div>
                          <div className="text-xs text-cyan-300/60">{channel.value}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: channel.color }}
                        />
                        <span className="text-xs jarvis-text text-cyan-400/60">{channel.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Response Time Matrix */}
              <div className="jarvis-panel p-6">
                <h3 className="text-lg font-bold jarvis-text text-cyan-400 mb-4">RESPONSE TIME MATRIX</h3>
                <div className="space-y-3">
                  {[
                    { type: 'URGENT PROJECTS', time: '< 2 HOURS', color: '#ff6b6b' },
                    { type: 'BUSINESS INQUIRIES', time: '< 24 HOURS', color: '#ffa502' },
                    { type: 'COLLABORATION', time: '< 48 HOURS', color: '#26de81' },
                    { type: 'GENERAL MESSAGES', time: '< 72 HOURS', color: '#00d4ff' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-cyan-300/70 jarvis-text">{item.type}</span>
                      <span className="text-sm font-bold jarvis-text" style={{ color: item.color }}>
                        {item.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* System Availability */}
              <div className="jarvis-panel p-6">
                <h3 className="text-lg font-bold jarvis-text text-cyan-400 mb-4">SYSTEM AVAILABILITY</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'UPTIME', value: '99.9%', color: '#26de81' },
                    { label: 'RESPONSE RATE', value: '100%', color: '#00d4ff' },
                    { label: 'TIMEZONE', value: 'UTC+0', color: '#ffa502' },
                    { label: 'LANGUAGES', value: 'EN', color: '#ff6b6b' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-xl font-bold jarvis-text mb-1" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-cyan-400/60 jarvis-text">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;