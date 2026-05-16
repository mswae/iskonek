# ISKOnek

A centralized web-based scholarship matching platform for Filipino students.

**Live Demo:** [https://iskonek-frontend.onrender.com/](https://iskonek-frontend.onrender.com/)

## Features

- **Scholarship Matching:** Filters scholarships against student profiles based on GWA, household income, and course requirements.
- **Application Tracker:** Built-in task management to track scholarship requirements, progress statuses (Not Started, In Progress, Completed), and urgency levels.
- **Bookmarking System:** Allows users to save and track specific scholarships of interest.
- **Secure Access:** Token-based authentication utilizing JWT.

## Tech Stack

| Layer    | Technologies                                      |
|----------|---------------------------------------------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS v4 |
| Backend  | Django 6.0, Django Rest Framework, Simple JWT     |
| Database | PostgreSQL                                        |

---

## 🚀 How to Run Locally

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/downloads/) (v3.10 or higher)
- [PostgreSQL](https://www.postgresql.org/download/)

---

### 1. Database Setup

1. Open pgAdmin or your Postgres CLI.
2. Create a new, empty database named exactly `iskonek`.

---

### 2. Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment and activate it:

```bash
# On Windows:
python -m venv venv
venv\Scripts\activate

# On Mac/Linux:
python3 -m venv venv
source venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Set up your environment variables:

1. Copy the `.env.example` file and rename it to `.env`.
2. Open `.env` and fill in your local PostgreSQL credentials (e.g., database password).

Run the database migrations to build the schemas (Profiles, Scholarships, Bookmarks, Tasks):

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

The backend API is now running at `http://localhost:8000`.

---

### 3. Frontend Setup

Open a **new, separate terminal** and navigate to the frontend folder:

```bash
cd frontend
```

Install the Node dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend is now running at `http://localhost:3000`.
