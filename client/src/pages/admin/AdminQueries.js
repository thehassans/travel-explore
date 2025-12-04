import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Calendar, Trash2, CheckCircle, Clock, Eye } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('/api/admin/queries');
      setQueries(response.data.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/queries/${id}`, { status });
      setQueries(queries.map(q => q.id === id ? { ...q, status } : q));
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  const deleteQuery = async (id) => {
    if (window.confirm('Are you sure you want to delete this query?')) {
      try {
        await axios.delete(`/api/admin/queries/${id}`);
        setQueries(queries.filter(q => q.id !== id));
      } catch (error) {
        console.error('Error deleting query:', error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Customer Queries</h1>
            <p className="text-gray-400 mt-1">Manage and respond to customer inquiries</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
              {queries.filter(q => q.status === 'pending').length} Pending
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
              {queries.filter(q => q.status === 'replied').length} Replied
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid gap-4">
            {queries.map((query, index) => (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                        <span className="text-primary-400 font-bold">{query.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{query.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{query.email}</span>
                          <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{query.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-primary-400 font-medium mb-2">{query.subject}</h4>
                    <p className="text-gray-300">{query.message}</p>
                    
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(query.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`flex items-center px-2 py-1 rounded-full ${
                        query.status === 'replied' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {query.status === 'replied' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {query.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {query.status === 'pending' && (
                      <button
                        onClick={() => updateStatus(query.id, 'replied')}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        title="Mark as Replied"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteQuery(query.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminQueries;
