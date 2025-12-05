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
        return data.message || (language === 'bn' 
          ? 'দুঃখিত, কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Sorry, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('AI Agent Error:', error);
      setIsTyping(false);
      return language === 'bn' 
        ? 'দুঃখিত, সংযোগে সমস্যা হয়েছে।'
        : 'Sorry, there was a connection error.';
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
    agents
  };

  return (
    <AIAgentContext.Provider value={value}>
      {children}
    </AIAgentContext.Provider>
  );
};

export default AIAgentContext;
