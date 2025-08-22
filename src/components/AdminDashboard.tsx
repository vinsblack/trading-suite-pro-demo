/**
 * Enterprise Admin Dashboard - Redesigned to match site style
 * Gestione completa utenti, tenant, billing e sistema con layout moderno
 */
import React, { useState, useEffect } from 'react';
import {
  Users, Building2, CreditCard, Settings, Shield,
  UserPlus, Edit3, Trash2, Eye, CheckCircle, XCircle,
  DollarSign, Activity,
  Search, Download, RefreshCw,
  BarChart3, Palette
} from 'lucide-react';
import BillingDashboard from './BillingDashboard';
import WhiteLabelDashboard from './WhiteLabelDashboard';

// Types
interface AdminUser {
  id: string;
  email: string;
  name: string;
  tenant_id: string;
  tenant_name: string;
  roles: string[];
  is_active: boolean;
  is_verified: boolean;
  last_login: Date;
  created_at: Date;
}

interface AdminTenant {
  id: string;
  name: string;
  display_name: string;
  tenant_type: string;
  subscription_plan: string;
  is_active: boolean;
  is_trial: boolean;
  trial_expires_at: Date;
  user_count: number;
  monthly_revenue: number;
  created_at: Date;
}

interface SystemMetrics {
  total_users: number;
  active_users: number;
  total_tenants: number;
  active_subscriptions: number;
  monthly_revenue: number;
  api_calls_today: number;
  system_health: 'healthy' | 'warning' | 'critical';
  uptime: string;
}

interface AuditLog {
  id: string;
  user_email: string;
  tenant_name: string;
  action: string;
  resource: string;
  details: string;
  timestamp: Date;
  success: boolean;
  ip_address: string;
}

const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [tenants, setTenants] = useState<AdminTenant[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('all');

  // Mock data - In produzione verranno da API
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    
    // Mock data per demo
    const mockUsers: AdminUser[] = [
      {
        id: '1',
        email: 'john@acme.com',
        name: 'John Smith',
        tenant_id: 'tenant_acme',
        tenant_name: 'ACME Corp',
        roles: ['admin', 'trader_professional'],
        is_active: true,
        is_verified: true,
        last_login: new Date('2024-08-20T10:30:00'),
        created_at: new Date('2024-01-15')
      },
      {
        id: '2',
        email: 'sarah@techstart.com',
        name: 'Sarah Johnson',
        tenant_id: 'tenant_techstart',
        tenant_name: 'TechStart Inc',
        roles: ['trader_professional'],
        is_active: true,
        is_verified: true,
        last_login: new Date('2024-08-19T15:45:00'),
        created_at: new Date('2024-02-20')
      }
    ];

    const mockTenants: AdminTenant[] = [
      {
        id: 'tenant_acme',
        name: 'acme',
        display_name: 'ACME Corp',
        tenant_type: 'enterprise',
        subscription_plan: 'enterprise',
        is_active: true,
        is_trial: false,
        trial_expires_at: new Date('2024-12-31'),
        user_count: 25,
        monthly_revenue: 299900,
        created_at: new Date('2024-01-15')
      },
      {
        id: 'tenant_techstart',
        name: 'techstart',
        display_name: 'TechStart Inc',
        tenant_type: 'business',
        subscription_plan: 'professional',
        is_active: true,
        is_trial: true,
        trial_expires_at: new Date('2024-09-15'),
        user_count: 12,
        monthly_revenue: 99900,
        created_at: new Date('2024-02-20')
      }
    ];

    const mockMetrics: SystemMetrics = {
      total_users: 847,
      active_users: 723,
      total_tenants: 45,
      active_subscriptions: 42,
      monthly_revenue: 1248900,
      api_calls_today: 1542890,
      system_health: 'healthy',
      uptime: '99.98%'
    };

    const mockAuditLogs: AuditLog[] = [
      {
        id: '1',
        user_email: 'john@acme.com',
        tenant_name: 'ACME Corp',
        action: 'LOGIN',
        resource: 'authentication',
        details: 'User logged in successfully',
        timestamp: new Date('2024-08-20T10:30:00'),
        success: true,
        ip_address: '192.168.1.100'
      }
    ];

    setUsers(mockUsers);
    setTenants(mockTenants);
    setSystemMetrics(mockMetrics);
    setAuditLogs(mockAuditLogs);
    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return `€${(amount / 100).toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`User ${userId} action: ${action}`);
  };

  const handleTenantAction = (tenantId: string, action: string) => {
    console.log(`Tenant ${tenantId} action: ${action}`);
  };

  const tabsConfig = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'tenants',
      label: 'Tenants',
      icon: Building2,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'white-label',
      label: 'White-Label',
      icon: Palette,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'audit',
      label: 'Audit Logs',
      icon: Shield,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'from-gray-500 to-gray-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Panel Navigation */}
      <div className="glass-card">
        <div className="flex flex-wrap gap-4 justify-center">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
                }`}
              >
                <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {currentView === 'overview' && (
          <div className="space-y-6">
            {/* System Overview */}
            <div className="glass-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                    <BarChart3 className="w-6 h-6 text-black" />
                  </div>
                  System Overview
                </h3>
              </div>
              
              {/* System Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{systemMetrics?.total_users}</p>
                      <p className="text-emerald-500 text-sm font-semibold">+12% vs last month</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Active Tenants</p>
                      <p className="text-3xl font-bold text-gray-900">{systemMetrics?.total_tenants}</p>
                      <p className="text-emerald-500 text-sm font-semibold">+8% vs last month</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                      <Building2 className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">{formatCurrency(systemMetrics?.monthly_revenue || 0)}</p>
                      <p className="text-emerald-500 text-sm font-semibold">+24% vs last month</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                      <DollarSign className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">API Calls Today</p>
                      <p className="text-3xl font-bold text-gray-900">{systemMetrics?.api_calls_today.toLocaleString()}</p>
                      <p className="text-emerald-500 text-sm font-semibold">System: {systemMetrics?.system_health}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                      <Activity className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'users' && (
          <div className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
                <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-black" />
                </div>
                User Management
              </h3>
              <button className="modern-btn-primary shadow-xl hover:shadow-2xl transform hover:scale-105">
                <UserPlus className="w-4 h-4" />
                Add New User
              </button>
            </div>
            
            {/* Users Content */}
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search users by name, email, or tenant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                <select
                  value={selectedTenant}
                  onChange={(e) => setSelectedTenant(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Tenants</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>{tenant.display_name}</option>
                  ))}
                </select>
              </div>
              
              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tenant</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Roles</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Last Login</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                            {user.tenant_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span key={role} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                {role.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {user.is_active ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(user.last_login)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUserAction(user.id, 'edit')}
                              className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 text-black hover:from-blue-300 hover:to-blue-400 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                              title="Edit User"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'view')}
                              className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, 'delete')}
                              className="p-2 bg-gradient-to-br from-red-400 to-red-500 text-black hover:from-red-300 hover:to-red-400 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'tenants' && (
          <div className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
                <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-lg">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
                Tenant Management
              </h3>
              <button className="modern-btn-primary shadow-xl hover:shadow-2xl transform hover:scale-105">
                <Building2 className="w-4 h-4" />
                Add New Tenant
              </button>
            </div>
            
            {/* Tenants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tenants.map((tenant) => (
                <div key={tenant.id} className="glass-card hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{tenant.display_name}</h3>
                        <p className="text-sm text-gray-500">{tenant.name}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tenant.is_active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {tenant.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-semibold text-gray-900 capitalize">{tenant.subscription_plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Users</span>
                      <span className="font-semibold text-gray-900">{tenant.user_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(tenant.monthly_revenue)}/mo</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleTenantAction(tenant.id, 'edit')}
                      className="flex-1 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 py-2 px-4 rounded-lg hover:bg-white transition-colors font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTenantAction(tenant.id, 'view')}
                      className="flex-1 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 py-2 px-4 rounded-lg hover:bg-white transition-colors font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'billing' && <BillingDashboard />}
        {currentView === 'white-label' && <WhiteLabelDashboard />}
        
        {currentView === 'audit' && (
          <div className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-gray-900 text-xl font-bold flex items-center gap-2">
                <div className="p-3 bg-gradient-to-br from-red-400 to-red-500 rounded-xl shadow-lg">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                Audit Logs
              </h3>
              <div className="flex gap-3">
                <button className="modern-btn-primary">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="modern-btn-secondary">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
            
            {/* Audit Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Resource</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{log.user_email}</p>
                          <p className="text-sm text-gray-500">{log.tenant_name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.resource}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.details}
                      </td>
                      <td className="px-6 py-4">
                        {log.success ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {currentView === 'settings' && (
          <div className="glass-card text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Settings Panel</h3>
            <p className="text-gray-500">Advanced system configuration coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;