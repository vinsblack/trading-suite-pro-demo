/**
 * Enterprise Billing Dashboard
 * Gestione completa pagamenti, fatture e sottoscrizioni
 */
import React, { useState, useEffect } from 'react';
import {
  CreditCard, Download, Eye, Plus, CheckCircle, XCircle,
  Clock, AlertCircle, DollarSign, FileText, RefreshCw,
  Calendar, Receipt, Shield, Building, Mail, Globe,
  Zap, Wallet, BarChart3
} from 'lucide-react';
import { PaymentMethodIcon } from './PaymentIcons';

// Types
interface PaymentMethod {
  id: string;
  type: 'stripe_card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  exp_month?: number;
  exp_year?: number;
  is_default: boolean;
  paypal_email?: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_method: string;
  description: string;
  created_at: string;
  processed_at?: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  total_amount: number;
  currency: string;
  issue_date: string;
  due_date: string;
  pdf_url?: string;
  line_items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
}

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  price: number;
  billing_cycle: 'monthly' | 'yearly';
}

interface BillingInfo {
  billing_email: string;
  billing_name: string;
  billing_address: {
    line1: string;
    line2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
  tax_id?: string;
  tax_rate: number;
}

const BillingDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [, setBillingInfo] = useState<BillingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setShowAddPaymentMethod] = useState(false);
  const [, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    setLoading(true);
    
    // Mock data - In produzione da API
    const mockPayments: Payment[] = [
      {
        id: '1',
        amount: 199.00,
        currency: 'EUR',
        status: 'completed',
        payment_method: 'Visa ****4242',
        description: 'Professional Plan - Monthly',
        created_at: '2024-08-20T10:00:00Z',
        processed_at: '2024-08-20T10:00:05Z'
      },
      {
        id: '2',
        amount: 199.00,
        currency: 'EUR',
        status: 'completed',
        payment_method: 'PayPal',
        description: 'Professional Plan - Monthly',
        created_at: '2024-07-20T10:00:00Z',
        processed_at: '2024-07-20T10:00:03Z'
      },
      {
        id: '3',
        amount: 199.00,
        currency: 'EUR',
        status: 'failed',
        payment_method: 'Visa ****1234',
        description: 'Professional Plan - Monthly',
        created_at: '2024-06-20T10:00:00Z'
      }
    ];

    const mockInvoices: Invoice[] = [
      {
        id: '1',
        invoice_number: '2024-0001',
        status: 'paid',
        total_amount: 242.78,
        currency: 'EUR',
        issue_date: '2024-08-20T00:00:00Z',
        due_date: '2024-09-19T00:00:00Z',
        pdf_url: '/api/invoices/1/pdf',
        line_items: [
          { description: 'Professional Plan - Monthly', quantity: 1, price: 199.00 }
        ]
      },
      {
        id: '2',
        invoice_number: '2024-0002',
        status: 'sent',
        total_amount: 242.78,
        currency: 'EUR',
        issue_date: '2024-08-01T00:00:00Z',
        due_date: '2024-08-31T00:00:00Z',
        pdf_url: '/api/invoices/2/pdf',
        line_items: [
          { description: 'Professional Plan - Monthly', quantity: 1, price: 199.00 }
        ]
      }
    ];

    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: '1',
        type: 'stripe_card',
        last4: '4242',
        brand: 'visa',
        exp_month: 12,
        exp_year: 2025,
        is_default: true
      },
      {
        id: '2',
        type: 'paypal',
        paypal_email: 'user@example.com',
        is_default: false
      }
    ];

    const mockSubscription: Subscription = {
      id: '1',
      plan: 'professional',
      status: 'active',
      current_period_start: '2024-08-20T00:00:00Z',
      current_period_end: '2024-09-20T00:00:00Z',
      cancel_at_period_end: false,
      price: 199.00,
      billing_cycle: 'monthly'
    };

    const mockBillingInfo: BillingInfo = {
      billing_email: 'billing@company.com',
      billing_name: 'ACME Corporation',
      billing_address: {
        line1: 'Via Roma 123',
        city: 'Milano',
        postal_code: '20121',
        country: 'IT'
      },
      tax_id: 'IT12345678901',
      tax_rate: 0.22
    };

    setPayments(mockPayments);
    setInvoices(mockInvoices);
    setPaymentMethods(mockPaymentMethods);
    setSubscription(mockSubscription);
    setBillingInfo(mockBillingInfo);
    setLoading(false);
  };

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'sent':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
      case 'overdue':
      case 'past_due':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'sent':
        return <Clock className="w-4 h-4" />;
      case 'failed':
      case 'overdue':
      case 'past_due':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleAddPaymentMethod = () => {
    setShowAddPaymentMethod(true);
  };

  const handleUpgradeSubscription = () => {
    setShowUpgradeModal(true);
  };

  const handleCancelSubscription = () => {
    if (window.confirm('Sei sicuro di voler cancellare la sottoscrizione?')) {
      console.log('Cancelling subscription...');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Subscription Status */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Current Subscription</h3>
          {subscription?.status === 'active' && (
            <span className="admin-badge-success">
              <Zap className="w-4 h-4 mr-1" />
              Active
            </span>
          )}
        </div>
        
        {subscription && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm font-medium">Plan</p>
                <p className="text-xl font-bold text-gray-900 capitalize">{subscription.plan}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Billing</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(subscription.price)} / {subscription.billing_cycle === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Next Billing</p>
                <p className="text-xl font-bold text-gray-900">{formatDate(subscription.current_period_end)}</p>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t">
              <button
                onClick={handleUpgradeSubscription}
                className="modern-btn-primary shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="p-1 bg-white/20 rounded mr-1">
                  <Zap className="w-4 h-4" />
                </div>
                Upgrade Plan
              </button>
              <button
                onClick={handleCancelSubscription}
                className="px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 rounded-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              <p className="text-green-500 text-sm font-semibold">
                {payments.filter(p => p.status === 'completed').length} successful
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
              <CreditCard className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Outstanding Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.total_amount, 0))}
              </p>
              <p className="text-yellow-600 text-sm font-semibold">
                {invoices.filter(i => i.status !== 'paid').length} pending
              </p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(payments.filter(p => new Date(p.created_at).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + p.amount, 0))}
              </p>
              <p className="text-green-500 text-sm font-semibold">Paid</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
              <DollarSign className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Payments</h3>
            <button
              onClick={() => setCurrentView('payments')}
              className="modern-btn-primary text-sm px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="p-1 bg-white/20 rounded mr-1">
                <Eye className="w-3 h-3" />
              </div>
              View All
            </button>
          </div>
          <div className="space-y-3">
            {payments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {getStatusIcon(payment.status)}
                    {payment.status}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(payment.created_at)}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Invoices</h3>
            <button
              onClick={() => setCurrentView('invoices')}
              className="modern-btn-primary text-sm px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="p-1 bg-white/20 rounded mr-1">
                <FileText className="w-3 h-3" />
              </div>
              View All
            </button>
          </div>
          <div className="space-y-3">
            {invoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    {invoice.status}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">#{invoice.invoice_number}</p>
                    <p className="text-sm text-gray-500">Due: {formatDate(invoice.due_date)}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{formatCurrency(invoice.total_amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
          <p className="text-gray-600">All your payment transactions</p>
        </div>
        <button className="modern-btn-primary shadow-xl hover:shadow-2xl transform hover:scale-105">
          <div className="p-2 bg-white/20 rounded-lg mr-2">
            <Download className="w-4 h-4" />
          </div>
          Export
        </button>
      </div>

      <div className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="admin-table-th text-left">Date</th>
                <th className="admin-table-th text-left">Description</th>
                <th className="admin-table-th text-left">Method</th>
                <th className="admin-table-th text-left">Amount</th>
                <th className="admin-table-th text-left">Status</th>
                <th className="admin-table-th text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="admin-table-td">
                    <p className="text-sm text-gray-900">{formatDate(payment.created_at)}</p>
                  </td>
                  <td className="admin-table-td">
                    <p className="font-medium text-gray-900">{payment.description}</p>
                  </td>
                  <td className="admin-table-td">
                    <div className="flex items-center gap-2">
                      {payment.payment_method.includes('Visa') ? (
                        <PaymentMethodIcon type="visa" className="w-6 h-4" />
                      ) : payment.payment_method.includes('PayPal') ? (
                        <PaymentMethodIcon type="paypal" className="w-6 h-4" />
                      ) : payment.payment_method.includes('MasterCard') ? (
                        <PaymentMethodIcon type="mastercard" className="w-6 h-4" />
                      ) : (
                        <PaymentMethodIcon type="generic" className="w-6 h-4" />
                      )}
                      <p className="text-sm text-gray-600">{payment.payment_method}</p>
                    </div>
                  </td>
                  <td className="admin-table-td">
                    <p className="font-bold text-gray-900">{formatCurrency(payment.amount)}</p>
                  </td>
                  <td className="admin-table-td">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>
                  <td className="admin-table-td">
                    <button className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 text-black hover:from-blue-300 hover:to-blue-400 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
          <p className="text-gray-600">Download and manage your invoices</p>
        </div>
      </div>

      <div className="glass-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="admin-table-th text-left">Invoice #</th>
                <th className="admin-table-th text-left">Issue Date</th>
                <th className="admin-table-th text-left">Due Date</th>
                <th className="admin-table-th text-left">Amount</th>
                <th className="admin-table-th text-left">Status</th>
                <th className="admin-table-th text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="admin-table-td">
                    <p className="font-medium text-gray-900">#{invoice.invoice_number}</p>
                  </td>
                  <td className="admin-table-td">
                    <p className="text-sm text-gray-900">{formatDate(invoice.issue_date)}</p>
                  </td>
                  <td className="admin-table-td">
                    <p className="text-sm text-gray-900">{formatDate(invoice.due_date)}</p>
                  </td>
                  <td className="admin-table-td">
                    <p className="font-bold text-gray-900">{formatCurrency(invoice.total_amount)}</p>
                  </td>
                  <td className="admin-table-td">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="admin-table-td">
                    <div className="flex items-center gap-3">
                      <button className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 text-black hover:from-green-300 hover:to-emerald-400 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105" title="View Invoice">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 rounded-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105" title="Download PDF">
                        <Download className="w-4 h-4" />
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
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="text-gray-600">Manage your payment methods</p>
        </div>
        <button onClick={handleAddPaymentMethod} className="modern-btn-primary shadow-xl hover:shadow-2xl transform hover:scale-105">
          <div className="p-2 bg-white/20 rounded-lg mr-2">
            <Plus className="w-4 h-4" />
          </div>
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div key={method.id} className="glass-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-lg border border-gray-200">
                  {method.type === 'stripe_card' ? (
                    <PaymentMethodIcon 
                      type={method.brand as any || 'generic'} 
                      className="w-10 h-6" 
                    />
                  ) : method.type === 'paypal' ? (
                    <PaymentMethodIcon 
                      type="paypal" 
                      className="w-10 h-6" 
                    />
                  ) : (
                    <CreditCard className="w-10 h-6 text-gray-600" />
                  )}
                </div>
                <div>
                  {method.type === 'stripe_card' ? (
                    <>
                      <p className="font-bold text-gray-900 capitalize text-lg">{method.brand} •••• {method.last4}</p>
                      <p className="text-sm text-gray-500">Expires {method.exp_month}/{method.exp_year}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-gray-900 text-lg">PayPal</p>
                      <p className="text-sm text-gray-500">{method.paypal_email}</p>
                    </>
                  )}
                </div>
              </div>
              {method.is_default && (
                <span className="admin-badge-success">Default</span>
              )}
            </div>
            
            <div className="flex gap-4">
              {!method.is_default && (
                <button className="modern-btn-primary text-sm px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Set as Default
                </button>
              )}
              <button className="px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-emerald-200 rounded-lg font-semibold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:bg-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Billing Navigation */}
      <div className="glass-card">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setCurrentView('overview')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              currentView === 'overview'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-md">
              <BarChart3 className="w-4 h-4 text-black" />
            </div>
            Overview
          </button>
          <button
            onClick={() => setCurrentView('payments')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              currentView === 'payments'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-md">
              <CreditCard className="w-4 h-4 text-black" />
            </div>
            Payments
          </button>
          <button
            onClick={() => setCurrentView('invoices')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              currentView === 'invoices'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-md">
              <FileText className="w-4 h-4 text-black" />
            </div>
            Invoices
          </button>
          <button
            onClick={() => setCurrentView('methods')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
              currentView === 'methods'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg shadow-md">
              <Wallet className="w-4 h-4 text-black" />
            </div>
            Payment Methods
          </button>
        </div>
      </div>

      {/* Content */}
      {currentView === 'overview' && renderOverview()}
      {currentView === 'payments' && renderPayments()}
      {currentView === 'invoices' && renderInvoices()}
      {currentView === 'methods' && renderPaymentMethods()}
    </div>
  );
};

export default BillingDashboard;