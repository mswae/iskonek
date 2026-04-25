# ISKOnek

> **Status:** Early Development (Environment Scaffolding)

ISKOnek is a web-based platform designed to consolidate scholarship opportunities and automatically match Filipino students to funding based on their academic profile and eligibility.

Currently, the project is in the initial development phase, focusing on establishing a decoupled architecture between a React-based UI and a Python API.

## Tech Stack
* **Frontend:** Next.js (React 18/19), Tailwind CSS v4
* **Backend:** Django, Django REST Framework (DRF)
* **Database:** PostgreSQL (Planned)

## Repository Structure
The project uses a strict decoupled architecture. Both servers must be running simultaneously for the application to function.

``````text
iskonek/
├── backend/      # Django API server (Port 8000)
└── frontend/     # Next.js UI client (Port 3000)
``` 

## Getting Started (Local Development)

### Prerequisites
* [Node.js](https://nodejs.org/) (for the frontend)
* [Python 3.x](https://www.python.org/) (for the backend)

### 1. Setting up the Frontend
Navigate to the frontend directory, install the Node dependencies, and start the Next.js development server.

`````bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 2. Setting up the Backend
Open a new terminal window, navigate to the backend directory, create an isolated Python environment, and start the Django server.

**For Windows:**
````bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install django djangorestframework django-cors-headers
python manage.py runserver
```

**For Mac/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`.

> **Note:** Always ensure your virtual environment `(venv)` is activated before running backend commands.

## Current Development Goals
* [In Progress] Database modeling for Student Profiles and Scholarship criteria.
* [In Progress] Configuring CORS headers to allow `localhost:3000` to fetch data from `localhost:8000`.
* [Pending] Building out the core React component library.
* [Pending] Implementing the matching algorithm via Django views.

## Proponents
John Benedict P. Baladia, Althea Nicole S. Cestina, Arwen, Alezandra Hertz G. Fresnido, Kirsten Gail A. Querubin
```