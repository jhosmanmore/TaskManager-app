# TaskManager App 📝

Aplicación web para la gestión de tareas personales, desarrollada con **Angular**, **Node.js**, **Express** y **MongoDB**. Permite a los usuarios registrar cuentas, iniciar sesión de forma segura, y gestionar su lista de tareas (crear, leer, actualizar y eliminar) desde una interfaz intuitiva y responsiva.

## 🚀 Demo en Producción

🌐 **Frontend Angular (Vercel):** [https://task-manager-app-sigma-opal.vercel.app/](https://task-manager-app-sigma-opal.vercel.app/)  
🖥️ **Backend Node.js (Render)**

> **Nota:** En caso de lentitud inicial en la carga de la aplicación, es normal debido a los tiempos de arranque del backend en Render.

---

## 🧱 Tecnologías Utilizadas

### 🔹 Frontend
- Angular 18
- HTML5 + CSS
- Angular Routing y Guards
- JWT (Token basado en LocalStorage)
- Consumo de API RESTful

### 🔸 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS y Seguridad con JWT

---

## 🔐 Funcionalidades

- 🔐 Registro y login de usuarios
- ✅ Gestión completa de tareas (CRUD)
- 📌 Autenticación con tokens JWT
- 🔒 Rutas protegidas en frontend y backend
- 📱 Interfaz responsive y clara
- 🌐 Comunicación entre frontend y backend mediante HTTP y tokens

---

## 📂 Estructura del Repositorio

```bash
TaskManager-app/
│
├── Backend/               # API REST con Node.js y Express
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
├── Frontend/              # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/  # Servicios de API
│   │   │   ├── auth/      # Módulo de autenticación
│   │   │   ├── tasks/     # Módulo de tareas
│   │   └── environments/
│   └── angular.json
│
└──

```

## ✅ Autor
Desarrollado por [Jhosman Moreno](https://www.linkedin.com/in/jhosman-moreno/)
