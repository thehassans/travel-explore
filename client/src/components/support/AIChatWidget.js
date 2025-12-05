import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Sparkles,
  Bot,
  User,
  Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useGradient } from '../../context/GradientContext';
import { useAIAgent } from '../../context/AIAgentContext';

const AIChatWidget = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const { useGradients } = useGradient();
  const { isEnabled, currentAgent, sendMessage, isTyping, clearHistory } = useAIAgent();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = language === 'bn'
        ? `আসসালামু আলাইকুম! 👋 আমি ${currentAgent.name}। Explore Holidays-এ আপনাকে স্বাগতম! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?`
        : `Hello! 👋 I'm ${currentAgent.name_en}. Welcome to Explore Holidays! How can I help you today?`;
      
      setMessages([{
        id: Date.now(),
        type: 'agent',
        text: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, currentAgent, language]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedText]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Typewriter effect for AI responses
  const animateText = async (text, messageId) => {
    setIsAnimating(true);
    setDisplayedText('');
    
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 30)); // Random typing speed
      setDisplayedText(text.slice(0, i));
    }
    
    // Update the message with full text
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, text, isAnimating: false } : msg
    ));
    setDisplayedText('');
    setIsAnimating(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isAnimating) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: userMessage,
      timestamp: new Date()
    }]);

    // Get AI response
    const response = await sendMessage(userMessage, language);

    // Add agent message with animation
    const agentMessageId = Date.now();
    setMessages(prev => [...prev, {
      id: agentMessageId,
      type: 'agent',
      text: '',
      isAnimating: true,
      timestamp: new Date()
    }]);

    // Animate the response
    await animateText(response, agentMessageId);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleNewChat = () => {
    clearHistory();
    setMessages([]);
    const greeting = language === 'bn'
      ? `আসসালামু আলাইকুম! 👋 আমি ${currentAgent.name}। Explore Holidays-এ আপনাকে স্বাগতম! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?`
      : `Hello! 👋 I'm ${currentAgent.name_en}. Welcome to Explore Holidays! How can I help you today?`;
    
    setMessages([{
      id: Date.now(),
      type: 'agent',
      text: greeting,
      timestamp: new Date()
    }]);
  };

  if (!isEnabled) return null;

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center ${
              useGradients 
                ? 'bg-gradient-to-r from-primary-500 to-purple-600'
                : 'bg-slate-900'
            }`}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 500
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-3xl shadow-2xl overflow-hidden flex flex-col ${
              isDark ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className={`p-4 flex items-center gap-3 ${
              useGradients 
                ? 'bg-gradient-to-r from-primary-500 to-purple-600'
                : 'bg-slate-900'
            }`}>
              <div className="relative">
                <img 
                  src={currentAgent.avatar} 
                  alt={currentAgent.name}
                  className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{currentAgent.name}</h3>
                <p className="text-white/70 text-sm flex items-center gap-1">
                  {isTyping || isAnimating ? (
                    <>
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                      <span className="ml-1">{language === 'bn' ? 'টাইপ করছে' : 'Typing'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3" />
                      {language === 'bn' ? 'অনলাইন' : 'Online'}
                    </>
                  )}
                </p>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </button>
                <button 
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                  isDark ? 'bg-slate-800' : 'bg-gray-50'
                }`}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'agent' && (
                        <img 
                          src={currentAgent.avatar} 
                          alt=""
                          className="w-8 h-8 rounded-full mr-2 mt-1"
                        />
                      )}
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? useGradients
                            ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white'
                            : 'bg-slate-900 text-white'
                          : isDark
                            ? 'bg-slate-700 text-white'
                            : 'bg-white text-gray-900 shadow-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">
                          {message.isAnimating ? displayedText : message.text}
                          {message.isAnimating && (
                            <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-pulse" />
                          )}
                        </p>
                        <span className={`text-xs mt-1 block ${
                          message.type === 'user' ? 'text-white/60' : isDark ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {message.type === 'user' && (
                        <div className={`w-8 h-8 rounded-full ml-2 mt-1 flex items-center justify-center ${
                          useGradients ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-slate-700'
                        }`}>
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className={`px-4 py-2 flex gap-2 overflow-x-auto ${
                  isDark ? 'bg-slate-800 border-t border-slate-700' : 'bg-white border-t border-gray-100'
                }`}>
                  {(language === 'bn' ? [
                    'ফ্লাইট বুকিং',
                    'ভিসা সেবা',
                    'প্যাকেজ',
                    'যোগাযোগ'
                  ] : [
                    'Flight Booking',
                    'Visa Services',
                    'Packages',
                    'Contact'
                  ]).map((action) => (
                    <button
                      key={action}
                      onClick={() => setInputValue(action)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        isDark 
                          ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className={`p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className={`flex items-center gap-2 p-2 rounded-2xl ${
                    isDark ? 'bg-slate-700' : 'bg-gray-100'
                  }`}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={language === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : 'Type your message...'}
                      disabled={isTyping || isAnimating}
                      className={`flex-1 px-3 py-2 bg-transparent focus:outline-none ${
                        isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping || isAnimating}
                      className={`p-2.5 rounded-xl transition-all ${
                        inputValue.trim() && !isTyping && !isAnimating
                          ? useGradients
                            ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white'
                            : 'bg-slate-900 text-white'
                          : isDark
                            ? 'bg-slate-600 text-gray-400'
                            : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className={`text-center text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {language === 'bn' 
                      ? `${currentAgent.name} দ্বারা চালিত • AI সহায়তা`
                      : `Powered by ${currentAgent.name_en} • AI Support`}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
