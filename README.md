# Colette's Shop - Frontend

Colette's Shop es una tienda online donde los usuarios pueden completar su colección de brawlers comprando cajas aleatorias. Además, permite dejar reseñas, gestionar pedidos y utilizar un sistema de fidelización con gemas que pueden canjearse por descuentos.

Este repositorio contiene el código fuente del frontend de la aplicación, desarrollado con **Angular** y utilizando una arquitectura modular basada en características (*Feature-Based Architecture*).

## 🌐 Enlaces
- [Frontend](https://colette-shop.onrender.com/)
- [Backend](https://colette-shop-backend.onrender.com)

## 🚀 Tecnologías utilizadas
- **Angular** - Framework frontend
- **PrimeNG** - Librería de componentes UI
- **Tailwind CSS** - Framework CSS para diseño responsive
- **Chart.js** - Librería de visualización de datos
- **PostgreSQL** - Base de datos utilizada en el backend

## 📂 Estructura del proyecto
```plaintext
src/
├── app/                   # Lógica y funcionalidades principales
│   ├── core/              # Elementos transversales (enums, guards, interceptors, models, services)
│   ├── features/          # Módulos organizados por características
│   ├── shared/            # Componentes y servicios reutilizables
├── environments/          # Configuraciones de entorno
```

## ⚙️ Instalación y configuración
### 1️⃣ Requisitos previos
Asegúrate de tener instalados:
- Node.js (versión 16 o superior)
- Angular CLI (`npm install -g @angular/cli`)

### 2️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/colette-shop-frontend.git
cd colette-shop-frontend
```

### 3️⃣ Instalar dependencias
```bash
npm install
```

### 4️⃣ Configurar variables de entorno
En el archivo `src/environments/environment.ts`, ajusta las variables de entorno necesarias:
```typescript
export const environment = {
  baseUrl: 'https://colette-shop-backend.onrender.com/api'
};
```

### 5️⃣ Ejecutar en modo desarrollo
```bash
ng serve
```

Luego, abre http://localhost:4200 en el navegador.

## 📦 Despliegue
Para generar una versión lista para producción:
```bash
ng build --configuration=render
```

Los archivos generados estarán en la carpeta `dist/`, listos para ser servidos en un hosting.

## 🧑‍💻 Autores
- [Mario Perdiguero Barrera](https://github.com/MarioPB05)
- [David Pérez Fernández](https://github.com/david-perez-2357)
- [David Zamora Martínez](https://github.com/TicoticoSAFA)
