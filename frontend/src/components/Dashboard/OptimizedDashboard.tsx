import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Navbar,
  Button,
  Badge,
  ProgressBar,
  Dropdown,
  Form,
  InputGroup
} from 'react-bootstrap';
import ProductManagement from '../Products/ProductManagement';
import './OptimizedDashboard.css';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'vendor' | 'admin';
  isAuthenticated: boolean;
}

interface OptimizedDashboardProps {
  user: User;
  onLogout: () => void;
}

const OptimizedDashboard: React.FC<OptimizedDashboardProps> = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
    { id: 'products', label: 'Products', icon: 'bi-box-seam' },
    { id: 'orders', label: 'Orders', icon: 'bi-cart3' },
    { id: 'customers', label: 'Customers', icon: 'bi-people' },
    { id: 'analytics', label: 'Analytics', icon: 'bi-graph-up' },
    { id: 'settings', label: 'Settings', icon: 'bi-gear' }
  ];

  const metricsData = [
    {
      title: 'Revenue',
      value: '€82,650',
      change: '+11%',
      changeType: 'success',
      icon: 'bi-currency-euro',
      description: 'vs last month'
    },
    {
      title: 'Orders',
      value: '1,645',
      change: '+8%',
      changeType: 'success',
      icon: 'bi-cart-check',
      description: 'total orders'
    },
    {
      title: 'Customers',
      value: '1,462',
      change: '+5%',
      changeType: 'success',
      icon: 'bi-people',
      description: 'active users'
    },
    {
      title: 'Growth',
      value: '23.5%',
      change: '+2.1%',
      changeType: 'success',
      icon: 'bi-trending-up',
      description: 'growth rate'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '€129.99', status: 'Completed', date: '2 min ago' },
    { id: '#ORD-002', customer: 'Jane Smith', amount: '€89.50', status: 'Processing', date: '5 min ago' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '€245.00', status: 'Shipped', date: '12 min ago' },
    { id: '#ORD-004', customer: 'Sarah Wilson', amount: '€67.25', status: 'Pending', date: '18 min ago' }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Processing': return 'warning';
      case 'Shipped': return 'info';
      case 'Pending': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="optimized-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h4 className="brand">
            <i className="bi bi-shop text-primary me-2"></i>
            ECommerce
          </h4>
          <div className="user-info mt-3">
            <div className="user-avatar">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div className="user-details">
              <div className="user-name">{user.firstName} {user.lastName}</div>
              <div className="user-role">{user.userType === 'vendor' ? 'Vendeur' : user.userType === 'admin' ? 'Admin' : 'Client'}</div>
            </div>
          </div>
        </div>
        
        <Nav className="sidebar-nav flex-column">
          {sidebarItems.map((item) => (
            <Nav.Link
              key={item.id}
              href="#"
              className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <i className={`${item.icon} me-3`}></i>
              {item.label}
            </Nav.Link>
          ))}
          
          <div className="sidebar-footer">
            <Button variant="outline-danger" size="sm" className="w-100" onClick={onLogout}>
              <i className="bi bi-box-arrow-left me-2"></i>
              Déconnexion
            </Button>
          </div>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="top-header">
          <div className="header-left">
            <h2 className="page-title">Dashboard</h2>
            <p className="page-subtitle">Bienvenue {user.firstName}, voici votre aperçu</p>
          </div>
          
          <div className="header-right">
            <Button variant="outline-primary" size="sm" className="me-2">
              <i className="bi bi-plus-lg me-1"></i>
              Add Product
            </Button>
            <Button variant="primary" size="sm">
              <i className="bi bi-download me-1"></i>
              Export
            </Button>
          </div>
        </div>

        {/* Content */}
        <Container fluid className="dashboard-content">
          {activeSection === 'dashboard' && (
            <>
              {/* Metrics Row */}
              <Row className="mb-4">
                {metricsData.map((metric, index) => (
                  <Col lg={3} md={6} className="mb-3" key={index}>
                    <Card className="metric-card h-100">
                      <Card.Body className="d-flex align-items-center">
                        <div className="metric-icon me-3">
                          <i className={`${metric.icon} text-primary`}></i>
                        </div>
                        <div className="metric-details flex-grow-1">
                          <h3 className="metric-value">{metric.value}</h3>
                          <p className="metric-title">{metric.title}</p>
                          <div className="d-flex align-items-center">
                            <Badge bg={metric.changeType} className="me-2">
                              {metric.change}
                            </Badge>
                            <small className="text-muted">{metric.description}</small>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row>
                {/* Sales Chart */}
                <Col lg={8} className="mb-4">
                  <Card className="chart-card">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">Sales Overview</h5>
                      <div className="chart-actions">
                        <Form.Select size="sm" style={{ width: 'auto' }}>
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Last 3 months</option>
                        </Form.Select>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="sales-summary mb-3">
                        <Row>
                          <Col md={4}>
                            <div className="summary-item">
                              <div className="summary-label">
                                <span className="indicator bg-primary"></span>
                                Revenue
                              </div>
                              <h4 className="summary-value">€23,456</h4>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="summary-item">
                              <div className="summary-label">
                                <span className="indicator bg-success"></span>
                                Orders
                              </div>
                              <h4 className="summary-value">1,234</h4>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="summary-item">
                              <div className="summary-label">
                                <span className="indicator bg-warning"></span>
                                Avg. Value
                              </div>
                              <h4 className="summary-value">€89.45</h4>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      
                      {/* Simplified Chart Placeholder */}
                      <div className="chart-placeholder">
                        <div className="chart-bars">
                          {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                            <div 
                              key={index}
                              className="chart-bar"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Recent Orders */}
                <Col lg={4} className="mb-4">
                  <Card className="orders-card">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">Recent Orders</h5>
                      <Button variant="link" size="sm" className="p-0">
                        View all
                      </Button>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="orders-list">
                        {recentOrders.map((order, index) => (
                          <div key={index} className="order-item">
                            <div className="order-info">
                              <div className="order-id">{order.id}</div>
                              <div className="order-customer">{order.customer}</div>
                              <div className="order-time">{order.date}</div>
                            </div>
                            <div className="order-details">
                              <div className="order-amount">{order.amount}</div>
                              <Badge bg={getStatusVariant(order.status)} className="order-status">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Quick Actions */}
              <Row>
                <Col lg={12}>
                  <Card className="actions-card">
                    <Card.Body>
                      <h5 className="card-title mb-3">Quick Actions</h5>
                      <Row>
                        <Col md={3}>
                          <Button 
                            variant="outline-primary" 
                            className="w-100 action-btn"
                            onClick={() => setActiveSection('products')}
                          >
                            <i className="bi bi-plus-circle me-2"></i>
                            Add Product
                          </Button>
                        </Col>
                        <Col md={3}>
                          <Button 
                            variant="outline-success" 
                            className="w-100 action-btn"
                            onClick={() => setActiveSection('orders')}
                          >
                            <i className="bi bi-eye me-2"></i>
                            View Orders
                          </Button>
                        </Col>
                        <Col md={3}>
                          <Button 
                            variant="outline-info" 
                            className="w-100 action-btn"
                            onClick={() => setActiveSection('customers')}
                          >
                            <i className="bi bi-people me-2"></i>
                            Manage Customers
                          </Button>
                        </Col>
                        <Col md={3}>
                          <Button 
                            variant="outline-warning" 
                            className="w-100 action-btn"
                            onClick={() => setActiveSection('analytics')}
                          >
                            <i className="bi bi-graph-up me-2"></i>
                            View Analytics
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {/* Product Management */}
          {activeSection === 'products' && <ProductManagement />}
          
          {/* Autres sections à implémenter */}
          {activeSection === 'orders' && (
            <div className="text-center py-5">
              <i className="bi bi-cart3 text-muted" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">Gestion des Commandes</h3>
              <p className="text-muted">Cette section sera bientôt disponible</p>
            </div>
          )}
          
          {activeSection === 'customers' && (
            <div className="text-center py-5">
              <i className="bi bi-people text-muted" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">Gestion des Clients</h3>
              <p className="text-muted">Cette section sera bientôt disponible</p>
            </div>
          )}
          
          {activeSection === 'analytics' && (
            <div className="text-center py-5">
              <i className="bi bi-graph-up text-muted" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">Analytics</h3>
              <p className="text-muted">Cette section sera bientôt disponible</p>
            </div>
          )}
          
          {activeSection === 'settings' && (
            <div className="text-center py-5">
              <i className="bi bi-gear text-muted" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">Paramètres</h3>
              <p className="text-muted">Cette section sera bientôt disponible</p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default OptimizedDashboard;