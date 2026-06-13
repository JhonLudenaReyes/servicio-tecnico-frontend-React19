function App() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Servicio Técnico
        </h1>
        <p className="text-muted-foreground">
          Sistema de gestión para taller de reparaciones.
        </p>
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <p className="text-sm">Configuración inicial completada con éxito.</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            onClick={() => {
              import('sonner').then(({ toast }) => {
                toast.success('¡Hola! El sistema está listo para empezar.');
              });
            }}
          >
            Probar Notificación
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
