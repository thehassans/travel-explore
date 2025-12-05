const express = require('express');
const router = express.Router();

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

// Validate API Key
router.post('/validate', async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ success: false, message: 'API key is required' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Say "API Connected Successfully" in exactly those words.' }] }]
        })
      }
    );

    if (response.ok) {
      const data = await response.json();
      return res.json({ 
        success: true, 
        message: 'API key validated and agent trained successfully!',
        response: data.candidates?.[0]?.content?.parts?.[0]?.text
      });
    } else {
      const error = await response.json();
      return res.status(400).json({ 
        success: false, 
        message: error.error?.message || 'Invalid API key' 
      });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Connection failed: ' + error.message 
    });
  }
});

// Chat with AI Agent
router.post('/chat', async (req, res) => {
  const { apiKey, message, agentName, agentNameEn, language, chatHistory } = req.body;

  if (!apiKey) {
    return res.status(400).json({ 
      success: false, 
      message: language === 'bn' 
        ? 'দুঃখিত, আমাদের সাপোর্ট সিস্টেম বর্তমানে অফলাইনে আছে।'
        : 'Sorry, our support system is currently offline.'
    });
  }

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  try {
    const systemPrompt = `${projectKnowledge}

CURRENT AGENT: Your name is ${agentName} (${agentNameEn}).
LANGUAGE: Respond in ${language === 'bn' ? 'Bengali (Bangla)' : 'English'}.
Keep responses concise but helpful. Maximum 2-3 sentences unless more detail is needed.
`;

    const contents = [
      { role: 'user', parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: `I understand. I am ${agentNameEn} from Explore Holidays. I will help customers with travel-related queries in a friendly, human manner.` }] },
    ];

    // Add chat history (last 6 messages)
    if (chatHistory && Array.isArray(chatHistory)) {
      contents.push(...chatHistory.slice(-6));
    }

    // Add current message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
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
        (language === 'bn' ? 'দুঃখিত, আমি এখন উত্তর দিতে পারছি না।' : "Sorry, I couldn't process that.");
      
      return res.json({ success: true, response: aiResponse });
    } else {
      const error = await response.json();
      console.error('Gemini API Error:', error);
      return res.status(400).json({ 
        success: false, 
        message: language === 'bn' 
          ? 'দুঃখিত, কিছু সমস্যা হয়েছে।'
          : 'Sorry, something went wrong.'
      });
    }
  } catch (error) {
    console.error('AI Chat Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: language === 'bn' 
        ? 'দুঃখিত, সংযোগে সমস্যা হয়েছে।'
        : 'Sorry, there was a connection error.'
    });
  }
});

module.exports = router;
