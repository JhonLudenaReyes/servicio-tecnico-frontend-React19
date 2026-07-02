import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { LogIn, KeyRound, User as UserIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { useAuth } from '../../hooks/use-auth';

const loginSchema = z.object({
  UsuarioLogin: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
  Contrasenia: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      login({
        Token: 'mock_jwt_token',
        User: {
          IdUsuario: 1,
          IdPersona: 1,
          UsuarioLogin: data.UsuarioLogin,
          Contrasenia: '',
          Estado: 'A',
          Persona: {
            IdPersona: 1,
            IdCiudad: 1,
            Nombres: 'Admin',
            Apellidos: 'Sistema',
            Cedula: '1234567890',
            Celular: '0987654321',
            Estado: 'A',
          }
        },
      });
      
      toast.success(`¡Bienvenido de nuevo, ${data.UsuarioLogin}!`);
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg p-4">
                <Card.Body>
                  <div className="text-center mb-4">
                    <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>
                      <LogIn size={32} />
                    </div>
                    <h3 className="fw-bold">Iniciar Sesión</h3>
                    <p className="text-muted small">Gestión de Servicio Técnico</p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Usuario</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light border-end-0">
                          <UserIcon size={18} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="admin"
                          className="bg-light border-start-0"
                          isInvalid={!!errors.UsuarioLogin}
                          {...register('UsuarioLogin')}
                          disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.UsuarioLogin?.message}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text className="bg-light border-end-0">
                          <KeyRound size={18} className="text-muted" />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="••••••••"
                          className="bg-light border-start-0"
                          isInvalid={!!errors.Contrasenia}
                          {...register('Contrasenia')}
                          disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.Contrasenia?.message}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-100 py-2 fw-bold" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="me-2 spinner-border spinner-border-sm" />
                          Autenticando...
                        </>
                      ) : (
                        'Ingresar al Sistema'
                      )}
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 text-center py-3">
                  <small className="text-muted">© 2026 Servicio Técnico App</small>
                </Card.Footer>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
