import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Key, 
  Power,
  PowerOff,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Clock,
  Users,
  MessageCircle,
  Sparkles,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Activity
} from 'lucide-react';
import { useAIAgent } from '../../context/AIAgentContext';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminAIAgent = () => {
  const { 
    isEnabled, 
    toggleAgent, 
    apiKey, 
    trainAgent, 
    trainingLogs, 
    agents,
    currentAgent,
    clearLogs,
    saveApiKey,
    checkConnection,
    chatSettings,
    updateChatSettings
  } = useAIAgent();
  
  const [newApiKey, setNewApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [trainingResult, setTrainingResult] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  
  // Chat timing settings
  const [queueTime, setQueueTime] = useState(chatSettings?.queueAssignTime || 12);
  const [typingDelay, setTypingDelay] = useState(chatSettings?.typingStartDelay || 8);
  const [replySpeed, setReplySpeed] = useState(chatSettings?.replyTimePerWord || 2.5);
  const [followUpTime, setFollowUpTime] = useState(chatSettings?.followUpTimeout || 60);
  const [endChatTime, setEndChatTime] = useState(chatSettings?.endChatTimeout || 30);

  const handleSaveSettings = () => {
    updateChatSettings({
      queueAssignTime: queueTime,
      typingStartDelay: typingDelay,
      replyTimePerWord: replySpeed,
      followUpTimeout: followUpTime,
      endChatTimeout: endChatTime
    });
    setTrainingResult({ success: true, message: 'Chat settings saved!' });
  };

  const handleTrain = async () => {
    if (!newApiKey.trim()) return;
    
    setIsTraining(true);
    setTrainingResult(null);
    setConnectionStatus(null);
    
    const result = await trainAgent(newApiKey);
    setTrainingResult(result);
    setIsTraining(false);
  };

  const handleSave = () => {
    if (!newApiKey.trim()) return;
    saveApiKey(newApiKey);
    setTrainingResult({ success: true, message: 'API key saved successfully!' });
  };

  const handleCheckConnection = async () => {
    setIsChecking(true);
    setConnectionStatus(null);
    const result = await checkConnection();
    setConnectionStatus(result);
    setIsChecking(false);
  };

  const handleClearLogs = () => {
    clearLogs();
    setTrainingResult(null);
    setConnectionStatus(null);
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-500/20 bg-green-500/5';
      case 'error': return 'border-red-500/20 bg-red-500/5';
      case 'info': return 'border-blue-500/20 bg-blue-500/5';
      default: return 'border-yellow-500/20 bg-yellow-500/5';
    }
  };

  return (
    <AdminLayout>
    <div className="bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Support Agent</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your AI-powered customer support</p>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleAgent}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${
                isEnabled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300'
              }`}
            >
              {isEnabled ? (
                <>
                  <Power className="w-5 h-5" />
                  Agent Active
                </>
              ) : (
                <>
                  <PowerOff className="w-5 h-5" />
                  Agent Disabled
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* API Key Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Gemini API Configuration</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enter your Google Gemini API key to train the agent</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={newApiKey}
                      onChange={(e) => setNewApiKey(e.target.value)}
                      placeholder="Enter your Gemini API key..."
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
                    >
                      {showApiKey ? (
                        <EyeOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Get your API key from{' '}
                    <a 
                      href="https://aistudio.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Save Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={!newApiKey.trim()}
                    className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      !newApiKey.trim()
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                    }`}
                  >
                    <Save className="w-5 h-5" />
                    Save Key
                  </motion.button>

                  {/* Check Connection Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckConnection}
                    disabled={isChecking || !apiKey}
                    className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isChecking || !apiKey
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                    }`}
                  >
                    {isChecking ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Check Connection
                      </>
                    )}
                  </motion.button>

                  {/* Train Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTrain}
                    disabled={isTraining || !newApiKey.trim()}
                    className={`py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      isTraining || !newApiKey.trim()
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                    }`}
                  >
                    {isTraining ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Training...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Train Agent
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Connection Status */}
                {connectionStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      connectionStatus.success 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}
                  >
                    {connectionStatus.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <p className={connectionStatus.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                      {connectionStatus.success ? '✓ API Connected Successfully!' : connectionStatus.message}
                    </p>
                  </motion.div>
                )}

                {/* Training Result */}
                {trainingResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      trainingResult.success 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}
                  >
                    {trainingResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <p className={trainingResult.success ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                      {trainingResult.message}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Chat Timing Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Chat Timing Settings</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Configure queue and typing delays</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Queue Assign Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Queue Assign Time (seconds)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="30"
                      step="1"
                      value={queueTime}
                      onChange={(e) => setQueueTime(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-16 text-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold">
                      {queueTime}s
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Time before agent is assigned to user
                  </p>
                </div>

                {/* Typing Start Delay */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Typing Start Delay (seconds)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="3"
                      max="20"
                      step="1"
                      value={typingDelay}
                      onChange={(e) => setTypingDelay(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-16 text-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold">
                      {typingDelay}s
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Delay before typing indicator appears after user message
                  </p>
                </div>

                {/* Reply Speed Per Word */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reply Speed (seconds per word)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.5"
                      value={replySpeed}
                      onChange={(e) => setReplySpeed(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-16 text-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold">
                      {replySpeed}s
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Time per word for typing the reply
                  </p>
                </div>

                {/* Follow-up Timeout */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Follow-up Wait Time (seconds)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="30"
                      max="180"
                      step="10"
                      value={followUpTime}
                      onChange={(e) => setFollowUpTime(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-16 text-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold">
                      {followUpTime}s
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Time before agent asks if user needs more help
                  </p>
                </div>

                {/* End Chat Timeout */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Chat Wait Time (seconds)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="5"
                      value={endChatTime}
                      onChange={(e) => setEndChatTime(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-16 text-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-bold">
                      {endChatTime}s
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Time after follow-up before ending chat automatically
                  </p>
                </div>

                {/* Save Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveSettings}
                  className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  Save Settings
                </motion.button>
              </div>
            </motion.div>

            {/* Training Logs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Training Logs</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recent agent training activity</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                    {trainingLogs.length} logs
                  </span>
                  {trainingLogs.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClearLogs}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {trainingLogs.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No training logs yet</p>
                  </div>
                ) : (
                  trainingLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-xl border ${getLogColor(log.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getLogIcon(log.type)}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{log.message}</p>
                          {log.details && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{log.details}</p>
                          )}
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Agent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Current Agent</h3>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20">
                <div className="relative">
                  <img 
                    src={currentAgent.avatar} 
                    alt={currentAgent.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    isEnabled ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{currentAgent.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{currentAgent.name_en}</p>
                </div>
              </div>
            </motion.div>

            {/* All Agents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Agent Roster</h3>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                  {agents.length} agents
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {agents.map((agent, index) => (
                  <div 
                    key={index}
                    className="relative group"
                    title={`${agent.name} (${agent.name_en})`}
                  >
                    <img 
                      src={agent.avatar} 
                      alt={agent.name}
                      className="w-full aspect-square rounded-xl object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-xs text-center px-1 leading-tight">{agent.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-3xl p-6 shadow-xl ${
                isEnabled && apiKey
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  {isEnabled && apiKey ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">Agent Status</h3>
                  <p className="text-white/80 text-sm">
                    {isEnabled && apiKey ? 'Fully Operational' : 'Configuration Needed'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-white/90 text-sm">
                  <span>Power Status</span>
                  <span className="font-medium">{isEnabled ? '✓ On' : '✗ Off'}</span>
                </div>
                <div className="flex items-center justify-between text-white/90 text-sm">
                  <span>API Connected</span>
                  <span className="font-medium">{apiKey ? '✓ Yes' : '✗ No'}</span>
                </div>
                <div className="flex items-center justify-between text-white/90 text-sm">
                  <span>Frontend Widget</span>
                  <span className="font-medium">{isEnabled && apiKey ? '✓ Active' : '✗ Hidden'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminAIAgent;
