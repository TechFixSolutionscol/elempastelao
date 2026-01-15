# El Empastelao - Catálogo de Pedidos por WhatsApp

Este proyecto extiende la página web existente de "El Empastelao" para convertirla en un catálogo de comidas interactivo con un sistema de pedidos rápido a través de WhatsApp.

La implementación se ha realizado con **HTML, CSS y JavaScript puros**, sin necesidad de frameworks o librerías externas, asegurando una integración ligera y un mantenimiento sencillo.

## Estructura del Proyecto

Los archivos principales modificados y añadidos son:

- `empastelao_menu.html`: Contiene la estructura HTML de los productos del menú. Se ha modificado para añadir los elementos necesarios para la funcionalidad del carrito (botones, atributos de datos, etc.).
- `css/custom.css`: (o estilos en línea en el `<head>`) Contiene los estilos adicionales para el carrito de compras, el formulario de cliente y los botones, diseñados para integrarse perfectamente con la estética actual de la web.
- `js/app.js`: Contiene toda la lógica de JavaScript para la funcionalidad del pedido rápido.

## Características Implementadas

### 1. Catálogo de Comidas Interactivo

-   **Botón "Agregar al pedido"**: Cada producto en `empastelao_menu.html` ahora cuenta con un botón para añadirlo fácilmente al carrito.
-   **Identificación de Productos**: Se utilizan atributos `data-*` en el HTML para identificar de forma única cada producto, su nombre y su precio.
    -   `data-id`: Identificador único (ej: `combo-1-pal-antajao`).
    -   `data-name`: Nombre del producto (ej: `Combo 1 - Pa'l Antojao`).
    -   `data-price`: Precio numérico (ej: `12000`).

### 2. Carrito de Pedido Rápido

El carrito es un componente flotante y siempre visible que permite a los usuarios gestionar su pedido sin recargar la página.

-   **Persistencia de Datos**: El estado del carrito se guarda en el `localStorage` del navegador. El pedido no se pierde si el usuario recarga la página o la cierra y vuelve a abrir.
-   **Funcionalidades**:
    -   **Agregar productos**: Añade un producto al carrito o incrementa su cantidad si ya existe.
    -   **Modificar Cantidades**: Permite aumentar o disminuir la cantidad de cada producto directamente desde el carrito.
    -   **Eliminar Productos**: Un botón permite quitar un producto del pedido.
-   **Visualización en Tiempo Real**: El detalle del pedido (productos, cantidades, subtotales) y el total general se actualizan instantáneamente con cada cambio.

### 3. Formulario de Datos del Cliente

Integrado en la vista del carrito, este formulario recopila la información necesaria para la entrega del pedido.

-   **Campos**:
    -   Nombre completo (`input type="text"`, obligatorio).
    -   Dirección (`input type="text"`, obligatorio).
    -   Barrio (`input type="text"`, obligatorio).
    -   Notas adicionales (`textarea`, opcional).
-   **Validación en Tiempo Real**: El sistema verifica que los campos obligatorios no estén vacíos antes de permitir el envío del pedido. Los mensajes de error son claros y siguen el estilo visual de la web.

### 4. Envío de Pedido por WhatsApp

El botón "Enviar pedido por WhatsApp" es el paso final del proceso.

-   **Validación Final**: Antes de generar el mensaje, el sistema comprueba dos condiciones:
    1.  El carrito no debe estar vacío.
    2.  El formulario de datos del cliente debe estar correctamente llenado.
-   **Generación de Mensaje**: Si la validación es exitosa, se genera un mensaje de texto formateado, listo para ser enviado.
-   **Redirección a WhatsApp**: El usuario es redirigido a la API de WhatsApp con el mensaje precargado, dirigido al número de teléfono configurado: `+57 302 432 5114`.

#### Ejemplo del Mensaje de WhatsApp Generado

```
📦 PEDIDO DE COMIDA

👤 Cliente:
Nombre: Juan Pérez
Dirección: Calle Falsa 123, Apto 404
Barrio: El Centro

📝 Notas adicionales:
El ají picante, por favor, que sea bien potente.

🍽️ Pedido:
- Combo 1 - Pa'l Antojao x2 — $24000
- AREPLATANO x1 — $6000

💰 Total: $30000

Pedido listo para preparación y entrega a domicilio.
```

## Uso y Flujo

1.  **Navegar el Menú**: El cliente explora `empastelao_menu.html`.
2.  **Agregar Productos**: Usa el botón "Agregar al pedido" en los productos que desea.
3.  **Revisar el Pedido**: Abre el carrito flotante para ver los productos, ajustar cantidades o eliminar ítems.
4.  **Ingresar Datos**: En la misma vista del carrito, llena sus datos de contacto y entrega.
5.  **Enviar Pedido**: Hace clic en "Enviar pedido por WhatsApp" para finalizar.

Este sistema está diseñado para ser rápido, intuitivo y optimizado para dispositivos móviles, priorizando una experiencia de usuario fluida y sin fricciones.