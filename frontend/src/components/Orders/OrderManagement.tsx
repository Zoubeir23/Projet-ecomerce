import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  Form,
  InputGroup,
  Modal,
  Pagination
} from 'react-bootstrap';
import './OrderManagement.css';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  shippingAddress: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      customer: {
        name: 'Marie Dubois',
        email: 'marie.dubois@email.com'
      },
      items: [
        { name: 'iPhone 15 Pro', quantity: 1, price: 1199.99 },
        { name: 'AirPods Pro 2', quantity: 1, price: 279.99 }
      ],
      total: 1479.98,
      status: 'processing',
      paymentStatus: 'paid',
      createdAt: '2024-09-14T10:30:00Z',
      shippingAddress: '123 Rue de la Paix, 75001 Paris'
    },
    {
      id: 'ORD-2024-002',
      customer: {
        name: 'Pierre Martin',
        email: 'pierre.martin@email.com'
      },
      items: [
        { name: 'MacBook Air M3', quantity: 1, price: 1399.99 }
      ],
      total: 1399.99,
      status: 'shipped',
      paymentStatus: 'paid',
      createdAt: '2024-09-13T14:20:00Z',
      shippingAddress: '456 Avenue des Champs, 69001 Lyon'
    },
    {
      id: 'ORD-2024-003',
      customer: {
        name: 'Sophie Laurent',
        email: 'sophie.laurent@email.com'
      },
      items: [
        { name: 'AirPods Pro 2', quantity: 2, price: 279.99 }
      ],
      total: 559.98,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2024-09-14T16:45:00Z',
      shippingAddress: '789 Boulevard Saint-Germain, 33000 Bordeaux'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      pending: 'warning',
      confirmed: 'info',
      processing: 'primary',
      shipped: 'success',
      delivered: 'success',
      cancelled: 'danger'
    };
    
    const labels: { [key: string]: string } = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En traitement',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };

    return <Badge bg={variants[status]}>{labels[status]}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      pending: 'warning',
      paid: 'success',
      failed: 'danger',
      refunded: 'secondary'
    };
    
    const labels: { [key: string]: string } = {
      pending: 'En attente',
      paid: 'Payé',
      failed: 'Échoué',
      refunded: 'Remboursé'
    };

    return <Badge bg={variants[status]}>{labels[status]}</Badge>;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="order-management">
      <Container fluid>
        {/* Header */}
        <div className="page-header mb-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="page-title">Gestion des Commandes</h2>
              <p className="page-subtitle">Suivez et gérez toutes vos commandes</p>
            </Col>
          </Row>
        </div>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-primary">
                  <i className="bi bi-cart3"></i>
                </div>
                <div className="stat-details">
                  <h3 className="stat-value">{orderStats.total}</h3>
                  <p className="stat-label">Total commandes</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-warning">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="stat-details">
                  <h3 className="stat-value">{orderStats.pending}</h3>
                  <p className="stat-label">En attente</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-success">
                  <i className="bi bi-truck"></i>
                </div>
                <div className="stat-details">
                  <h3 className="stat-value">{orderStats.shipped}</h3>
                  <p className="stat-label">Expédiées</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="stat-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon bg-info">
                  <i className="bi bi-currency-euro"></i>
                </div>
                <div className="stat-details">
                  <h3 className="stat-value">€{orderStats.totalRevenue.toLocaleString()}</h3>
                  <p className="stat-label">Chiffre d'affaires</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-4">
          <Card.Body>
            <Row className="align-items-end">
              <Col md={6}>
                <Form.Label>Rechercher</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="N° commande, nom client, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Label>Statut</Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="processing">En traitement</option>
                  <option value="shipped">Expédiée</option>
                  <option value="delivered">Livrée</option>
                  <option value="cancelled">Annulée</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Réinitialiser
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Orders Table */}
        <Card>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="orders-table mb-0">
                <thead>
                  <tr>
                    <th>Commande</th>
                    <th>Client</th>
                    <th>Articles</th>
                    <th>Total</th>
                    <th>Statut</th>
                    <th>Paiement</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <div className="order-id-cell">
                          <strong>{order.id}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="customer-info">
                          <div className="customer-name">{order.customer.name}</div>
                          <div className="customer-email">{order.customer.email}</div>
                        </div>
                      </td>
                      <td>
                        <div className="items-summary">
                          {order.items.length} article{order.items.length > 1 ? 's' : ''}
                          <div className="items-preview">
                            {order.items[0].name}
                            {order.items.length > 1 && ` +${order.items.length - 1} autre${order.items.length > 2 ? 's' : ''}`}
                          </div>
                        </div>
                      </td>
                      <td className="order-total">€{order.total.toFixed(2)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>{getPaymentBadge(order.paymentStatus)}</td>
                      <td className="order-date">{formatDate(order.createdAt)}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowModal(true);
                            }}
                            className="me-2"
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          {order.status === 'pending' && (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            >
                              <i className="bi bi-check-lg"></i>
                            </Button>
                          )}
                          {order.status === 'confirmed' && (
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                            >
                              <i className="bi bi-gear"></i>
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                            >
                              <i className="bi bi-truck"></i>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center p-3">
                <Pagination className="mb-0">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </Pagination>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-receipt me-2"></i>
            Détails de la commande {selectedOrder?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="order-details">
              <Row>
                <Col md={6}>
                  <h6>Informations client</h6>
                  <p className="mb-1"><strong>{selectedOrder.customer.name}</strong></p>
                  <p className="mb-1 text-muted">{selectedOrder.customer.email}</p>
                  <p className="mb-3 text-muted">{selectedOrder.shippingAddress}</p>
                </Col>
                <Col md={6}>
                  <h6>Statut de la commande</h6>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                  <h6>Statut du paiement</h6>
                  <p>{getPaymentBadge(selectedOrder.paymentStatus)}</p>
                </Col>
              </Row>

              <h6>Articles commandés</h6>
              <div className="items-detail">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="item-row d-flex justify-content-between align-items-center py-2 border-bottom">
                    <div>
                      <strong>{item.name}</strong>
                      <div className="text-muted">Quantité: {item.quantity}</div>
                    </div>
                    <div className="text-end">
                      <div>€{item.price.toFixed(2)}</div>
                      <div className="text-muted">Total: €{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
                <div className="total-row d-flex justify-content-between align-items-center py-3 border-top">
                  <strong>Total de la commande</strong>
                  <strong className="text-success">€{selectedOrder.total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="mt-3">
                <small className="text-muted">
                  Commande passée le {formatDate(selectedOrder.createdAt)}
                </small>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
          <Button variant="primary">
            <i className="bi bi-printer me-2"></i>
            Imprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManagement;