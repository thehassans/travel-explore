import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes, queriesRes] = await Promise.all([
        axios.get('/api/admin/dashboard'),
        axios.get('/api/admin/bookings'),
        axios.get('/api/admin/queries')
      ]);
      setStats(statsRes.data.data);
      setRecentBookings(bookingsRes.data.data.slice(0, 5));
      setRecentQueries(queriesRes.data.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Queries', value: stats?.totalQueries || 0, icon: MessageSquare, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { title: 'Pending Queries', value: stats?.pendingQueries || 0, icon: Clock, color: 'from-orange-500 to-red-500', change: '-5%' },
    { title: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, color: 'from-green-500 to-emerald-500', change: '+18%' },
    { title: 'Revenue (BDT)', value: stats?.totalRevenue?.toLocaleString() || 0, icon: DollarSign, color: 'from-purple-500 to-indigo-500', change: '+25%' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-500" />
              Recent Bookings
            </h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">{booking.customerName}</p>
                    <p className="text-gray-400 text-sm">{booking.package}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-400 font-medium">৳{booking.totalAmount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Queries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary-500" />
              Recent Queries
            </h2>
            <div className="space-y-4">
              {recentQueries.map((query) => (
                <div key={query.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">{query.name}</p>
                    <p className="text-gray-400 text-sm truncate max-w-[200px]">{query.subject}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    query.status === 'replied' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {query.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
