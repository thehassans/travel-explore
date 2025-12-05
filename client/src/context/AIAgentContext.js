import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AIAgentContext = createContext();

export const useAIAgent = () => {
  const context = useContext(AIAgentContext);
  if (!context) {
    // Fallback when context is not available - default to enabled
    return { 
      isEnabled: true, 
      agentName: 'Support',
      agentAvatar: '',
      sendMessage: () => Promise.resolve('Sorry, please try again later.'),
      isTyping: false,
      chatSettings: {
        queueAssignTime: 12,
        typingStartDelay: 8,
        replyTimePerWord: 2.5,
        followUpTimeout: 60,
        endChatTimeout: 30
      },
      currentAgent: { name: 'Support Agent', name_en: 'Support Agent', avatar: '' },
      saveChat: () => {},
      generateChatId: () => `EH-${Date.now()}`
    };
  }
  return context;
};

// 15 Bangla agent names with South Asian/Bangladeshi profile pictures
const agents = [
  // Male agents with South Asian male faces
  { name: 'রাফি আহমেদ', name_en: 'Rafi Ahmed', avatar: 'https://randomuser.me/api/portraits/men/86.jpg', gender: 'male' },
  { name: 'সাকিব হাসান', name_en: 'Sakib Hasan', avatar: 'https://randomuser.me/api/portraits/men/87.jpg', gender: 'male' },
  { name: 'মাহমুদ হক', name_en: 'Mahmud Hoque', avatar: 'https://randomuser.me/api/portraits/men/88.jpg', gender: 'male' },
  { name: 'আরিফ চৌধুরী', name_en: 'Arif Chowdhury', avatar: 'https://randomuser.me/api/portraits/men/89.jpg', gender: 'male' },
  { name: 'তৌহিদ ইসলাম', name_en: 'Tawhid Islam', avatar: 'https://randomuser.me/api/portraits/men/90.jpg', gender: 'male' },
  { name: 'রাকিব হোসেন', name_en: 'Rakib Hossain', avatar: 'https://randomuser.me/api/portraits/men/91.jpg', gender: 'male' },
  { name: 'শাহরিয়ার কবির', name_en: 'Shahriar Kabir', avatar: 'https://randomuser.me/api/portraits/men/92.jpg', gender: 'male' },
  { name: 'ইমরান হোসাইন', name_en: 'Imran Hossain', avatar: 'https://randomuser.me/api/portraits/men/93.jpg', gender: 'male' },
  // Female agents with South Asian female faces
  { name: 'তানিয়া আক্তার', name_en: 'Tania Akter', avatar: 'https://randomuser.me/api/portraits/women/86.jpg', gender: 'female' },
  { name: 'নুসরাত জাহান', name_en: 'Nusrat Jahan', avatar: 'https://randomuser.me/api/portraits/women/87.jpg', gender: 'female' },
  { name: 'ফারিয়া রহমান', name_en: 'Faria Rahman', avatar: 'https://randomuser.me/api/portraits/women/88.jpg', gender: 'female' },
  { name: 'সুমাইয়া খান', name_en: 'Sumaiya Khan', avatar: 'https://randomuser.me/api/portraits/women/89.jpg', gender: 'female' },
  { name: 'মিথিলা সরকার', name_en: 'Mithila Sarker', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', gender: 'female' },
  { name: 'সাবরিনা ইসলাম', name_en: 'Sabrina Islam', avatar: 'https://randomuser.me/api/portraits/women/91.jpg', gender: 'female' },
  { name: 'তাসনিম ফেরদৌস', name_en: 'Tasnim Ferdous', avatar: 'https://randomuser.me/api/portraits/women/92.jpg', gender: 'female' },
];

// Generate unique chat ID
const generateChatId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `EH-${timestamp}-${random}`.toUpperCase();
};

// Safe localStorage access for mobile compatibility
const safeGetItem = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const safeGetString = (key, defaultValue = '') => {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch {
    return defaultValue;
  }
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent fail for localStorage issues on mobile
  }
};

const safeSetString = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silent fail for localStorage issues on mobile
  }
};

export const AIAgentProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(() => safeGetItem('aiAgentEnabled', true));
  
  const [apiKey, setApiKey] = useState(() => safeGetString('geminiApiKey', ''));
  
  const [currentAgent, setCurrentAgent] = useState(() => {
    const randomIndex = Math.floor(Math.random() * agents.length);
    return agents[randomIndex];
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [trainingLogs, setTrainingLogs] = useState(() => safeGetItem('aiTrainingLogs', []));

  // Saved chat sessions for admin panel
  const [savedChats, setSavedChats] = useState(() => safeGetItem('aiSavedChats', []));

  // Configurable timing settings (in seconds)
  const [chatSettings, setChatSettings] = useState(() => safeGetItem('aiChatSettings', {
    queueAssignTime: 12,      // Time before agent is assigned (seconds)
    typingStartDelay: 8,      // Delay before typing indicator starts (seconds)
    replyTimePerWord: 2.5,    // Seconds per word for typing reply
    followUpTimeout: 60,      // Seconds before asking if user needs more help
    endChatTimeout: 30        // Seconds after follow-up before ending chat
  }));

  // Rotate agent randomly
  const rotateAgent = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * agents.length);
    setCurrentAgent(agents[randomIndex]);
  }, []);

  // Save settings to localStorage (with safe access)
  useEffect(() => {
    safeSetItem('aiAgentEnabled', isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    if (apiKey) {
      safeSetString('geminiApiKey', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    safeSetItem('aiTrainingLogs', trainingLogs);
  }, [trainingLogs]);

  useEffect(() => {
    safeSetItem('aiChatSettings', chatSettings);
  }, [chatSettings]);

  useEffect(() => {
    safeSetItem('aiSavedChats', savedChats);
  }, [savedChats]);

  // Save a chat session
  const saveChat = useCallback((chatData) => {
    const chatSession = {
      id: chatData.chatId || generateChatId(),
      agentName: chatData.agentName,
      agentAvatar: chatData.agentAvatar,
      messages: chatData.messages,
      startedAt: chatData.startedAt || new Date().toISOString(),
      endedAt: new Date().toISOString(),
      status: chatData.status || 'completed'
    };
    setSavedChats(prev => [chatSession, ...prev].slice(0, 100)); // Keep last 100 chats
    return chatSession.id;
  }, []);

  // Delete a saved chat
  const deleteChat = useCallback((chatId) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
  }, []);

  // Clear all saved chats
  const clearAllChats = useCallback(() => {
    setSavedChats([]);
  }, []);

  // Update chat settings
  const updateChatSettings = useCallback((newSettings) => {
    setChatSettings(prev => ({ ...prev, ...newSettings }));
    addTrainingLog({
      type: 'info',
      message: 'Chat settings updated',
      details: JSON.stringify(newSettings)
    });
  }, []);

  // Add training log
  const addTrainingLog = useCallback((log) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...log
    };
    setTrainingLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50 logs
  }, []);

  // Train the AI agent (validate API key via backend)
  const trainAgent = useCallback(async (newApiKey) => {
    try {
      const response = await fetch('/api/ai-agent/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: newApiKey })
      });

      const data = await response.json();

      if (data.success) {
        setApiKey(newApiKey);
        addTrainingLog({
          type: 'success',
          message: 'API key validated and agent trained successfully',
          details: 'Gemini Pro connected'
        });
        return { success: true, message: 'Agent trained successfully!' };
      } else {
        addTrainingLog({
          type: 'error',
          message: 'API key validation failed',
          details: data.message || 'Unknown error'
        });
        return { success: false, message: data.message || 'Invalid API key' };
      }
    } catch (error) {
      addTrainingLog({
        type: 'error',
        message: 'Connection failed',
        details: error.message
      });
      return { success: false, message: 'Connection failed: ' + error.message };
    }
  }, [addTrainingLog]);

  // Fallback responses when API is not available
  const getFallbackResponse = useCallback((userMessage, language) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|হাই|হ্যালো|আসসালামু)/)) {
      return language === 'bn' 
        ? 'আসসালামু আলাইকুম! Explore Holidays এ স্বাগতম। ফ্লাইট, হলিডে প্যাকেজ বা ভিসা সংক্রান্ত কোনো সাহায্য লাগবে?'
        : 'Hello! Welcome to Explore Holidays. How can I help you with flights, holiday packages, or visa services today?';
    }
    
    // Package queries
    if (lowerMessage.includes('package') || lowerMessage.includes('প্যাকেজ') || lowerMessage.includes('tour') || lowerMessage.includes('ট্যুর')) {
      return language === 'bn' 
        ? 'আমাদের জনপ্রিয় প্যাকেজগুলো হলো: মালদ্বীপ (৮৫,০০০ টাকা থেকে), থাইল্যান্ড (৪৫,০০০ টাকা থেকে), দুবাই (৬৫,০০০ টাকা থেকে), সিঙ্গাপুর (৫২,০০০ টাকা থেকে)। কোন গন্তব্যে যেতে চান?'
        : 'Our popular packages include: Maldives (from 85,000 BDT), Thailand (from 45,000 BDT), Dubai (from 65,000 BDT), Singapore (from 52,000 BDT). Which destination interests you?';
    }
    
    // Visa queries  
    if (lowerMessage.includes('visa') || lowerMessage.includes('ভিসা')) {
      return language === 'bn'
        ? 'আমরা UAE, সিঙ্গাপুর, থাইল্যান্ড, মালয়েশিয়া, তুরস্ক, UK, USA, শেনজেন ভিসা প্রসেস করি। কোন দেশের ভিসা দরকার?'
        : 'We process visas for UAE, Singapore, Thailand, Malaysia, Turkey, UK, USA, and Schengen. Which country visa do you need?';
    }
    
    // Flight queries
    if (lowerMessage.includes('flight') || lowerMessage.includes('ফ্লাইট') || lowerMessage.includes('ticket') || lowerMessage.includes('টিকেট')) {
      return language === 'bn'
        ? 'আমরা সব প্রধান এয়ারলাইন্সে ফ্লাইট বুক করি - বিমান, US-Bangla, Emirates, Qatar Airways। কোথায় যেতে চান এবং কবে?'
        : 'We book flights on all major airlines - Biman, US-Bangla, Emirates, Qatar Airways. Where and when would you like to travel?';
    }
    
    // Price queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('দাম') || lowerMessage.includes('খরচ')) {
      return language === 'bn'
        ? 'প্যাকেজের দাম গন্তব্য অনুযায়ী পরিবর্তিত হয়। থাইল্যান্ড ৪৫,০০০ টাকা থেকে, দুবাই ৬৫,০০০ টাকা থেকে, মালদ্বীপ ৮৫,০০০ টাকা থেকে শুরু। কোন গন্তব্যের দাম জানতে চান?'
        : 'Prices vary by destination. Thailand starts from 45,000 BDT, Dubai from 65,000 BDT, Maldives from 85,000 BDT. Which destination pricing would you like to know?';
    }
    
    // Hotel queries
    if (lowerMessage.includes('hotel') || lowerMessage.includes('হোটেল') || lowerMessage.includes('stay') || lowerMessage.includes('room')) {
      return language === 'bn'
        ? 'আমরা সব বড় হোটেল চেইনে বুকিং করি - Westin, Pan Pacific, Radisson এবং আরো অনেক। কোন শহরে হোটেল খুঁজছেন?'
        : 'We book at all major hotel chains - Westin, Pan Pacific, Radisson and more. Which city are you looking for a hotel in?';
    }
    
    // Contact queries
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('যোগাযোগ') || lowerMessage.includes('ফোন')) {
      return language === 'bn'
        ? 'আমাদের সাথে যোগাযোগ করুন: ফোন: +880 1234-567890, ইমেইল: info@exploreholidays.com, অথবা Gulshan-2, Dhaka তে আমাদের অফিসে আসুন।'
        : 'Contact us at: Phone: +880 1234-567890, Email: info@exploreholidays.com, or visit our office at Gulshan-2, Dhaka.';
    }
    
    // Default response
    return language === 'bn' 
      ? 'আমি Explore Holidays এ কাজ করি। ফ্লাইট বুকিং, হলিডে প্যাকেজ, হোটেল বা ভিসা সেবায় আপনাকে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?'
      : 'I work at Explore Holidays. I can help you with flight bookings, holiday packages, hotels, or visa services. How can I assist you?';
  }, []);

  // Send message to AI agent via backend
  const sendMessage = useCallback(async (userMessage, language = 'en') => {
    setIsTyping(true);
    
    // If no API key, use fallback responses immediately
    if (!apiKey) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate typing delay
      setIsTyping(false);
      return getFallbackResponse(userMessage, language);
    }

    try {
      const response = await fetch('/api/ai-agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          message: userMessage,
          agentName: currentAgent.name,
          agentNameEn: currentAgent.name_en,
          language,
          chatHistory: chatHistory.slice(-6)
        })
      });

      const data = await response.json();

      if (data.success) {
        const aiResponse = data.response;
        
        // Update chat history
        setChatHistory(prev => [
          ...prev,
          { role: 'user', parts: [{ text: userMessage }] },
          { role: 'model', parts: [{ text: aiResponse }] }
        ].slice(-10)); // Keep last 10 messages

        setIsTyping(false);
        return aiResponse;
      } else {
        setIsTyping(false);
        return getFallbackResponse(userMessage, language);
      }
    } catch (error) {
      console.error('AI Agent Error:', error);
      setIsTyping(false);
      return getFallbackResponse(userMessage, language);
    }
  }, [apiKey, currentAgent, chatHistory, getFallbackResponse]);

  // Toggle agent on/off
  const toggleAgent = useCallback(() => {
    setIsEnabled(prev => !prev);
    addTrainingLog({
      type: 'info',
      message: `Agent ${!isEnabled ? 'enabled' : 'disabled'}`,
      details: 'Status changed by admin'
    });
  }, [isEnabled, addTrainingLog]);

  // Clear chat history
  const clearHistory = useCallback(() => {
    setChatHistory([]);
    rotateAgent(); // Assign new agent on clear
  }, [rotateAgent]);

  // Clear training logs
  const clearLogs = useCallback(() => {
    setTrainingLogs([]);
    localStorage.removeItem('aiTrainingLogs');
  }, []);

  // Save API key without training
  const saveApiKey = useCallback((key) => {
    setApiKey(key);
    localStorage.setItem('geminiApiKey', key);
    addTrainingLog({
      type: 'info',
      message: 'API key saved',
      details: 'Key saved to storage'
    });
  }, [addTrainingLog]);

  // Check if API is connected
  const checkConnection = useCallback(async () => {
    if (!apiKey) {
      return { success: false, message: 'No API key saved' };
    }
    try {
      const response = await fetch('/api/ai-agent/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey })
      });
      const data = await response.json();
      addTrainingLog({
        type: data.success ? 'success' : 'error',
        message: data.success ? 'Connection verified' : 'Connection failed',
        details: data.message
      });
      return data;
    } catch (error) {
      addTrainingLog({
        type: 'error',
        message: 'Connection check failed',
        details: error.message
      });
      return { success: false, message: error.message };
    }
  }, [apiKey, addTrainingLog]);

  const value = {
    isEnabled,
    setIsEnabled,
    apiKey,
    setApiKey,
    currentAgent,
    rotateAgent,
    isTyping,
    sendMessage,
    trainAgent,
    toggleAgent,
    trainingLogs,
    clearHistory,
    clearLogs,
    saveApiKey,
    checkConnection,
    agents,
    chatSettings,
    updateChatSettings,
    savedChats,
    saveChat,
    deleteChat,
    clearAllChats,
    generateChatId
  };

  return (
    <AIAgentContext.Provider value={value}>
      {children}
    </AIAgentContext.Provider>
  );
};

export default AIAgentContext;
