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

// Project knowledge base for training
const projectKnowledge = `
You are a friendly customer support agent for Explore Holidays, a premium travel agency based in Bangladesh.

COMPANY INFO:
- Name: Explore Holidays
- Location: Dhaka, Bangladesh
- Services: Flight booking, Holiday packages, Visa processing, Hotel booking, Travel insurance, Car rental, Tour guides
- Contact: +880 1234-567890, support@exploreholidays.com
- Working hours: 9 AM - 10 PM (Bangladesh Time)

SERVICES WE OFFER:
1. Flight Booking - Domestic and international flights at best prices
2. Holiday Packages - Curated packages for Maldives, Thailand, Malaysia, Singapore, Dubai, Turkey, Europe
3. Visa Services - UAE, Singapore, Thailand, Malaysia, Turkey, UK, USA, Schengen visas
4. Hotel Booking - 5-star hotels and resorts worldwide
5. Travel Insurance - Comprehensive coverage plans
6. Car Rental - Economy to luxury vehicles with drivers
7. Tour Guides - Expert local guides for all destinations

POPULAR DESTINATIONS:
- Cox's Bazar (Bangladesh's longest sea beach)
- Sundarbans (Largest mangrove forest)
- Sylhet (Tea gardens and waterfalls)
- Maldives (Luxury beach resorts)
- Thailand (Bangkok, Phuket, Pattaya)
- Malaysia (Kuala Lumpur, Langkawi)
- Singapore (Modern city experience)
- Dubai (Shopping and entertainment)

PAYMENT OPTIONS:
- bKash, Nagad, Rocket
- Credit/Debit cards (Visa, Mastercard)
- Bank transfer
- Cash payment at office

BOOKING PROCESS:
1. Search and select your package/flight/visa
2. Fill in traveler details
3. Make payment
4. Receive confirmation via email/SMS
5. Get e-ticket/voucher

CANCELLATION POLICY:
- Free cancellation up to 48 hours before travel
- 50% refund for cancellations within 48 hours
- No refund for no-shows

RESPONSE STYLE:
- Be warm, friendly, and helpful
- Use simple language
- Add relevant emojis occasionally
- If asked about prices, provide approximate ranges
- Always offer to help with more questions
- Be conversational, not robotic
- Use phrases like "I'd be happy to help!", "Let me check that for you", "Great question!"
`;

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

  // Train the AI agent (validate API key)
  const trainAgent = useCallback(async (newApiKey) => {
    try {
      // Test the API key with a simple request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${newApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Say "API Connected Successfully" in exactly those words.' }] }]
          })
        }
      );

      if (response.ok) {
        setApiKey(newApiKey);
        addTrainingLog({
          type: 'success',
          message: 'API key validated and agent trained successfully',
          details: 'Gemini Pro connected'
        });
        return { success: true, message: 'Agent trained successfully!' };
      } else {
        const error = await response.json();
        addTrainingLog({
          type: 'error',
          message: 'API key validation failed',
          details: error.error?.message || 'Unknown error'
        });
        return { success: false, message: error.error?.message || 'Invalid API key' };
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

  // Send message to AI agent
  const sendMessage = useCallback(async (userMessage, language = 'en') => {
    if (!apiKey || !isEnabled) {
      return language === 'bn' 
        ? 'দুঃখিত, আমাদের সাপোর্ট সিস্টেম বর্তমানে অফলাইনে আছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।'
        : 'Sorry, our support system is currently offline. Please try again later.';
    }

    setIsTyping(true);

    try {
      const systemPrompt = `${projectKnowledge}

CURRENT AGENT: Your name is ${currentAgent.name} (${currentAgent.name_en}).
LANGUAGE: Respond in ${language === 'bn' ? 'Bengali (Bangla)' : 'English'}.
Keep responses concise but helpful. Maximum 2-3 sentences unless more detail is needed.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt }] },
              { role: 'model', parts: [{ text: 'I understand. I am ' + currentAgent.name_en + ' from Explore Holidays. I will help customers with travel-related queries in a friendly, human manner.' }] },
              ...chatHistory.slice(-6), // Keep last 6 messages for context
              { role: 'user', parts: [{ text: userMessage }] }
            ],
            generationConfig: {
              temperature: 0.8,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 200,
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
          (language === 'bn' ? 'দুঃখিত, আমি এখন উত্তর দিতে পারছি না।' : 'Sorry, I couldn\'t process that.');
        
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
        return language === 'bn' 
          ? 'দুঃখিত, কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Sorry, something went wrong. Please try again.';
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
