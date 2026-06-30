
# Blueprint: SisGestión - Sistema de Gestión Integral

## Visión General

SisGestión es una aplicación web moderna diseñada para centralizar y simplificar las operaciones clave de un negocio. La aplicación ofrece una interfaz de usuario limpia, segura y fácil de usar, permitiendo a los administradores gestionar eficientemente la contabilidad, el inventario, los recursos humanos y la generación de reportes.

---

## Fase 1: Fundación y Autenticación (Completada)

En esta fase inicial, se construyó el esqueleto de la aplicación, se estableció un diseño visual coherente y se implementó un sistema de autenticación robusto utilizando Firebase.

### Características Implementadas:

*   **Proyecto Angular Moderno:**
    *   Creado con Angular v20+.
    *   Arquitectura 100% basada en **Standalone Components**.
    *   Uso de **Signals** para el manejo de estado reactivo.
    *   **ChangeDetectionStrategy.OnPush** por defecto para un rendimiento óptimo.
    *   Sistema de **rutas lazy-loaded** para carga eficiente de módulos.

*   **Diseño Visual y UX:**
    *   **Login:** Una pantalla de inicio de sesión limpia y profesional.
    *   **Dashboard:** Un layout principal con una barra de navegación lateral persistente que da acceso a todos los módulos.
    *   **Paleta de Colores:** Un esquema de colores sobrio y profesional (azul oscuro, blanco, gris y rojo para acciones).
    *   **Componentes:** Botones y campos de entrada estilizados para una experiencia de usuario consistente.

*   **Autenticación con Firebase:**
    *   Integración completa con Firebase Authentication.
    *   **Guardias de Ruta (`AuthGuard`):** Protegen el dashboard y redirigen a los usuarios no autenticados a la página de login.
    *   **Flujo de Sesión:**
        *   Inicio de sesión seguro con correo y contraseña.
        *   Funcionalidad para "Cerrar Sesión".
        *   Redirección automática al dashboard si el usuario ya tiene una sesión activa.

---

## Fase 2: Desarrollo de Módulos Principales (Plan de Acción)

Con la base ya establecida, procederemos a desarrollar las funcionalidades específicas de cada módulo.

### Plan de Desarrollo:

1.  **Módulo de Contabilidad:**
    *   **Objetivo:** Registrar y visualizar transacciones financieras.
    *   **Componentes:**
        *   Formulario para registrar ingresos y egresos.
        *   Tabla para listar todas las transacciones con fecha, descripción, tipo y monto.
        *   Cálculo y visualización de saldos en tiempo real.
    *   **Tecnología:** Se utilizará **Cloud Firestore** para almacenar los datos de las transacciones de forma segura.

2.  **Módulo de Inventario:**
    *   **Objetivo:** Gestionar el stock de productos.
    *   **Componentes:**
        *   Formulario para agregar o editar productos (nombre, descripción, cantidad, precio).
        *   Una vista de "tarjetas" o una tabla para mostrar todos los productos del inventario.
        *   Funcionalidad para ajustar la cantidad de stock.

3.  **Módulo de Reportes:**
    *   **Objetivo:** Generar y visualizar informes a partir de los datos existentes.
    *   **Componentes:**
        *   Selector de tipo de reporte (ej. "Reporte de Ventas Mensuales", "Estado de Inventario").
        *   Visualización de datos con tablas y gráficos simples.

4.  **Módulo de Recursos:**
    *   **Objetivo:** Gestionar información básica de empleados.
    *   **Componentes:**
        *   Formulario para agregar nuevos empleados (nombre, puesto, fecha de ingreso).
        *   Lista de empleados.

Empezaremos con el **Módulo de Contabilidad**. ¿Estás listo para continuar?
