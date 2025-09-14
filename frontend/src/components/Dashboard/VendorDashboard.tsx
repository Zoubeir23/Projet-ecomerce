import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MetricCard from './MetricCard';
import SalesChart from './SalesChart';
import SalesTarget from './SalesTarget';
import './VendorDashboard.css';

const VendorDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  // Données simulées
  const metricsData = [
    {
      title: 'Total Revenue',
      value: '€82,650',
      change: '+11%',
      changeType: 'positive' as const,
      icon: '💰',
      period: 'Last 30 days'
    },
    {
      title: 'Total Orders',
      value: '1,645',
      change: '+8%',
      changeType: 'positive' as const,
      icon: '🛒',
      period: 'Last 30 days'
    },
    {
      title: 'Total Customers',
      value: '1,462',
      change: '+5%',
      changeType: 'positive' as const,
      icon: '👥',
      period: 'Last 30 days'
    },
    {
      title: 'Pending Delivery',
      value: '117',
      change: '-2%',
      changeType: 'negative' as const,
      icon: '📦',
      period: 'Last 30 days'
    }
  ];

  const salesData = {
    income: 23262,
    expenses: 11135,
    balance: 48135
  };

  return (
    <div className="vendor-dashboard">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="header-info">
            <h1 className="dashboard-title">Overview</h1>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening with your store.</p>
          </div>
          
          <div className="header-actions">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="user-menu">
              <div className="notifications">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </div>
              
              <div className="user-profile">
                <img 
                  src="/api/placeholder/32/32" 
                  alt="Profile" 
                  className="profile-avatar"
                />
                <span className="profile-name">John Doe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Métriques principales */}
          <div className="metrics-grid">
            {metricsData.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                period={metric.period}
              />
            ))}
          </div>

          {/* Graphique des ventes */}
          <SalesChart
            title="Sales Analytics"
            data={salesData}
            period="Jul 2023"
          />

          {/* Objectifs de vente */}
          <SalesTarget
            dailyTarget={650}
            dailyAchieved={520}
            monthlyTarget={14500}
            monthlyAchieved={12300}
          />

          {/* Produits les plus vendus */}
          <div className="top-products">
            <div className="section-header">
              <h3 className="section-title">Top Selling Products</h3>
              <button className="view-all-btn">View All →</button>
            </div>
            
            <div className="products-list">
              {[
                { name: 'Air Jordan 8', sales: '752 Pcs', image: '👟' },
                { name: 'Air Jordan 5', sales: '739 Pcs', image: '👟' },
                { name: 'Air Jordan 13', sales: '523 Pcs', image: '👟' },
                { name: 'Nike Air Max', sales: '455 Pcs', image: '👟' }
              ].map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-image">{product.image}</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-sales">{product.sales}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offres actuelles */}
          <div className="current-offers">
            <h3 className="section-title">Current Offers</h3>
            
            <div className="offers-list">
              <div className="offer-item">
                <div className="offer-title">40% Discount Offer</div>
                <div className="offer-expiry">Expires on: 05 Jan</div>
                <div className="offer-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="offer-item">
                <div className="offer-title">100 Taka Coupon</div>
                <div className="offer-expiry">Expires on: 10 Jan</div>
                <div className="offer-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="offer-item">
                <div className="offer-title">Stock Out Sell</div>
                <div className="offer-expiry">Upcoming on: 15 Jan</div>
                <div className="offer-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;