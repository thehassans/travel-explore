import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  Eye,
  X,
  Clock,
  User,
  Bot,
  Calendar,
  Filter,
  Download,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useAIAgent } from '../../context/AIAgentContext';
import { useTheme } from '../../context/ThemeContext';

const AdminAgentChats = () => {
  const { savedChats, deleteChat, clearAllChats } = useAIAgent();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Filter chats
  const filteredChats = savedChats.filter(chat => {
    const matchesSearch = 
      chat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.messages.some(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || chat.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'closed_by_user': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const exportChats = () => {
    const dataStr = JSON.stringify(savedChats, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `agent-chats-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Agent Chats
            </h1>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              View and manage all AI support chat sessions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-2 rounded-xl font-medium ${
              isDark ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'
            } shadow-lg`}>
              {savedChats.length} Total Chats
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportChats}
              disabled={savedChats.length === 0}
              className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
            </motion.button>
            {savedChats.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete all chats?')) {
                    clearAllChats();
                  }
                }}
                className="p-3 rounded-xl bg-red-500 text-white shadow-lg"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className={`p-4 rounded-2xl mb-6 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search by Chat ID, agent name, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-3 rounded-xl border ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="closed_by_user">Closed by User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chats List */}
        {filteredChats.length === 0 ? (
          <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}>
            <MessageSquare className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Chats Found
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Chat sessions will appear here when users interact with the AI support'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={chat.agentAvatar} 
                      alt={chat.agentName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {chat.agentName}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(chat.status)}`}>
                          {chat.status === 'completed' ? 'Completed' : 'Closed'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <button
                          onClick={() => copyToClipboard(chat.id)}
                          className={`flex items-center gap-1 font-mono ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          } hover:underline`}
                        >
                          {copiedId === chat.id ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {chat.id}
                        </button>
                        <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(chat.startedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-lg text-sm ${
                      isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {chat.messages.length} messages
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedChat(chat)}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (window.confirm('Delete this chat?')) {
                          deleteChat(chat.id);
                        }
                      }}
                      className={`p-2.5 rounded-xl ${
                        isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Preview of last message */}
                {chat.messages.length > 0 && (
                  <div className={`mt-4 p-3 rounded-xl ${
                    isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                  }`}>
                    <p className={`text-sm truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="font-medium">Last:</span> {chat.messages[chat.messages.length - 1].text}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Chat Detail Modal */}
        <AnimatePresence>
          {selectedChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedChat(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                } shadow-2xl`}
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedChat.agentAvatar} 
                      alt={selectedChat.agentName}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <div>
                      <h3 className="text-white font-bold">{selectedChat.agentName}</h3>
                      <p className="text-white/80 text-sm font-mono">{selectedChat.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="p-2 rounded-full hover:bg-white/20 text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className={`p-4 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`} style={{ maxHeight: '60vh' }}>
                  <div className="space-y-3">
                    {selectedChat.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.type === 'system' ? 'justify-center' :
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.type === 'system' ? (
                          <div className={`px-4 py-2 rounded-full text-xs ${
                            isDark 
                              ? 'bg-slate-800 text-gray-400' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {message.text}
                          </div>
                        ) : (
                          <div className={`flex items-end gap-2 max-w-[80%] ${
                            message.type === 'user' ? 'flex-row-reverse' : ''
                          }`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              message.type === 'user' 
                                ? 'bg-indigo-500' 
                                : 'bg-slate-600'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className={`px-4 py-2.5 rounded-2xl ${
                              message.type === 'user'
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-md'
                                : isDark
                                  ? 'bg-slate-800 text-white rounded-bl-md'
                                  : 'bg-white text-gray-900 rounded-bl-md shadow'
                            }`}>
                              <p className="text-sm">{message.text}</p>
                              <p className={`text-[10px] mt-1 ${
                                message.type === 'user' ? 'text-white/60' : isDark ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className={`p-4 border-t ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center justify-between text-sm">
                    <div className={`flex items-center gap-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Started: {formatDate(selectedChat.startedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Ended: {formatDate(selectedChat.endedAt)}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selectedChat.id)}
                      className="flex items-center gap-1 text-indigo-500 hover:underline"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Chat ID
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminAgentChats;
