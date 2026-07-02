import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Monitor, 
  Settings, 
  LogOut, 
  Menu, 
  User,
  Wrench,
  MapPin
} from 'lucide-react';
import { useAuth } from '../hooks/use-auth';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Órdenes', href: '/ordenes', icon: ClipboardList },
  { name: 'Clientes', href: '/clientes', icon: Users },
  { name: 'Equipos', href: '/equipos', icon: Monitor },
  { name: 'Ciudades', href: '/ciudades', icon: MapPin },
  { name: 'Configuración', href: '/configuracion', icon: Settings },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { User: authUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex bg-light">
      {/* Sidebar */}
      <aside 
        className="sidebar d-flex flex-column"
        style={{ width: isSidebarOpen ? '280px' : '80px' }}
      >
        <div className="p-4 border-bottom d-flex align-items-center">
          <Wrench className="text-primary me-2 flex-shrink-0" size={24} />
          {isSidebarOpen && <span className="fw-bold fs-5 text-truncate">Servicio Técnico</span>}
        </div>

        <div className="flex-grow-1 p-3">
          <Nav className="flex-column">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `nav-link-custom ${isActive ? 'active' : ''}`
                }
              >
                <item.icon size={20} className={isSidebarOpen ? 'me-3' : 'mx-auto'} />
                {isSidebarOpen && <span className="fw-medium">{item.name}</span>}
              </NavLink>
            ))}
          </Nav>
        </div>

        <div className="p-3 border-top">
          <Button 
            variant="link" 
            className="text-danger text-decoration-none d-flex align-items-center w-100 p-2"
            onClick={handleLogout}
          >
            <LogOut size={20} className={isSidebarOpen ? 'me-3' : 'mx-auto'} />
            {isSidebarOpen && <span className="fw-medium">Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="main-content min-vh-100">
        <header className="navbar-custom d-flex align-items-center justify-content-between px-4 sticky-top">
          <Button 
            variant="light" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-circle shadow-sm"
          >
            <Menu size={20} />
          </Button>

          <div className="d-flex align-items-center">
            <div className="me-3 text-end d-none d-sm-block">
              <div className="fw-bold small">{authUser?.UsuarioLogin}</div>
              <div className="text-muted" style={{ fontSize: '10px' }}>ADMINISTRADOR</div>
            </div>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-user" className="p-0 text-decoration-none border-0">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                  <User size={20} />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm border-0 mt-2">
                <Dropdown.Header>Perfil de Usuario</Dropdown.Header>
                <Dropdown.Item href="#/profile">Mi Perfil</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>

        <main className="p-4">
          <Container fluid>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}
