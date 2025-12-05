import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AIAgentContext = createContext();

export const useAIAgent = () => {
  const context = useContext(AIAgentContext);
  if (!context) {
    return { 
      isEnabled: false, 
      agentName: 'Support',
      agentAvatar: '',
      sendMessage: () => Promise.resolve(''),
      isTyping: false
    };
  }
  return context;
};

// 15 Bangla agent names with profile pictures
const agents = [
  { name: 'রাফি আহমেদ', name_en: 'Rafi Ahmed', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'male' },
  { name: 'তানিয়া আক্তার', name_en: 'Tania Akter', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', gender: 'female' },
  { name: 'সাকিব হাসান', name_en: 'Sakib Hasan', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', gender: 'male' },
  { name: 'নুসরাত জাহান', name_en: 'Nusrat Jahan', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', gender: 'female' },
  { name: 'মাহমুদ হক', name_en: 'Mahmud Hoque', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', gender: 'male' },
  { name: 'ফারিয়া রহমান', name_en: 'Faria Rahman', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', gender: 'female' },
  { name: 'আরিফ চৌধুরী', name_en: 'Arif Chowdhury', avatar: 'https://randomuser.me/api/portraits/men/67.jpg', gender: 'male' },
  { name: 'সুমাইয়া খান', name_en: 'Sumaiya Khan', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', gender: 'female' },
  { name: 'তৌহিদ ইসলাম', name_en: 'Tawhid Islam', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', gender: 'male' },
  { name: 'মিথিলা সরকার', name_en: 'Mithila Sarker', avatar: 'https://randomuser.me/api/portraits/women/29.jpg', gender: 'female' },
  { name: 'রাকিব হোসেন', name_en: 'Rakib Hossain', avatar: 'https://randomuser.me/api/portraits/men/36.jpg', gender: 'male' },
  { name: 'সাবরিনা ইসলাম', name_en: 'Sabrina Islam', avatar: 'https://randomuser.me/api/portraits/women/42.jpg', gender: 'female' },
  { name: 'শাহরিয়ার কবির', name_en: 'Shahriar Kabir', avatar: 'https://randomuser.me/api/portraits/men/48.jpg', gender: 'male' },
  { name: 'তাসনিম ফেরদৌস', name_en: 'Tasnim Ferdous', avatar: 'https://randomuser.me/api/portraits/women/63.jpg', gender: 'female' },
  { name: 'ইমরান হোসাইন', name_en: 'Imran Hossain', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', gender: 'male' },
];

export const AIAgentProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('aiAgentEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('geminiApiKey') || '';
  });
  
  const [currentAgent, setCurrentAgent] = useState(() => {
    const randomIndex = Math.floor(Math.random() * agents.length);
    return agents[randomIndex];
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [trainingLogs, setTrainingLogs] = useState(() => {
    const saved = localStorage.getItem('aiTrainingLogs');
    return saved ? JSON.parse(saved) : [];
  });

  // Rotate agent randomly
  const rotateAgent = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * agents.length);
    setCurrentAgent(agents[randomIndex]);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('aiAgentEnabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('geminiApiKey', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('aiTrainingLogs', JSON.stringify(trainingLogs));
  }, [trainingLogs]);

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

  // Send message to AI agent via backend
  const sendMessage = useCallback(async (userMessage, language = 'en') => {
    if (!apiKey || !isEnabled) {
      return language === 'bn' 
        ? 'দুঃখিত, আমাদের সাপোর্ট সিস্টেম বর্তমানে অফলাইনে আছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
        : 'Sorry, our support system is currently offline. Please try again later.';
    }

    setIsTyping(true);

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
        // Provide helpful fallback based on common queries
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('package') || lowerMessage.includes('প্যাকেজ')) {
          return language === 'bn' 
            ? 'আমাদের জনপ্রিয় প্যাকেজগুলো হলো: মালদ্বীপ (৮৫,০০০ টাকা থেকে), থাইল্যান্ড (৪৫,০০০ টাকা থেকে), দুবাই (৬৫,০০০ টাকা থেকে), সিঙ্গাপুর (৫২,০০০ টাকা থেকে)। কোন গন্তব্যে যেতে চান?'
            : 'Our popular packages include: Maldives (from 85,000 BDT), Thailand (from 45,000 BDT), Dubai (from 65,000 BDT), Singapore (from 52,000 BDT). Which destination interests you?';
        }
        if (lowerMessage.includes('visa') || lowerMessage.includes('ভিসা')) {
          return language === 'bn'
            ? 'আমরা UAE, সিঙ্গাপুর, থাইল্যান্ড, মালয়েশিয়া, তুরস্ক, UK, USA, শেনজেন ভিসা প্রসেস করি। কোন দেশের ভিসা দরকার?'
            : 'We process visas for UAE, Singapore, Thailand, Malaysia, Turkey, UK, USA, and Schengen. Which country visa do you need?';
        }
        if (lowerMessage.includes('flight') || lowerMessage.includes('ফ্লাইট')) {
          return language === 'bn'
            ? 'আমরা সব প্রধান এয়ারলাইন্সে ফ্লাইট বুক করি - বিমান, US-Bangla, Emirates, Qatar Airways। কোথায় যেতে চান?'
            : 'We book flights on all major airlines - Biman, US-Bangla, Emirates, Qatar Airways. Where would you like to go?';
        }
        return language === 'bn' 
          ? 'আমি Explore Holidays এ কাজ করি। ফ্লাইট বুকিং, হলিডে প্যাকেজ, বা ভিসা সেবায় আপনাকে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?'
          : 'I work at Explore Holidays. I can help you with flight bookings, holiday packages, or visa services. How can I assist you?';
      }
    } catch (error) {
      console.error('AI Agent Error:', error);
      setIsTyping(false);
      // Provide helpful response even on error
      return language === 'bn' 
        ? 'আমি Explore Holidays এ কাজ করি। ফ্লাইট, প্যাকেজ বা ভিসা সংক্রান্ত যেকোনো প্রশ্নে সাহায্য করতে পারি। কিভাবে সাহায্য করতে পারি?'
        : 'I work at Explore Holidays. I can help with flights, packages or visa queries. How can I assist you today?';
    }
  }, [apiKey, isEnabled, currentAgent, chatHistory]);

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
    agents
  };

  return (
    <AIAgentContext.Provider value={value}>
      {children}
    </AIAgentContext.Provider>
  );
};

export default AIAgentContext;
