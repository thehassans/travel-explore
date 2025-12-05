import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Check,
  CheckCheck,
  Phone,
  Video,
  MoreVertical
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
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [pendingResponse, setPendingResponse] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = language === 'bn'
        ? `আসসালামু আলাইকুম! আমি ${currentAgent.name}। Explore Holidays-এ আপনাকে স্বাগতম। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?`
        : `Hello! I'm ${currentAgent.name_en}. Welcome to Explore Holidays. How can I help you today?`;
      
      setMessages([{
        id: Date.now(),
        type: 'agent',
        text: greeting,
        timestamp: new Date(),
        status: 'delivered'
      }]);
    }
  }, [isOpen, currentAgent, language, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAgentTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Simulate human-like delay before showing response
  const simulateHumanTyping = async (responseText) => {
    setIsAgentTyping(true);
    
    // Calculate typing time based on word count (~1 second per word)
    const wordCount = responseText.split(/\s+/).length;
    const typingTime = Math.min(Math.max(wordCount * 800, 2000), 8000); // Min 2s, max 8s
    
    // Add random variation
    const randomDelay = typingTime + (Math.random() * 1500);
    
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    
    setIsAgentTyping(false);
    
    // Add the message after typing
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'agent',
      text: responseText,
      timestamp: new Date(),
      status: 'delivered'
    }]);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isAgentTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message with sent status
    const userMsgId = Date.now();
    setMessages(prev => [...prev, {
      id: userMsgId,
      type: 'user',
      text: userMessage,
      timestamp: new Date(),
      status: 'sent'
    }]);

    // Mark as delivered after a short delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMsgId ? { ...msg, status: 'delivered' } : msg
      ));
    }, 500);

    // Mark as read after another delay
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMsgId ? { ...msg, status: 'read' } : msg
      ));
    }, 1200);

    // Get AI response
    const response = await sendMessage(userMessage, language);

    // Simulate human typing the response
    await simulateHumanTyping(response);
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
      ? `আসসালামু আলাইকুম! আমি ${currentAgent.name}। Explore Holidays-এ আপনাকে স্বাগতম। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?`
      : `Hello! I'm ${currentAgent.name_en}. Welcome to Explore Holidays. How can I help you today?`;
    
    setMessages([{
      id: Date.now(),
      type: 'agent',
      text: greeting,
      timestamp: new Date(),
      status: 'delivered'
    }]);
  };

  // Message status indicator
  const MessageStatus = ({ status }) => {
    if (status === 'sent') {
      return <Check className="w-3.5 h-3.5 text-white/50" />;
    }
    if (status === 'delivered') {
      return <CheckCheck className="w-3.5 h-3.5 text-white/50" />;
    }
    if (status === 'read') {
      return <CheckCheck className="w-3.5 h-3.5 text-blue-400" />;
    }
    return null;
  };

  if (!isEnabled) return null;

  return (
    <>
      {/* Chat Button - Ultra Premium */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group ${
              useGradients 
                ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500'
                : 'bg-slate-900'
            }`}
            style={{ boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)' }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
              <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Ultra Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 650
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] rounded-3xl overflow-hidden flex flex-col ${
              isDark ? 'bg-slate-900' : 'bg-white'
            }`}
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Header - Premium WhatsApp-like */}
            <div className={`px-4 py-4 flex items-center gap-3 ${
              useGradients 
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500'
                : 'bg-slate-800'
            }`}>
              <div className="relative">
                <img 
                  src={currentAgent.avatar} 
                  alt={currentAgent.name}
                  className="w-12 h-12 rounded-full border-2 border-white/20 object-cover shadow-lg"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-base truncate">{currentAgent.name}</h3>
                <p className="text-white/80 text-sm flex items-center gap-1.5">
                  {isTyping || isAgentTyping ? (
                    <>
                      <span className="flex gap-0.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                      <span className="ml-1 text-xs">{language === 'bn' ? 'টাইপ করছে...' : 'typing...'}</span>
                    </>
                  ) : (
                    <span className="text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      {language === 'bn' ? 'অনলাইন' : 'Online'}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Minimize2 className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div 
                  className={`flex-1 overflow-y-auto p-4 space-y-3 ${
                    isDark 
                      ? 'bg-slate-900' 
                      : 'bg-gradient-to-b from-slate-50 to-slate-100'
                  }`}
                  style={{ 
                    backgroundImage: isDark 
                      ? 'none' 
                      : 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                  }}
                >
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
                          className="w-8 h-8 rounded-full mr-2 mt-auto shadow-md flex-shrink-0"
                        />
                      )}
                      <div className={`max-w-[75%] relative group ${
                        message.type === 'user' ? 'order-1' : ''
                      }`}>
                        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                          message.type === 'user'
                            ? useGradients
                              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-md'
                              : 'bg-slate-800 text-white rounded-br-md'
                            : isDark
                              ? 'bg-slate-800 text-white rounded-bl-md border border-slate-700'
                              : 'bg-white text-gray-800 rounded-bl-md shadow-md'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.text}
                          </p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 ${
                          message.type === 'user' ? 'justify-end pr-1' : 'justify-start pl-1'
                        }`}>
                          <span className={`text-[10px] ${
                            isDark ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.type === 'user' && (
                            <MessageStatus status={message.status} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isAgentTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <img 
                        src={currentAgent.avatar} 
                        alt=""
                        className="w-8 h-8 rounded-full mr-2 mt-auto shadow-md"
                      />
                      <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${
                        isDark 
                          ? 'bg-slate-800 border border-slate-700' 
                          : 'bg-white shadow-md'
                      }`}>
                        <div className="flex gap-1.5 items-center h-5">
                          <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0ms' }} />
                          <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '150ms' }} />
                          <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className={`px-4 py-2.5 flex gap-2 overflow-x-auto border-t ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
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
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        isDark 
                          ? 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>

                {/* Input Area - Premium Design */}
                <div className={`p-4 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
                  <div className={`flex items-center gap-3 p-2 rounded-2xl ${
                    isDark ? 'bg-slate-800' : 'bg-gray-100'
                  }`}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={language === 'bn' ? 'মেসেজ লিখুন...' : 'Type a message...'}
                      disabled={isTyping || isAgentTyping}
                      className={`flex-1 px-3 py-2.5 bg-transparent focus:outline-none text-sm ${
                        isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping || isAgentTyping}
                      className={`p-3 rounded-xl transition-all ${
                        inputValue.trim() && !isTyping && !isAgentTyping
                          ? useGradients
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-slate-700 text-white'
                          : isDark
                            ? 'bg-slate-700 text-gray-500'
                            : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className={`text-center text-[10px] mt-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    {currentAgent.name} - Explore Holidays
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
