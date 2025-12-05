import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  Check,
  CheckCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useGradient } from '../../context/GradientContext';
import { useAIAgent } from '../../context/AIAgentContext';

const AIChatWidget = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const { useGradients } = useGradient();
  const { isEnabled, currentAgent, sendMessage, isTyping, chatSettings } = useAIAgent();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  
  // Simple chat states
  const [agentAssigned, setAgentAssigned] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [chatEnded, setChatEnded] = useState(false);
  const [userName, setUserName] = useState('');
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const queueTimerRef = useRef(null);

  // Inactivity timeout (2 minutes default)
  const INACTIVITY_TIMEOUT = 120000;

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (agentAssigned && !chatEnded) {
      inactivityTimerRef.current = setTimeout(() => {
        // End chat due to inactivity
        const endMsg = language === 'bn'
          ? `আপনার সময়ের জন্য ধন্যবাদ${userName ? `, ${userName}` : ''}। আবার কোনো প্রশ্ন থাকলে জানাবেন।`
          : `Thank you for your time${userName ? `, ${userName}` : ''}. Feel free to reach out if you have any questions.`;
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'system',
          text: endMsg,
          timestamp: new Date()
        }]);
        setChatEnded(true);
      }, INACTIVITY_TIMEOUT);
    }
  }, [agentAssigned, chatEnded, language, userName]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAgentTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && !chatEnded) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, chatEnded]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (queueTimerRef.current) clearTimeout(queueTimerRef.current);
    };
  }, []);

  // Simulate human-like delay before showing response
  const simulateHumanTyping = async (responseText) => {
    // Wait for typing start delay
    await new Promise(resolve => setTimeout(resolve, chatSettings.typingStartDelay * 1000));
    
    setIsAgentTyping(true);
    
    // Calculate typing time based on word count
    const wordCount = responseText.split(/\s+/).length;
    const typingTime = Math.min(Math.max(wordCount * chatSettings.replyTimePerWord * 1000, 4000), 25000);
    
    // Add random variation for human-like feel
    const randomDelay = typingTime + (Math.random() * 2000);
    
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
    
    // Reset inactivity timer after agent responds
    resetInactivityTimer();
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping || isAgentTyping || chatEnded) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Try to extract name from first message (English only)
    if (isFirstMessage) {
      const nameMatch = userMessage.match(/(?:i am|i'm|my name is|this is)\s+([a-zA-Z]+)/i);
      if (nameMatch) {
        setUserName(nameMatch[1]);
      }
    }

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

    // If first message, show queue and then connect
    if (isFirstMessage) {
      setIsFirstMessage(false);
      
      // Add to queue message
      const queueMsg = language === 'bn'
        ? 'আপনাকে কিউতে যোগ করা হয়েছে। একজন এজেন্ট শীঘ্রই আপনার সাথে যোগাযোগ করবে...'
        : 'You have been added to the queue. An agent will be with you shortly...';
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'system',
        text: queueMsg,
        timestamp: new Date()
      }]);

      // After queue time, assign agent
      queueTimerRef.current = setTimeout(() => {
        setAgentAssigned(true);
        
        // Connected message
        const connectMsg = language === 'bn'
          ? `আপনি ${currentAgent.name} এর সাথে সংযুক্ত হয়েছেন।`
          : `You are now connected with ${currentAgent.name_en}.`;
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          type: 'system',
          text: connectMsg,
          timestamp: new Date()
        }]);

        // Agent greeting after short delay
        setTimeout(async () => {
          const greeting = language === 'bn'
            ? `আসসালামু আলাইকুম! কিভাবে সাহায্য করতে পারি?`
            : `Hello! How can I help you today?`;
          
          await simulateHumanTyping(greeting);
          
          // Now get AI response for the user's actual question
          const response = await sendMessage(userMessage, language);
          await simulateHumanTyping(response);
        }, 1500);
        
      }, chatSettings.queueAssignTime * 1000);
      
    } else {
      // Normal message flow - agent already assigned
      resetInactivityTimer();
      const response = await sendMessage(userMessage, language);
      await simulateHumanTyping(response);
    }
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
    // Reset all states for next time
    setAgentAssigned(false);
    setIsFirstMessage(true);
    setChatEnded(false);
    setUserName('');
    setMessages([]);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (queueTimerRef.current) clearTimeout(queueTimerRef.current);
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
            {/* Header */}
            <div className={`px-4 py-4 flex items-center gap-3 ${
              useGradients 
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500'
                : 'bg-slate-800'
            }`}>
              {agentAssigned ? (
                // Agent Header
                <>
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
                      {(isTyping || isAgentTyping) && (
                        <>
                          <span className="flex gap-0.5">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                          <span className="ml-1 text-xs">{language === 'bn' ? 'টাইপ করছে...' : 'typing...'}</span>
                        </>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                // Support Header (before agent assigned)
                <>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-base">
                      {language === 'bn' ? 'সাপোর্ট' : 'Support'}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {language === 'bn' ? 'আমরা সাহায্য করতে প্রস্তুত' : 'We are here to help'}
                    </p>
                  </div>
                </>
              )}
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

            {/* Content Area */}
            {!isMinimized && (
              <>
                {/* Messages Area - Always shown */}
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
                  {/* Welcome message when chat is empty */}
                  {messages.length === 0 && (
                    <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">
                        {language === 'bn' 
                          ? 'আপনার প্রশ্ন লিখুন, আমরা সাহায্য করতে এখানে আছি।' 
                          : 'Type your question, we are here to help.'}
                      </p>
                    </div>
                  )}
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.type === 'system' ? 'justify-center' : 
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.type === 'system' ? (
                        // System message (agent assigned notification)
                        <div className={`px-4 py-2 rounded-full text-xs ${
                          isDark 
                            ? 'bg-slate-800 text-gray-400 border border-slate-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {message.text}
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
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

                {/* Input Area - Always shown unless chat ended */}
                {!chatEnded && (
                  <div className={`p-4 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                    <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
                      isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={language === 'bn' ? 'মেসেজ লিখুন...' : 'Type a message...'}
                        disabled={isTyping || isAgentTyping}
                        className={`flex-1 px-2 py-2 bg-transparent focus:outline-none text-sm ${
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
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
