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
import SalesChartBootstrap from './SalesChartBootstrap';
import CircularProgress from './CircularProgress';
import './BootstrapDashboard.css';

const BootstrapDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'analytics', label: 'Analytics', icon: 'bi-graph-up' },
    { id: 'products', label: 'Products', icon: 'bi-box-seam' },
    { id: 'orders', label: 'Orders', icon: 'bi-cart3' },
    { id: 'inventory', label: 'Inventory', icon: 'bi-clipboard-data' },
    { id: 'sales', label: 'Sales', icon: 'bi-currency-dollar' },
    { id: 'customers', label: 'Customers', icon: 'bi-people' },
    { id: 'offers', label: 'Offers', icon: 'bi-tags' },
    { id: 'newsletter', label: 'Newsletter', icon: 'bi-envelope' },
    { id: 'settings', label: 'Settings', icon: 'bi-gear' }
  ];

  const metricsData = [
    {
      title: 'Total Revenue',
      value: '€82,650',
      change: '+11%',
      changeType: 'success',
      icon: 'bi-currency-euro',
      period: 'Last 30 days'
    },
    {
      title: 'Total Orders',
      value: '1,645',
      change: '+8%',
      changeType: 'success',
      icon: 'bi-cart-check',
      period: 'Last 30 days'
    },
    {
      title: 'Total Customers',
      value: '1,462',
      change: '+5%',
      changeType: 'success',
      icon: 'bi-people-fill',
      period: 'Last 30 days'
    },
    {
      title: 'Pending Delivery',
      value: '117',
      change: '-2%',
      changeType: 'danger',
      icon: 'bi-truck',
      period: 'Last 30 days'
    }
  ];

  const topProducts = [
    { name: 'Air Jordan 8', sales: '752 Pcs', image: '👟', progress: 85 },
    { name: 'Air Jordan 5', sales: '739 Pcs', image: '👟', progress: 78 },
    { name: 'Air Jordan 13', sales: '523 Pcs', image: '👟', progress: 65 },
    { name: 'Nike Air Max', sales: '455 Pcs', image: '👟', progress: 55 }
  ];

  const currentOffers = [
    { title: '40% Discount Offer', expiry: 'Expires on: 05 Jan', progress: 70, variant: 'success' },
    { title: '100 Taka Coupon', expiry: 'Expires on: 10 Jan', progress: 45, variant: 'warning' },
    { title: 'Stock Out Sell', expiry: 'Upcoming on: 15 Jan', progress: 90, variant: 'info' }
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '260px', minHeight: '100vh' }}>
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <i className="bi bi-shop fs-3 text-success me-2"></i>
            <span className="fs-4 fw-bold">ECommerce</span>
          </div>
        </div>
        
        <Nav className="flex-column p-2">
          {sidebarItems.map((item) => (
            <Nav.Link
              key={item.id}
              href="#"
              className={`text-white p-3 rounded mb-1 ${
                activeSection === item.id ? 'bg-success' : ''
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <i className={`${item.icon} me-3`}></i>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <Navbar bg="white" className="border-bottom px-4 py-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <h2 className="mb-1 fw-bold">Overview</h2>
              <p className="text-muted mb-0">Welcome back! Here's what's happening with your store.</p>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                />
              </InputGroup>
              
              <Button variant="outline-secondary" className="position-relative">
                <i className="bi bi-bell"></i>
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                  3
                </Badge>
              </Button>
              
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center gap-2">
                  <div 
                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                    style={{ width: '32px', height: '32px' }}
                  >
                    JD
                  </div>
                  John Doe
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Navbar>

        {/* Dashboard Content */}
        <Container fluid className="p-4">
          {/* Metrics Cards */}
          <Row className="mb-4">
            {metricsData.map((metric, index) => (
              <Col lg={3} md={6} className="mb-3" key={index}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Card.Title className="text-muted small text-uppercase mb-1">
                          {metric.title}
                        </Card.Title>
                        <small className="text-muted">{metric.period}</small>
                      </div>
                      <div className="bg-success bg-opacity-10 p-2 rounded">
                        <i className={`${metric.icon} text-success fs-4`}></i>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-end">
                      <h3 className="fw-bold mb-0">{metric.value}</h3>
                      <Badge bg={metric.changeType} className="fs-6">
                        <i className={`bi bi-arrow-${metric.changeType === 'success' ? 'up' : 'down'}-right me-1`}></i>
                        {metric.change}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            {/* Sales Analytics Chart */}
            <Col lg={8} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Sales Analytics</h5>
                  <Form.Select style={{ width: 'auto' }}>
                    <option>Jul 2023</option>
                    <option>Jun 2023</option>
                    <option>May 2023</option>
                  </Form.Select>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-4">
                    <Col md={4}>
                      <div className="d-flex align-items-center mb-2">
                        <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                        <small className="text-muted">Income</small>
                      </div>
                      <h4 className="fw-bold mb-0">
                        €23,262
                        <Badge bg="success" className="ms-2 fs-6">+2.5%</Badge>
                      </h4>
                    </Col>
                    <Col md={4}>
                      <div className="d-flex align-items-center mb-2">
                        <div className="bg-warning rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                        <small className="text-muted">Expenses</small>
                      </div>
                      <h4 className="fw-bold mb-0">
                        €11,135
                        <Badge bg="danger" className="ms-2 fs-6">-1.2%</Badge>
                      </h4>
                    </Col>
                    <Col md={4}>
                      <div className="d-flex align-items-center mb-2">
                        <div className="bg-info rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                        <small className="text-muted">Balance</small>
                      </div>
                      <h4 className="fw-bold mb-0">
                        €48,135
                        <Badge bg="success" className="ms-2 fs-6">+8.2%</Badge>
                      </h4>
                    </Col>
                  </Row>
                  
                  {/* Chart */}
                  <SalesChartBootstrap height={200} />
                </Card.Body>
              </Card>
            </Col>

            {/* Sales Target */}
            <Col lg={4} className="mb-4">
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0 fw-bold text-center">Sales Target</h5>
                </Card.Header>
                <Card.Body className="text-center">
                  {/* Circular Progress */}
                  <div className="mb-4">
                    <CircularProgress percentage={85} size={120} />
                  </div>
                  
                  <Row>
                    <Col>
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                        <small className="text-muted">Daily Target</small>
                      </div>
                      <h5 className="fw-bold">650</h5>
                      <small className="text-muted">520 / 650</small>
                    </Col>
                  </Row>
                  
                  <hr />
                  
                  <Row>
                    <Col>
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <div className="bg-info rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                        <small className="text-muted">Monthly Target</small>
                      </div>
                      <h5 className="fw-bold">14,500</h5>
                      <small className="text-muted">12,300 / 14,500</small>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Top Selling Products */}
            <Col lg={6} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Top Selling Products</h5>
                  <Button variant="link" className="text-success p-0">
                    View All <i className="bi bi-arrow-right"></i>
                  </Button>
                </Card.Header>
                <Card.Body>
                  {topProducts.map((product, index) => (
                    <div key={index} className="d-flex align-items-center mb-3 p-2 rounded hover-bg-light">
                      <div 
                        className="bg-light rounded me-3 d-flex align-items-center justify-content-center"
                        style={{ width: '48px', height: '48px' }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>{product.image}</span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-semibold">{product.name}</h6>
                        <small className="text-muted">{product.sales}</small>
                        <ProgressBar 
                          now={product.progress} 
                          className="mt-1" 
                          style={{ height: '4px' }}
                          variant="success"
                        />
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Current Offers */}
            <Col lg={6} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-0">
                  <h5 className="mb-0 fw-bold">Current Offers</h5>
                </Card.Header>
                <Card.Body>
                  {currentOffers.map((offer, index) => (
                    <Card key={index} className="mb-3 border">
                      <Card.Body className="p-3">
                        <h6 className="fw-semibold mb-1">{offer.title}</h6>
                        <small className="text-muted mb-3 d-block">{offer.expiry}</small>
                        <ProgressBar 
                          now={offer.progress} 
                          variant={offer.variant}
                          style={{ height: '6px' }}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BootstrapDashboard;