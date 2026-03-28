# Teacher Management System - Frontend Documentation

## 📌 Overview

This is the **React frontend** for the Teacher Management System, integrated with Laravel backend. The application provides user authentication, teacher profile management, and data visualization with a fully responsive design that works on all devices.

## 🚀 Features

### Core Features
- **User Authentication** (Register, Login, Logout)
- **Token-based Security** (JWT with Laravel Sanctum)
- **Teacher Profile Management** (Create, Update, View)
- **User Directory** (View all registered users)
- **Teacher Directory** (View all teachers with details)
- **Search & Filter** (Real-time search in tables)

### UI/UX Features
- **Fully Responsive** - Works on Mobile, Tablet, Desktop
- **Modern Design** - Gradient backgrounds, smooth shadows
- **Loading States** - Spinners during API calls
- **Toast Notifications** - Success/Error messages
- **Form Validation** - Real-time validation with feedback
- **Accessible** - Semantic HTML, keyboard navigation

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Library |
| React Router DOM | 6.22.0 | Client-side routing |
| Axios | 1.7.0 | HTTP client for API calls |
| React Hot Toast | 2.4.1 | Toast notifications |
| Tailwind CSS | 4.0.0 | Styling framework |
| Vite | 6.2.0 | Build tool |
| Laravel Vite Plugin | 1.2.0 | Laravel integration |

## 📁 Project Structure
```bash
resources/js/
│
├── app.jsx # Main entry point (Vite loads this)
├── index.css # Global styles & Tailwind directives
│
├── components/ # Reusable components
│ ├── Navbar.jsx # Navigation bar with responsive menu
│ ├── PrivateRoute.jsx # Protected route wrapper
│ └── LoadingSpinner.jsx # Loading indicator
│
├── pages/ # Page components
│ ├── Register.jsx # User registration form
│ ├── Login.jsx # User login form
│ ├── Dashboard.jsx # User profile + teacher form
│ ├── TeachersList.jsx # DataTable for teachers
│ └── UsersList.jsx # DataTable for all users
│
└── services/ # API services
└── api.js # Axios configuration & API calls

```


## 📱 Responsive Design

The application is fully responsive with breakpoints:

| Breakpoint | Screen Width | Layout Behavior |
|------------|--------------|-----------------|
| **Mobile** | < 640px | Single column, stacked cards, table horizontal scroll |
| **Tablet** | 640px - 1024px | 2 columns, normal text, compact spacing |
| **Desktop** | > 1024px | Full layout, all features visible |

### Responsive Features
- **Navbar**: Collapsible hamburger menu on mobile
- **Tables**: Horizontal scroll on mobile, full view on desktop
- **Forms**: Full width on mobile, centered on desktop
- **Cards**: Stack vertically on mobile, grid layout on desktop

## 🚀 Installation & Setup

### Prerequisites
- Node.js >= 18.0
- npm >= 10.0
- Laravel Backend running on port 8000

### Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Configuration
No additional configuration needed. The frontend automatically proxies API requests to Laravel backend.

## Step 3: Start Development Server

```bash
# Terminal 1 - Start Vite (React frontend)
npm run dev

# Terminal 2 - Start Laravel (Backend API)
php artisan serve
```
```bash
Step 4: Access Application
Open browser: http://localhost:8000

📡 API Integration
The frontend communicates with Laravel backend through these endpoints:

Public Endpoints (No Auth)
Method	Endpoint	Purpose
POST	/api/register	User registration
POST	/api/login	User login
Protected Endpoints (Requires Token)
Method	Endpoint	Purpose
GET	/api/user-profile	Get logged-in user
POST	/api/logout	Logout user
POST	/api/teacher-profile	Create/Update teacher
GET	/api/teacher-profile	Get my teacher data
GET	/api/teachers	Get all teachers
GET	/api/users	Get all users
```