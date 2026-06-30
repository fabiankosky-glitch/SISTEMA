## Fase 1: Estructura Inicial y Autenticación (Completada)

La primera fase se centró en levantar la arquitectura básica de la aplicación, asegurar la navegación y la autenticación de usuarios.

---

## Fase 2: Módulo de Control de Medicamentos (En Progreso)

En esta fase, estamos transformando el formulario en una herramienta de cálculo y seguimiento de tratamiento, basada en la lógica de negocio definida por el usuario.

### Plan de Desarrollo:

1.  **Rediseño del Formulario a Dos Secciones:**
    *   **Objetivo:** Reestructurar la interfaz en dos partes lógicas: una calculadora para el plan de tratamiento y un kardex para el seguimiento de inventario.
    *   **Ubicación:** Componente `LibroCorrectoComponent`.
    *   **Acción Actual:** Modificar el HTML y CSS para implementar el nuevo diseño.

2.  **Sección 1: Calculadora de Tratamiento:**
    *   **Campos de Entrada:**
        *   Nombre del Paciente, Medicamento, Cantidad Correcta, Dosis (AM, PM1, PM2), Vía, Fecha de Inicio.
    *   **Campos Calculados:**
        *   `Dosis Total Día`: Suma de las dosis parciales.
        *   `Fecha Final`: Calculada a partir de la cantidad y la dosis total diaria.

3.  **Sección 2: Kardex del Medicamento:**
    *   **Campos Automáticos (Vinculados a la Sección 1):**
        *   Fecha, Nombre del Producto, Proveedor ("FAMILIA"), Entrada, Salida.
    *   **Campos de Entrada Libre:**
        *   Presentación, Componente Activo, Invima, Lote, Vencimiento, Casa Matriz, Estado del Empaque, Firma.
    *   **Campo Calculado:**
        *   `Saldo`: Resta entre `Entrada` y `Salida`.

4.  **Implementación de Lógica Reactiva:**
    *   **Objetivo:** Usar señales (`signal`, `computed`) en el componente de TypeScript para que todos los campos calculados se actualicen en tiempo real a medida que el usuario introduce datos.