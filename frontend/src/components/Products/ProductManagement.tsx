import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Table,
  Badge,
  InputGroup,
  Pagination
} from 'react-bootstrap';
import './ProductManagement.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  image?: string;
  createdAt: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "iPhone 15 Pro",
      description: "Dernier modèle Apple avec puce A17 Pro",
      price: 1199.99,
      stock: 25,
      category: "Smartphones",
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "MacBook Air M3",
      description: "Ordinateur portable ultra-léger avec puce M3",
      price: 1399.99,
      stock: 0,
      category: "Ordinateurs",
      status: "out_of_stock",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      description: "Écouteurs sans fil avec réduction de bruit",
      price: 279.99,
      stock: 50,
      category: "Audio",
      status: "active",
      createdAt: "2024-01-20"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const categories = ['Smartphones', 'Ordinateurs', 'Audio', 'Accessoires', 'Gaming'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Smartphones',
    status: 'active' as 'active' | 'inactive' | 'out_of_stock'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      status: parseInt(formData.stock) === 0 ? 'out_of_stock' : formData.status,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0]
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts(prev => [...prev, productData]);
    }

    handleCloseModal();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      status: product.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Smartphones',
      status: 'active'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge bg="success">Actif</Badge>;
      case 'inactive': return <Badge bg="secondary">Inactif</Badge>;
      case 'out_of_stock': return <Badge bg="danger">Rupture</Badge>;
      default: return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="product-management">
      <Container fluid>
        {/* Header */}
        <div className="page-header mb-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="page-title">Gestion des Produits</h2>
              <p className="page-subtitle">Gérez votre catalogue de produits</p>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="add-product-btn"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Ajouter un produit
              </Button>
            </Col>
          </Row>
        </div>

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
                    placeholder="Nom ou description du produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <Form.Label>Catégorie</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Réinitialiser
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Products Table */}
        <Card>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="products-table mb-0">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Stock</th>
                    <th>Statut</th>
                    <th>Date création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-info">
                          <div className="product-avatar">
                            <i className="bi bi-box-seam"></i>
                          </div>
                          <div>
                            <div className="product-name">{product.name}</div>
                            <div className="product-description">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg="light" text="dark">{product.category}</Badge>
                      </td>
                      <td className="product-price">€{product.price.toFixed(2)}</td>
                      <td>
                        <span className={`stock-indicator ${product.stock === 0 ? 'text-danger' : product.stock < 10 ? 'text-warning' : 'text-success'}`}>
                          {product.stock} unités
                        </span>
                      </td>
                      <td>{getStatusBadge(product.status)}</td>
                      <td className="text-muted">{new Date(product.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
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

      {/* Add/Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className={`bi ${editingProduct ? 'bi-pencil' : 'bi-plus-lg'} me-2`}></i>
            {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom du produit *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: iPhone 15 Pro"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Catégorie *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description détaillée du produit..."
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Prix (€) *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>€</InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Statut</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              <i className={`bi ${editingProduct ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>
              {editingProduct ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;