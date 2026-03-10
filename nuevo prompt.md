# 🍽️ PROMPT: Landing Page Premium — El Empastelao
## Optimizado para Claude Haiku 4.5 en VS Code

---

## 🎯 IDENTIDAD DEL NEGOCIO (DATOS FIJOS — NO PREGUNTAR)

```
Nombre:         El Empastelao
Tagline:        "Sabor que abraza el alma"
Propuesta:      Pastelería artesanal y comida casera con recetas tradicionales,
                elaboradas con ingredientes frescos y amor de abuela.
Sector:         Food & Beverage / Pastelería / Restaurante
Tipo de web:    Corporativa gastronómica
```

---

## 🔒 PROTOCOLO DE PROTECCIÓN DE CÓDIGO EXISTENTE — LEER PRIMERO, SIEMPRE

> Esta página **ya existe y está en producción**. Tiene funciones activas que los clientes usan. Un error aquí rompe el negocio. Sigue este protocolo sin excepciones.

### PASO 0 — ANTES DE TOCAR CUALQUIER ARCHIVO

```
1. Lee el archivo completo de arriba a abajo.
2. Identifica y lista en un comentario todos los bloques que vas a CONSERVAR intactos.
3. Identifica y lista los bloques que vas a MODIFICAR y por qué.
4. Solo entonces empieza a escribir código.
5. Si tienes dudas sobre si algo se puede tocar → NO lo toques y pregunta.
```

---

### 🚫 ELEMENTOS INTOCABLES — PROHIBIDO MODIFICAR, ELIMINAR O REESCRIBIR

#### 1. FUNCIONES JAVASCRIPT — CONGELAR COMPLETAMENTE
```
REGLA: Todas las funciones JS existentes se copian EXACTAMENTE como están.
       No renombrar. No refactorizar. No "mejorar". No mover de lugar.
       Solo se pueden AGREGAR funciones nuevas debajo de las existentes.
```

**Cómo identificarlas:** Cualquier bloque `function nombreFuncion()`, `const fn = () =>`,
`addEventListener`, o lógica de negocio ya presente en el archivo.

**Qué hacer:**
```javascript
// ✅ CORRECTO — Conservar tal cual y agregar nuevas debajo
// [CÓDIGO EXISTENTE SIN CAMBIOS]
...
// --- NUEVAS FUNCIONES AGREGADAS POR REFACTORING ---
function nuevaAnimacion() { ... }
```

```javascript
// ❌ INCORRECTO — Nunca hacer esto
function funcionExistente() {
  // "mejoré" la lógica... ← PROHIBIDO
}
```

---

#### 2. FORMULARIO DE PEDIDOS / CARRITO — ZONA CRÍTICA
```
REGLA: El formulario de pedidos y toda la lógica del carrito son INTOCABLES.
       Esto incluye: campos del formulario, validaciones, eventos submit,
       manejo de items, cálculo de totales y cualquier lógica de estado.
```

**Cómo identificarlo:** Cualquier `<form>`, inputs de pedido, botones
"Agregar al carrito", "Hacer pedido", variables de carrito o arrays de productos.

**Qué hacer:** Si necesitas cambiar el estilo visual del formulario,
solo agregar/modificar clases CSS. **Jamás tocar el HTML funcional ni el JS.**

```html
<!-- ✅ CORRECTO: solo cambiar la clase de estilo -->
<form id="pedido-form" class="form-pedido NUEVA-CLASE-CSS">

<!-- ❌ INCORRECTO: cambiar atributos funcionales -->
<form id="nuevo-id" onsubmit="nuevaFuncion()">
```

---

#### 3. INTEGRACIÓN CON WHATSAPP — ZONA CRÍTICA
```
REGLA: Los links de WhatsApp, números de teléfono, mensajes pre-armados
       y cualquier función que construya el mensaje de WhatsApp son INTOCABLES.
```

**Cómo identificarlo:** URLs `https://wa.me/...`, `https://api.whatsapp.com/send?...`,
variables con números de teléfono, templates de mensajes, funciones `enviarWhatsApp()`.

**Qué hacer:** Puedes cambiar el estilo del botón de WhatsApp (color, tamaño, forma)
pero el `href` o la función que lo genera NO se toca.

```html
<!-- ✅ CORRECTO: cambiar solo la apariencia -->
<a href="[LINK WHATSAPP EXISTENTE - NO TOCAR]" class="btn-whatsapp NUEVA-CLASE">
  📱 Pedir por WhatsApp
</a>

<!-- ❌ INCORRECTO: cambiar el link -->
<a href="https://wa.me/NUEVO_NUMERO">
```

---

#### 4. ESTILOS CSS EXISTENTES — ESTRATEGIA DE EXTENSIÓN
```
REGLA: No eliminar ni sobreescribir reglas CSS existentes.
       Solo AGREGAR nuevas reglas o usar especificidad más alta cuando sea necesario.
```

**Estrategia correcta:**
```css
/* ✅ CORRECTO — Agregar nuevas variables al :root existente */
:root {
  /* === VARIABLES EXISTENTES (NO TOCAR) === */
  --color-existente: #valor;

  /* === NUEVAS VARIABLES AGREGADAS === */
  --bg-primary: #FFFBF4;
  --primary-500: #F07820;
}

/* ✅ CORRECTO — Nueva regla que no conflictúa */
.nueva-seccion-hero { ... }

/* ✅ CORRECTO — Override con mayor especificidad si es necesario */
body .navbar.scrolled { background: rgba(255,251,244,0.96); }

/* ❌ INCORRECTO — Eliminar o reemplazar regla existente */
/* Se elimina .navbar { ... } ← NUNCA */
```

---

### ✅ LO QUE SÍ PUEDES HACER LIBREMENTE

```
✅ Agregar nuevas secciones HTML completas (hero, especialidades, testimonios, etc.)
✅ Agregar nuevas clases CSS sin conflicto con las existentes
✅ Agregar nuevas variables CSS en :root
✅ Agregar nuevas funciones JS después del código existente
✅ Mejorar el estilo visual de elementos existentes SOLO con CSS (clases nuevas)
✅ Agregar animaciones CSS a elementos existentes mediante clases nuevas
✅ Modificar textos de contenido (títulos, párrafos) que no sean parte de lógica JS
✅ Reorganizar el orden visual de secciones en HTML (no el de scripts)
```

---

### 📋 FORMATO DE REPORTE OBLIGATORIO AL INICIO

Antes de entregar el código refactorizado, incluye este bloque de comentario al inicio del archivo:

```html
<!--
╔══════════════════════════════════════════════════════╗
║         REPORTE DE REFACTORING — EL EMPASTELAO       ║
╠══════════════════════════════════════════════════════╣
║ CONSERVADO SIN CAMBIOS:                              ║
║  • [lista de funciones JS preservadas]               ║
║  • [formulario/carrito: estado]                      ║
║  • [integración WhatsApp: estado]                    ║
║  • [variables CSS preservadas]                       ║
╠══════════════════════════════════════════════════════╣
║ MODIFICADO (solo estilo/estructura):                 ║
║  • [elemento] → [qué cambió y por qué]               ║
╠══════════════════════════════════════════════════════╣
║ AGREGADO NUEVO:                                      ║
║  • [nuevas secciones HTML]                           ║
║  • [nuevas funciones JS]                             ║
║  • [nuevas variables CSS]                            ║
╚══════════════════════════════════════════════════════╝
-->
```

---

## ⚠️ REGLAS ABSOLUTAS DE DISEÑO — LEER DESPUÉS DEL PROTOCOLO ANTERIOR

1. **PROHIBIDO** usar fondos oscuros, modo dark o paletas negras/grises oscuras.
2. **OBLIGATORIO** usar la paleta de colores gastronómica definida abajo.
3. **OBLIGATORIO** crear animaciones de entrada suaves y relajantes (no bruscas).
4. Todo debe transmitir: **calidez, apetito, confianza y nostalgia amorosa**.
5. El visitante debe sentir que ya puede oler y saborear la comida.

---

## 🎨 SISTEMA DE COLORES — PALETA GASTRONÓMICA "SABOR CALIENTE"

> Los colores de comida que psicológicamente activan el apetito son los cálidos: naranjas, dorados, cremas y rojos suaves. El verde fresco actúa como acento de frescura e ingredientes naturales.

```css
/* ===== FONDOS (LIGHT, NUNCA DARK) ===== */
--bg-primary:    #FFFBF4;   /* Crema muy suave — fondo principal */
--bg-secondary:  #FFF3E0;   /* Durazno claro — secciones alternas */
--bg-tertiary:   #FEF9EC;   /* Vainilla suave — cards y modales */
--bg-accent:     #FFF8DC;   /* Cornsilk — highlight secciones especiales */

/* ===== NARANJAS Y AMBERS (ACCIÓN Y APETITO) ===== */
--primary-400:   #FFA552;   /* Naranja durazno — hover states */
--primary-500:   #F07820;   /* Naranja fuego — color principal de acción */
--primary-600:   #D4600A;   /* Naranja profundo — botones activos */
--primary-700:   #B54E00;   /* Naranja oscuro — gradientes */

/* ===== DORADOS Y AMBERS (CALIDEZ Y PREMIUM) ===== */
--amber-300:     #FACA7A;   /* Dorado miel claro */
--amber-400:     #F2A94E;   /* Dorado ámbar — detalles */
--amber-500:     #E08C1A;   /* Dorado intenso — badges */

/* ===== ROJOS SUAVES (URGENCIA APETITOSA) ===== */
--red-soft:      #E84545;   /* Rojo tomate — alertas suaves, badges "nuevo" */
--red-warm:      #C0392B;   /* Rojo guindilla — solo para highlights críticos */

/* ===== MARRONES CÁLIDOS (CHOCOLATE Y TIERRA) ===== */
--brown-light:   #A0522D;   /* Sienna — texto secundario */
--brown-mid:     #7B3F1A;   /* Marrón chocolate — texto cards */
--brown-dark:    #4A2010;   /* Marrón oscuro — texto principal */

/* ===== VERDES FRESCOS (INGREDIENTES NATURALES) ===== */
--green-fresh:   #5B9A3C;   /* Verde hoja — "Fresco", "Natural", "Hoy" */
--green-light:   #7EC850;   /* Verde menta — badges de frescura */
--green-pale:    #EDF7E5;   /* Verde muy pálido — fondos de sección "ingredientes" */

/* ===== TEXTOS (NUNCA NEGRO PURO) ===== */
--text-primary:  #2C1A0E;   /* Marrón muy oscuro — texto principal */
--text-secondary:#6B4228;   /* Marrón medio — subtítulos */
--text-tertiary: #A07050;   /* Marrón claro — labels, metadatos */
--text-muted:    #C8A882;   /* Beige — texto decorativo, placeholders */

/* ===== RGB PARA SOMBRAS Y TRANSPARENCIAS ===== */
--primary-rgb:   240, 120, 32;
--amber-rgb:     242, 169, 78;
--brown-rgb:     74, 32, 16;
```

---

## ✍️ TIPOGRAFÍA GASTRONÓMICA

```css
/* Importar desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,600&family=Lato:wght@300;400;700&family=Dancing+Script:wght@600;700&display=swap');

/* ASIGNAR ROLES */
--font-display:  'Playfair Display', serif;    /* Títulos grandes, elegantes */
--font-script:   'Dancing Script', cursive;    /* Taglines, frases especiales */
--font-body:     'Lato', sans-serif;           /* Cuerpo de texto, UI */

/* JERARQUÍA */
H1 Hero:        font: 800 72px/1.1 'Playfair Display'; color: var(--brown-dark);
H2 Secciones:   font: 700 48px/1.2 'Playfair Display'; color: var(--brown-mid);
H3 Cards:       font: 600 24px/1.3 'Playfair Display'; color: var(--brown-mid);
Tagline script: font: 700 28px/1.4 'Dancing Script';   color: var(--primary-500);
Body:           font: 400 17px/1.7 'Lato';             color: var(--text-secondary);
Labels/Tags:    font: 700 12px/1 'Lato'; uppercase; letter-spacing: 0.1em;
```

---

## 📁 ESTRUCTURA DE ARCHIVOS A CREAR

```
el-empastelao/
├── index.html          ← Estructura HTML completa
├── styles.css          ← Todos los estilos
├── script.js           ← Animaciones e interacciones
└── README.md           ← Documentación
```

> ⚠️ NO se necesitan imágenes externas. Usar emojis gastronómicos como íconos visuales y gradientes CSS como fondos visuales para los cards de productos.

---

## 🖼️ SECCIONES OBLIGATORIAS (EN ORDEN)

### 1. NAVBAR STICKY

```
Contenido:
- Logo: Emoji 🍰 + Texto "El Empastelao" en Playfair Display
- Links: Menú | Especialidades | Sobre Nosotros | Contacto | Pedir Ahora
- Botón CTA: "Ver Menú 🍽️" — botón naranja con efecto glow

Comportamiento:
- Fondo inicial: transparente sobre el hero
- Al hacer scroll 80px: fondo rgba(255, 251, 244, 0.95) + blur(16px) + sombra cálida
- Transición suave 0.3s ease
```

---

### 2. HERO (100vh) — "La primera impresión que da hambre"

```
Layout: Texto izquierda (55%) | Visual derecha (45%)
Fondo: Gradiente radial de #FFF3E0 a #FFFBF4, con partículas de ingredientes flotando

TEXTO (columna izquierda):
- Etiqueta superior (badge verde):
  ✦ "Hecho con amor desde 2010"
- Título principal (H1 Playfair Display):
  "Donde cada bocado cuenta una historia"
- Tagline script (Dancing Script, naranja):
  "Sabor que abraza el alma"
- Descripción (Lato 400 19px):
  "Pastelería artesanal y cocina casera elaborada con ingredientes
   frescos cada mañana. Porque la buena comida no tiene atajos."
- CTA Principal:  [🛒 Haz tu pedido ahora] — botón naranja grande con glow pulsante
- CTA Secundario: [Ver nuestro menú →] — botón outline marrón

VISUAL (columna derecha):
- Gran emoji compuesto con CSS: una torta 🎂 con efectos de brillo y rotación lenta
- Orbes de color flotando: círculos semi-transparentes en naranja, dorado y verde
- Badges flotantes animados alrededor:
  · "⭐ 4.9/5" (badge ámbar, arriba derecha, animación float)
  · "🕐 Listo en 30 min" (badge verde, abajo izquierda, animación float con delay)
  · "🌿 100% Natural" (badge crema con borde verde, animación float con delay 2)

ANIMACIÓN DE ENTRADA (suave, relajante):
- El fondo aparece primero (fade 1s)
- El título entra desde abajo (translateY 40px → 0, fade, 0.8s, ease-out)
- El subtítulo entra con delay 0.2s
- La descripción entra con delay 0.4s
- Los botones entran con delay 0.6s (scale 0.9→1)
- El visual derecho entra desde la derecha con delay 0.3s
- Los badges flotantes aparecen con delay 1s, 1.3s, 1.6s
```

---

### 3. BARRA DE CONFIANZA (trust bar)

```
Fondo: var(--primary-500) degradado a var(--primary-600)
Texto blanco, disposición horizontal en desktop, vertical en mobile

Elementos con separadores "|":
🏠 Recetas de abuela  |  🌿 Ingredientes frescos  |  🚀 Entrega express  |  ❤️ +5.000 clientes felices

Animación: entrada con fade-in cuando entra al viewport (IntersectionObserver)
```

---

### 4. NUESTRAS ESPECIALIDADES (Flip Cards — 3x2 grid)

```
Título sección (H2): "Lo que nos hace únicos"
Subtítulo script:    "Nuestras especialidades"

FLIP CARDS — 6 productos (cada card: 320x400px desktop / 100% x 360px mobile):

Card 1: 🎂 TORTAS PERSONALIZADAS
  Frente: Fondo gradiente dorado (#FFF3E0→#FACA7A), emoji 🎂 grande (120px), título
  Reverso: Fondo var(--bg-tertiary), descripción "Diseñadas especialmente para ti...", tags: [Personalizable][Entrega incluida][24h]

Card 2: 🥐 CROISSANTS ARTESANALES
  Frente: Fondo gradiente ámbar suave (#FFFBF4→#FFF3E0), emoji 🥐 grande
  Reverso: Descripción hojaldre francés, tags: [Horneado diario][Sin conservantes][Receta francesa]

Card 3: 🍮 FLANES Y POSTRES
  Frente: Fondo gradiente crema (#FEF9EC→#FACA7A), emoji 🍮 grande
  Reverso: descripción postres tradicionales, tags: [Receta tradicional][Porciones generosas][Sin gluten disponible]

Card 4: 🥗 COMIDA DEL DÍA
  Frente: Fondo gradiente verde pálido (#EDF7E5→#FFF3E0), emoji 🥗 grande
  Reverso: Menú rotativo diario casero, tags: [Menú del día][Ingredientes frescos][Receta casera]

Card 5: ☕ BEBIDAS ARTESANALES
  Frente: Fondo gradiente marrón suave (#F5EBE0→#E8D5C4), emoji ☕ grande
  Reverso: Cafés de origen, bebidas calientes y frías, tags: [Café de origen][Batidos naturales][Sin azúcar disponible]

Card 6: 🎁 CAJAS DE REGALO
  Frente: Fondo gradiente naranja pálido (#FFF3E0→#FFE0B2), emoji 🎁 grande
  Reverso: Combinaciones premium para regalar, tags: [Envoltorio premium][Personalizable][Envío a domicilio]

ANIMACIÓN FLIP CARDS:
- Flip 3D en Y (rotateY 0→180deg) al hover en desktop
- Click/tap en mobile
- Transición: 0.7s cubic-bezier(0.4, 0, 0.2, 1)
- El frente y el reverso deben tener backface-visibility: hidden

ENTRADA AL VIEWPORT:
- Cards aparecen con stagger de 0.12s entre cada una
- Animación: translateY(30px) opacity(0) → translateY(0) opacity(1)
- Usar IntersectionObserver
```

---

### 5. SECCIÓN "HECHO CON AMOR" — Visual statement

```
Layout: Full-width, fondo var(--bg-secondary), padding 100px
Diseño: Dos columnas

Columna izquierda (texto):
- Badge: "🌿 Nuestra filosofía"  
- H2: "Del mercado a tu mesa, en el mismo día"
- Párrafo: "Cada mañana visitamos el mercado local para traerte los
  ingredientes más frescos. No guardamos nada para el día siguiente
  porque creemos que el sabor auténtico no se puede forzar."
- 3 puntos con ícono ✓ (verde):
  · Ingredientes locales y de temporada
  · Sin conservantes ni colorantes artificiales
  · Recetas heredadas con 40 años de historia
- Botón: [Conoce nuestra historia →] — outline naranja

Columna derecha (visual decorativo):
- Grid de 4 cards pequeños con emojis grandes:
  🧺 Mercado fresco  |  🫙 Sin conservantes
  👩‍🍳 Receta de abuela  |  ❤️ Con amor
- Cada card: fondo blanco con sombra cálida, border-radius 20px, hover lift

ANIMACIÓN:
- La columna de texto entra desde la izquierda (translateX -40px → 0)
- La columna visual entra desde la derecha (translateX 40px → 0)
- Activado por IntersectionObserver al 20% de visibilidad
```

---

### 6. ESTADÍSTICAS ANIMADAS (contador)

```
Fondo: Gradiente suave de var(--primary-500) a var(--primary-600)
Texto: Blanco puro

4 métricas en fila (grid 4 columnas desktop / 2x2 tablet / 1 columna mobile):

+10.000     → "Clientes felices"
+45         → "Recetas únicas"
13          → "Años de experiencia"
4.9 / 5     → "Calificación promedio"

ANIMACIÓN CONTADORES:
- Cuando entra al viewport (IntersectionObserver), los números cuentan desde 0
- Duración: 2000ms
- Función easing: easeOutQuart
- Los íconos encima de cada número tienen un efecto de scale 0.8→1 al aparecer
```

---

### 7. TESTIMONIOS

```
Título H2: "Lo que dicen nuestros clientes"
Subtítulo script: "Palabras que nos llenan el corazón"

3 cards en grid (desktop), 1 visible con navegación (mobile):

Testimonio 1:
  "Llevo 5 años pidiendo tortas aquí y cada vez me sorprenden más.
   La de mi cumpleaños este año fue simplemente perfecta."
  — María González · Cliente desde 2019 · ⭐⭐⭐⭐⭐

Testimonio 2:
  "Los croissants son los mejores que he probado fuera de Francia.
   Frescos, hojaldrados, perfectos. Los pido todos los domingos."
  — Carlos Ibáñez · Foodie local · ⭐⭐⭐⭐⭐

Testimonio 3:
  "El menú del día es una salvación. Casero, abundante y a buen precio.
   Mis compañeros de trabajo ya son fanáticos también."
  — Luciana Ospina · Cliente frecuente · ⭐⭐⭐⭐⭐

DISEÑO CARDS:
- Fondo: var(--bg-tertiary), borde 1px solid rgba(240,120,32,0.15)
- Comillas decorativas " " en color var(--amber-400), tamaño 80px, posición top-left
- Avatar: círculo con emoji de persona y borde naranja
- Hover: translateY -4px + sombra cálida
```

---

### 8. SECCIÓN DE PEDIDOS — CTA FINAL

```
Fondo: Gradiente radial desde var(--primary-500) en el centro hacia var(--amber-300) en los bordes
Texto: Blanco puro

Contenido:
- Badge blanco semi-transparente: "🚀 Pedidos online"
- H2 grande (60px): "¿Listo para darte un gusto?"
- Subtítulo: "Haz tu pedido antes de las 10 AM y lo tienes listo para el almuerzo"
- 2 botones:
  · [📱 Pedir por WhatsApp] — botón blanco con texto naranja
  · [🛒 Ver menú completo →] — botón outline blanco

Orbes decorativos de fondo: círculos semi-transparentes en movimiento lento
ANIMACIÓN: Sección completa hace fade-in-up al entrar al viewport
```

---

### 9. FOOTER

```
Fondo: var(--brown-dark) (#4A2010)
Texto: var(--text-muted) y blanco

Columnas:
1. Logo + descripción breve + redes sociales (íconos)
2. Menú: Especialidades | Menú del día | Tortas | Bebidas | Cajas regalo
3. Nosotros: Historia | Filosofía | Equipo | Blog
4. Contacto: Dirección | Teléfono | Horario | WhatsApp

Divider superior con gradiente naranja
Copyright: "© 2024 El Empastelao. Hecho con ❤️ y mucho azúcar."
```

---

## ✨ SISTEMA DE ANIMACIONES — GUÍA COMPLETA

### A. ANIMACIÓN DE CARGA DE PÁGINA (Suave y relajante)

```javascript
// Pantalla de carga breve (1.5 segundos)
// Fondo crema, logo animado pulsando, 3 puntos de carga en naranja
// Después: fade out suave de 0.5s

// Secuencia de entrada de elementos hero:
// t=0s:    Fondo y navbar (fade 0.5s)
// t=0.3s:  Badge superior hero (fade + slide from top)
// t=0.6s:  H1 principal (fade + translateY 40px → 0, 0.8s ease-out)
// t=0.85s: Tagline script (fade + translateY 20px → 0)
// t=1.0s:  Descripción (fade, 0.6s)
// t=1.2s:  Botones CTA (scale 0.9→1 + fade)
// t=0.8s:  Visual lado derecho (fade + translateX 50px → 0)
// t=1.4s:  Badges flotantes (scale 0→1 con elastic)
```

### B. ANIMACIONES EN BUCLE (Ambiente relajante)

```css
/* Flotación suave del visual hero */
@keyframes floatGentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(1deg); }
  66% { transform: translateY(-8px) rotate(-1deg); }
}
animation: floatGentle 8s ease-in-out infinite; /* lento y suave */

/* Badges flotantes alrededor del visual */
@keyframes floatBadge {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-10px) translateX(5px); }
}
/* Cada badge con delay diferente: 0s, 0.8s, 1.6s */

/* Orbes de fondo en el hero */
@keyframes driftOrb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -30px) scale(1.05); }
  50% { transform: translate(-15px, -20px) scale(0.95); }
  75% { transform: translate(10px, -40px) scale(1.02); }
}
animation: driftOrb 12s ease-in-out infinite;
/* Usar 3 orbes con delays 0s, 4s, 8s */

/* Pulsación del botón CTA principal */
@keyframes pulseWarm {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(240, 120, 32, 0.4),
                0 4px 20px rgba(240, 120, 32, 0.3);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(240, 120, 32, 0),
                0 8px 35px rgba(240, 120, 32, 0.5);
  }
}
animation: pulseWarm 2.5s ease-in-out infinite;

/* Rotación muy lenta del emoji de torta */
@keyframes rotateSlow {
  0% { transform: rotate(-2deg) scale(1); }
  50% { transform: rotate(2deg) scale(1.03); }
  100% { transform: rotate(-2deg) scale(1); }
}
animation: rotateSlow 6s ease-in-out infinite;
```

### C. SCROLL ANIMATIONS (IntersectionObserver)

```javascript
// Configuración del observer
const observerConfig = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

// Clases de animación a agregar al entrar:
// .reveal-up    → translateY(35px) opacity(0) → translateY(0) opacity(1) [0.65s ease-out]
// .reveal-left  → translateX(-35px) opacity(0) → translateX(0) opacity(1)
// .reveal-right → translateX(35px) opacity(0) → translateX(0) opacity(1)
// .reveal-scale → scale(0.92) opacity(0) → scale(1) opacity(1)

// Stagger en grids de cards: delay = index * 0.12s
// Efecto: los cards aparecen uno a uno de izquierda a derecha
```

### D. HOVER STATES (Interacciones agradables)

```css
/* Cards de especialidades */
.specialty-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 20px 40px rgba(240, 120, 32, 0.18);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); /* ligero rebote */
}

/* Botón primario */
.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.08) saturate(1.1);
  box-shadow: 0 10px 30px rgba(240, 120, 32, 0.45);
  transition: all 0.25s ease;
}

/* Links de navbar */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 2px;
  background: var(--primary-500);
  transition: width 0.3s ease;
}
.nav-link:hover::after { width: 100%; }

/* Testimonios cards */
.testimonial-card:hover {
  transform: translateY(-4px);
  border-color: rgba(240, 120, 32, 0.3);
  box-shadow: 0 15px 35px rgba(107, 58, 42, 0.12);
}
```

---

## 🔧 COMPONENTES CSS CLAVE

### Cards de Especialidades (Flip)

```css
.specialty-flip {
  perspective: 1200px;
  height: 400px; /* 320px mobile */
}

.specialty-inner {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.specialty-flip:hover .specialty-inner {
  transform: rotateY(180deg);
}

.specialty-front,
.specialty-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border-radius: 24px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 32px;
}

.specialty-front {
  background: var(--bg-tertiary);
  border: 1.5px solid rgba(240, 120, 32, 0.15);
  box-shadow: 0 4px 20px rgba(107, 58, 42, 0.08);
}

.specialty-back {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  border: 1.5px solid rgba(240, 120, 32, 0.3);
  box-shadow: 0 8px 30px rgba(107, 58, 42, 0.12);
  transform: rotateY(180deg);
}

.emoji-icon {
  font-size: 100px;
  line-height: 1;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 12px rgba(240, 120, 32, 0.3));
}

.feature-tag {
  display: inline-block;
  background: rgba(240, 120, 32, 0.1);
  color: var(--primary-600);
  border: 1px solid rgba(240, 120, 32, 0.2);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 12px; font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 3px;
}
```

### Navbar

```css
.navbar {
  position: fixed; top: 0; width: 100%;
  z-index: 1000;
  padding: 20px 0;
  background: transparent;
  transition: all 0.35s ease;
}

.navbar.scrolled {
  background: rgba(255, 251, 244, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(240, 120, 32, 0.12);
  box-shadow: 0 4px 20px rgba(107, 58, 42, 0.08);
  padding: 14px 0;
}
```

### Botón Principal CTA

```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-500), var(--amber-400));
  background-size: 200% 200%;
  animation: warmGradient 4s ease infinite, pulseWarm 2.5s ease-in-out infinite;
  color: white;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 17px;
  padding: 16px 36px;
  border: none; border-radius: 14px;
  cursor: pointer;
  letter-spacing: 0.02em;
}

@keyframes warmGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Partículas de fondo (ingredientes flotantes)

```javascript
// Crear partículas decorativas en el hero
const ingredients = ['🌿', '🍓', '🥚', '🧈', '🍫', '🍋', '🌸', '⭐', '✦'];
// 30 partículas máximo
// Posición aleatoria, tamaño 16-28px
// Opacidad 0.15 - 0.35 (muy sutiles, no distraen)
// Animación driftOrb con durations 15-25s, delays aleatorios
// En mobile: reducir a 12 partículas
```

---

## 📱 RESPONSIVE DESIGN

```css
/* Desktop XL (1440px+):  layout full, tipografía máxima */
/* Desktop (1024-1439px): ajustes menores de espaciado */
/* Tablet (768-1023px):   grid 2 columnas, hero stack */
/* Mobile (< 768px):      1 columna, menú hamburguesa */

/* Breakpoints críticos */
@media (max-width: 1023px) {
  .hero-layout { flex-direction: column; text-align: center; }
  .hero-visual { order: -1; margin-bottom: 40px; }
  h1 { font-size: 52px; }
  .specialties-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  h1 { font-size: 38px; }
  .specialties-grid { grid-template-columns: 1fr; }
  .specialty-flip { height: 320px; }
  /* Mobile: flip cards con click en lugar de hover */
  /* Agregar JS: toggle de clase .is-flipped al click */
  .nav-links { display: none; }
  .hamburger { display: flex; }
}
```

---

## ⚡ JAVASCRIPT — FUNCIONALIDADES REQUERIDAS

```javascript
// 1. LOADER DE PÁGINA
//    - Mostrar loader 1.5s → ocultar con fade-out 0.5s
//    - Iniciar animaciones de entrada del hero tras loader

// 2. NAVBAR SCROLL
//    - Detectar scroll > 80px → agregar clase .scrolled al navbar

// 3. FLIP CARDS EN MOBILE
//    - Click en .specialty-flip → toggle clase .is-flipped en .specialty-inner
//    - En CSS: .specialty-inner.is-flipped { transform: rotateY(180deg); }

// 4. INTERSECTION OBSERVER — REVEAL
//    - Observar elementos con clases .reveal-up, .reveal-left, .reveal-right, .reveal-scale
//    - Al intersectar: agregar clase .is-visible que activa la transición CSS
//    - Stagger para grids: delay calculado con el index del elemento

// 5. CONTADORES ANIMADOS
//    function animateCounter(element, target, duration = 2000) {
//      const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
//      // Usar requestAnimationFrame para suavidad
//    }
//    - Activar al entrar al viewport

// 6. MENÚ HAMBURGUESA (mobile)
//    - Click en hamburger → toggle .nav-open en el nav
//    - Animación: height 0 → auto, fade in de links

// 7. SMOOTH SCROLL
//    - Click en links de nav → scroll suave a la sección correspondiente
//    - Offset de 80px para compensar el navbar fijo

// 8. PARTÍCULAS DEL HERO
//    - Generar dinámicamente con JS
//    - Reducir en mobile para performance
```

---

## ✅ CHECKLIST FINAL — VERIFICAR ANTES DE ENTREGAR

**🎨 COLORES:**
- [ ] Ningún fondo es oscuro (negro, gris oscuro o similar)
- [ ] Fondos principales son crema/vainilla (#FFFBF4, #FFF3E0, #FEF9EC)
- [ ] Color de acción es naranja (#F07820 ± variantes)
- [ ] Textos usan marrones cálidos, nunca negro puro
- [ ] Verde fresco usado solo para badges naturales/frescura

**🎞️ ANIMACIONES:**
- [ ] Loader suave al inicio (1.5s, no molesto)
- [ ] Entrada del hero en secuencia escalonada (sensación relajante)
- [ ] Orbes de fondo en movimiento muy lento (8s+)
- [ ] Flotación del visual hero (8s ease-in-out)
- [ ] Flip cards funcionan en desktop (hover) y mobile (click)
- [ ] Scroll reveals suaves con stagger
- [ ] Contadores animados
- [ ] Botón CTA con pulso cálido
- [ ] Todas las animaciones con durations lentas (6-12s para loops)

**📐 ESTRUCTURA:**
- [ ] Navbar sticky con blur al scroll
- [ ] Hero 100vh con 2 columnas
- [ ] Trust bar naranja
- [ ] 6 flip cards de especialidades
- [ ] Sección "Hecho con amor"
- [ ] 4 contadores estadísticos
- [ ] 3 testimonios
- [ ] CTA final con gradiente
- [ ] Footer oscuro (marrón, no negro puro)

**📱 RESPONSIVE:**
- [ ] Funciona en mobile (375px+)
- [ ] Grid adapta columnas correctamente
- [ ] Menú hamburguesa funcional
- [ ] Tipografías escalan correctamente
- [ ] Partículas reducidas en mobile

**🧹 CÓDIGO:**
- [ ] Un solo archivo `index.html` con CSS en `<style>` y JS en `<script>` — O 3 archivos separados
- [ ] Fuentes de Google Fonts cargadas en el `<head>`
- [ ] Variables CSS centralizadas en `:root`
- [ ] Código comentado por secciones
- [ ] Sin dependencias externas (no jQuery, no frameworks)
- [ ] README.md con instrucciones de personalización

---

## 🏁 RESULTADO ESPERADO

Una landing page gastronómica **light y cálida** para El Empastelao que:

- Usa **colores naranja, dorado, crema y verde fresco** que activan el apetito
- Tiene animaciones **lentas y suaves** que hacen que el visitante se relaje
- Las flip cards muestran las **especialidades de forma interactiva y apetitosa**
- Los contadores y testimonios generan **confianza y credibilidad**
- El CTA es claro: **hacer el pedido ahora, por WhatsApp o menú web**
- El visitante, al entrar, debe sentir: *"Quiero comer eso YA"*

> ⚡ Crear los 3 archivos: `index.html`, `styles.css`, `script.js` y `README.md`
> ⚡ Usar solo tecnologías nativas: HTML5, CSS3 (custom properties, grid, flexbox, animations), JavaScript ES6+ vanilla
> ⚡ Sin imágenes externas — todo el visual con emojis grandes, gradientes CSS y efectos tipográficos

---
*Prompt generado y optimizado para Claude Haiku 4.5 · El Empastelao Landing Page v2.0*