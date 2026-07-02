import { Row, Col, Card } from 'react-bootstrap';
import { ClipboardList, Users, Wrench, CheckCircle2 } from 'lucide-react';

const stats = [
  { 
    name: 'Órdenes Totales', 
    value: '128', 
    icon: ClipboardList, 
    color: 'text-primary', 
    bg: 'rgba(13, 110, 253, 0.1)' 
  },
  { 
    name: 'Clientes Activos', 
    value: '45', 
    icon: Users, 
    color: 'text-info', 
    bg: 'rgba(13, 202, 240, 0.1)' 
  },
  { 
    name: 'En Diagnóstico', 
    value: '12', 
    icon: Wrench, 
    color: 'text-warning', 
    bg: 'rgba(255, 193, 7, 0.1)' 
  },
  { 
    name: 'Reparados', 
    value: '84', 
    icon: CheckCircle2, 
    color: 'text-success', 
    bg: 'rgba(25, 135, 84, 0.1)' 
  },
];

export default function DashboardPage() {
  return (
    <div className="py-2">
      <div className="mb-4">
        <h2 className="fw-bold">Panel de Control</h2>
        <p className="text-muted">Resumen general de las actividades del taller técnico.</p>
      </div>

      <Row className="g-4 mb-4">
        {stats.map((stat) => (
          <Col key={stat.name} xs={12} sm={6} lg={3}>
            <Card className="stat-card p-3 h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="icon-box me-3" style={{ backgroundColor: stat.bg }}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div>
                  <h6 className="text-muted mb-1">{stat.name}</h6>
                  <h3 className="fw-bold mb-0">{stat.value}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="fw-bold mb-0">Actividad de Órdenes</h5>
            </Card.Header>
            <Card.Body>
              <div 
                className="bg-light rounded-3 d-flex align-items-center justify-content-center text-muted"
                style={{ height: '300px', border: '2px dashed #dee2e6' }}
              >
                Visualización de Gráficos (Próximamente)
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="fw-bold mb-0">Tareas Pendientes</h5>
            </Card.Header>
            <Card.Body>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="d-flex align-items-center mb-3 p-2 rounded-3 hover-bg-light transition-all">
                  <div className="bg-light p-2 rounded-circle me-3">
                    <Wrench size={18} className="text-primary" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold small">Reparación #00{i}</div>
                    <div className="text-muted small">Cliente: Ana María</div>
                  </div>
                  <span className="badge bg-warning-subtle text-warning rounded-pill">Urgente</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
