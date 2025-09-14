import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Nav,
  InputGroup
} from 'react-bootstrap';
import './Auth.css';

interface AuthProps {
  onLogin: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: 'customer', // customer, vendor, admin
    phone: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'register') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas');
        }
        if (!formData.acceptTerms) {
          throw new Error('Vous devez accepter les conditions d\'utilisation');
        }
      }

      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation utilisateur connecté
      const user = {
        id: 1,
        email: formData.email,
        firstName: formData.firstName || 'John',
        lastName: formData.lastName || 'Doe',
        userType: formData.userType,
        isAuthenticated: true
      };

      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Container>
        <Row className="justify-content-center min-vh-100 align-items-center">
          <Col lg={5} md={7} sm={9}>
            <Card className="auth-card">
              <Card.Body className="p-4">
                <div className="auth-header text-center mb-4">
                  <div className="auth-logo mb-3">
                    <i className="bi bi-shop text-primary fs-1"></i>
                  </div>
                  <h2 className="auth-title">ECommerce Platform</h2>
                  <p className="auth-subtitle text-muted">
                    {activeTab === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
                  </p>
                </div>

                {/* Tabs */}
                <Nav variant="pills" className="auth-tabs mb-4" activeKey={activeTab}>
                  <Nav.Item className="flex-fill">
                    <Nav.Link
                      eventKey="login"
                      onClick={() => setActiveTab('login')}
                      className="text-center"
                    >
                      Connexion
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="flex-fill">
                    <Nav.Link
                      eventKey="register"
                      onClick={() => setActiveTab('register')}
                      className="text-center"
                    >
                      Inscription
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                {error && (
                  <Alert variant="danger" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  {activeTab === 'register' && (
                    <>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Votre prénom"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Votre nom"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Type de compte</Form.Label>
                        <Form.Select
                          name="userType"
                          value={formData.userType}
                          onChange={handleInputChange}
                        >
                          <option value="customer">Client</option>
                          <option value="vendor">Vendeur</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-envelope"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre@email.com"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {activeTab === 'register' && (
                    <Form.Group className="mb-3">
                      <Form.Label>Téléphone (optionnel)</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-phone"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+33 6 12 34 56 78"
                        />
                      </InputGroup>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-lock"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Votre mot de passe"
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {activeTab === 'register' && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirmer le mot de passe</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="bi bi-lock-fill"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirmez votre mot de passe"
                            required
                          />
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          label={
                            <span>
                              J'accepte les{' '}
                              <a href="#" className="text-primary">
                                conditions d'utilisation
                              </a>{' '}
                              et la{' '}
                              <a href="#" className="text-primary">
                                politique de confidentialité
                              </a>
                            </span>
                          }
                          required
                        />
                      </Form.Group>
                    </>
                  )}

                  {activeTab === 'login' && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Se souvenir de moi"
                      />
                      <a href="#" className="text-primary text-decoration-none">
                        Mot de passe oublié ?
                      </a>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {activeTab === 'login' ? 'Connexion...' : 'Inscription...'}
                      </>
                    ) : (
                      <>
                        <i className={`bi ${activeTab === 'login' ? 'bi-box-arrow-in-right' : 'bi-person-plus'} me-2`}></i>
                        {activeTab === 'login' ? 'Se connecter' : 'S\'inscrire'}
                      </>
                    )}
                  </Button>
                </Form>

                <div className="auth-footer text-center mt-4">
                  <hr className="my-4" />
                  <div className="auth-social">
                    <p className="text-muted mb-3">Ou continuez avec</p>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-google me-1"></i> Google
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-facebook me-1"></i> Facebook
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;