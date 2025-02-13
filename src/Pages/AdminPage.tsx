import React, { useState } from 'react';
import { TrendingUp, Plus, X, Filter, Search, Calendar, DollarSign, Users, Activity, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface Prediction {
  id: number;
  question: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'resolved' | 'cancelled';
  yesPool: number;
  noPool: number;
  totalBets: number;
  resolution?: 'yes' | 'no';
}

function AdminDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [predictions] = useState<Prediction[]>([
    {
      id: 1,
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      status: 'active',
      yesPool: 5000,
      noPool: 3000,
      totalBets: 45
    },
    {
      id: 2,
      question: "Will SpaceX successfully land on Mars in 2024?",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: 'active',
      yesPool: 2000,
      noPool: 8000,
      totalBets: 67
    },
    {
      id: 3,
      question: "Will Apple release a foldable iPhone in 2024?",
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      status: 'resolved',
      yesPool: 1500,
      noPool: 4500,
      totalBets: 32,
      resolution: 'no'
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'resolved':
        return 'text-blue-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle question creation logic here
    setShowCreateModal(false);
    setNewQuestion({
      question: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const filteredPredictions = predictions.filter(prediction => {
    if (selectedFilter === 'all') return true;
    return prediction.status === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Question
            </button>
          </div>
        </div>
      </div>

{/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Pool Value</p>
                <p className="text-2xl font-bold">{formatCurrency(24000)}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Questions</p>
                <p className="text-2xl font-bold">
                  {predictions.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Participants</p>
                <p className="text-2xl font-bold">144</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Resolved Questions</p>
                <p className="text-2xl font-bold">
                  {predictions.filter(p => p.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                className="bg-gray-800 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

{/* Questions Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6">Question</th>
                <th className="text-left py-4 px-6">Date Range</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Pool Size</th>
                <th className="text-left py-4 px-6">Total Bets</th>
                <th className="text-left py-4 px-6">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {filteredPredictions.map(prediction => (
                <tr key={prediction.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="py-4 px-6">{prediction.question}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{prediction.startDate}</span>
                      <span className="text-gray-500">→</span>
                      <span>{prediction.endDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`flex items-center gap-2 ${getStatusColor(prediction.status)}`}>
                      {getStatusIcon(prediction.status)}
                      <span className="capitalize">{prediction.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {formatCurrency(prediction.yesPool + prediction.noPool)}
                  </td>
                  <td className="py-4 px-6">{prediction.totalBets}</td>
                  <td className="py-4 px-6">
                    {prediction.resolution ? (
                      <span className={`capitalize ${prediction.resolution === 'yes' ? 'text-green-400' : 'text-red-400'}`}>
                        {prediction.resolution}
                      </span>
                    ) : (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
{/* Create Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create New Question</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateQuestion}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your question"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newQuestion.startDate}
                      onChange={(e) => setNewQuestion({ ...newQuestion, startDate: e.target.value })}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newQuestion.endDate}
                      onChange={(e) => setNewQuestion({ ...newQuestion, endDate: e.target.value })}
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                    placeholder="Add additional context or rules"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Create Question
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;