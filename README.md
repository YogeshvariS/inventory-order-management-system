# Inventory & Order Management System

A full-stack Inventory & Order Management System built using React, FastAPI, PostgreSQL, Docker, and Docker Compose.

## Features

### Product Management
- Create products
- View products
- Update products
- Delete products
- Unique SKU validation

### Customer Management
- Create customers
- View customers
- Delete customers
- Unique email validation

### Order Management
- Create orders
- View orders
- Delete orders
- Automatic stock reduction
- Inventory validation
- Automatic order total calculation
- Restore inventory on order deletion

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL

### DevOps
- Docker
- Docker Compose

---

## Project Structure

```bash
inventory-order-management-system/
│
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

## Run Locally

### Backend

```bash
cd backend
python -m uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## Run With Docker

```bash
docker compose up --build
```

---

## API Documentation

```bash
http://localhost:8000/docs
```

---

## Environment Variables

Create `.env` file:

```env
POSTGRES_DB=inventory_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## Future Improvements

- Authentication & Authorization
- Advanced dashboard analytics
- Order history filtering
- Pagination
- Search & sorting

## Live Demo

- Frontend: https://inventory-order-management-system-theta-one.vercel.app/
- Backend API: https://inventory-order-management-system-2vot.onrender.com
- API Documentation: https://inventory-order-management-system-2vot.onrender.com/docs
- Docker Hub: https://hub.docker.com/r/yogeshvari22/inventory-order-management-system-backend