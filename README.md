# Teacher Management System - Backend API

## 📌 Project Overview

A RESTful API built with Laravel for managing teachers and their profiles. This system provides authentication, token-based security, and CRUD operations for teacher management with a one-to-one relationship between users and teachers.

## 🚀 Features

- **User Authentication** (Register, Login, Logout)
- **Token-based API Security** (Laravel Sanctum)
- **One-to-One Relationship** between Users and Teachers
- **Teacher Profile Management** (Create/Update/View)
- **List All Teachers** with their associated user data
- **MySQL Database** with proper foreign key constraints

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Laravel | 10.x | PHP Framework |
| MySQL | 8.0+ | Database |
| Laravel Sanctum | Latest | API Authentication |
| PHP | 8.1+ | Programming Language |

## 📊 Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| email | VARCHAR(255) | Unique, User Login |
| first_name | VARCHAR(255) | User's First Name |
| last_name | VARCHAR(255) | User's Last Name |
| password | VARCHAR(255) | Hashed Password |

### Teachers Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary Key |
| user_id | BIGINT | Foreign Key (users.id) |
| university_name | VARCHAR(255) | Teacher's University |
| gender | ENUM | male/female/other |
| year_joined | YEAR | Joining Year |

### Relationships
- **One-to-One**: Each User has exactly one Teacher profile
- **Foreign Key**: `teachers.user_id` references `users.id` with cascade delete

## 📡 API Endpoints

### Public Routes (No Authentication Required)

#### Register User
```http
POST /api/register 
```

## Request Body:

```http
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```
## Response:
```http
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com"
        },
        "token": "1|abc123def456...",
        "token_type": "Bearer"
    }
}
```
## Login User
```http
POST /api/login
```
## Request Body:
```http
{
    "email": "john@example.com",
    "password": "password123"
}
```
## Response:
```http
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com"
        },
        "token": "1|newtoken123...",
        "token_type": "Bearer"
    }
}
```

## Protected Routes (Authentication Required)
```http

Note: Add Authorization: Bearer {token} header to all protected routes

Get User Profile
```http
GET /api/user-profile
```
## Response:
```http

json
{
    "success": true,
    "data": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "teacher": {
            "id": 1,
            "university_name": "Harvard University",
            "gender": "male",
            "year_joined": 2020
        }
    }
}

```
## Create/Update Teacher Profile
```http
POST /api/teacher-profile
```
## Request Body:

```http
json
{
    "university_name": "Harvard University",
    "gender": "male",
    "year_joined": 2020
}

```
## Response:
```http
json
{
    "success": true,
    "message": "Teacher profile saved successfully",
    "data": {
        "id": 1,
        "user_id": 1,
        "university_name": "Harvard University",
        "gender": "male",
        "year_joined": 2020
    }
}
```

## Get My Teacher Profile
```http
GET /api/teacher-profile
```
## Response:
```http
json
{
    "success": true,
    "data": {
        "id": 1,
        "user_id": 1,
        "university_name": "Harvard University",
        "gender": "male",
        "year_joined": 2020
    }
}
```

## Get All Teachers
```http
GET /api/teachers

```
## Response:
```http
json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "university_name": "Harvard University",
            "gender": "male",
            "year_joined": 2020,
            "user": {
                "id": 1,
                "first_name": "John",
                "last_name": "Doe",
                "email": "john@example.com"
            }
        }
    ]
}
```
## Logout
```http
POST /api/logout
```
## Response:
```http
json
{
    "success": true,
    "message": "Logged out successfully"
}
```
# 📁 Project Structure

```text
teacher-management-system/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php          # Authentication logic
│   │   │   └── TeacherController.php       # Teacher management logic
│   │   └── Kernel.php                      # HTTP middleware config
│   └── Models/
│       ├── User.php                         # User model with Sanctum trait
│       └── Teacher.php                      # Teacher model with relationships
│
├── database/
│   ├── migrations/
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2024_xx_xx_xxxxxx_create_teachers_table.php
│   │   └── 2019_12_14_000001_create_personal_access_tokens_table.php
│   └── teacher_management.sql               # Database export file
│
├── routes/
│   └── api.php                               # All API route definitions
│
├── .env.example                              # Environment configuration template
├── .gitignore                                # Git ignore rules
├── composer.json                             # PHP dependencies
├── artisan                                   # Laravel CLI tool
└── README.md                                 # Project documentation

```

# 🚀 Installation & Setup Guide

```text
Prerequisites
PHP >= 8.1

Composer

MySQL >= 8.0

Git

```

## Step 1: Clone Repository
```bash
git clone https://github.com/your-username/teacher-management-system.git


cd teacher-management-system

```
## Step 2: Install Dependencies
```bash
composer install
```
## Step 3: Environment Configuration
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
## Step 4: Configure Database
Open .env file and update database credentials:
```data
env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=teacher_management
DB_USERNAME=root
DB_PASSWORD=

```

## Step 5: Import Database
Option A: Using MySQL command

```bash
mysql -u root -p teacher_management < database/teacher_management.sql
Option B: Using phpMyAdmin

Create database named teacher_management

Import database/teacher_management.sql file
```
## Step 6: Run Migrations (Alternative to import)
```bash
php artisan migrate
Step 7: Start Development Server
bash
php artisan serve
The API will be available at: http://localhost:8000
```

## 🧪 Testing the API
```bash
Using Postman
Import the collection (if available)

Set base URL: http://localhost:8000/api

Test endpoints in sequence:

Register a user

Login to get token

Use token in Authorization header for protected routes

Using cURL
Register:

bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john@example.com","password":"password123","password_confirmation":"password123"}'
Login:

bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
Get All Teachers (Protected):

bash
curl -X GET http://localhost:8000/api/teachers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
🔒 Security Features
Password Hashing: Using Laravel's bcrypt hashing

Token-based Authentication: Sanctum tokens with expiration

SQL Injection Prevention: Eloquent ORM with parameter binding

XSS Protection: Automatic output escaping

CSRF Protection: Token-based for API (optional)

📦 Dependencies
```html
json
{
    "php": "^8.1",
    "laravel/framework": "^10.0",
    "laravel/sanctum": "^3.0"
}
```
## 🤝 Contributing
```html
Fork the repository

Create feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open Pull Request
```

## 📝 License
This project is open-source and available under the MIT License.

📧 Contact
For any queries or support, please create an issue in the repository.

Made with ❤️ using Laravel

text

---

## **Step 4: Create .env.example File**

### 📌 **What we're doing:**
`.env.example` file create kar rahe hain jo environment variables ka template provide karegi. Sensitive data ke bina.

### 📝 **File Location:** `teacher-management-system/.env.example`

```env
APP_NAME="Teacher Management System"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=teacher_management
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8000
SESSION_DOMAIN=localhost
