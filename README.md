# Student Portal API

A first Express.js app — pure JSON API, no frontend. Deployable locally or on Vercel.

## Folder structure
```
student-portal-api/
├── api/
│   └── index.js          # Vercel serverless entry (exports the app)
├── controllers/
│   └── studentsController.js
├── middleware/
│   ├── logger.js          # custom request logger
│   └── notFound.js        # custom 404 handler
├── routes/
│   └── students.js
├── app.js                 # Express app (routes/middleware wired up)
├── server.js              # local dev entry (app.listen)
├── vercel.json
└── package.json
```

## Run locally
```bash
npm install
npm start
```
Server runs at http://localhost:3000

## Routes
| Method | Route                              | Description                     |
|--------|-------------------------------------|----------------------------------|
| GET    | `/`                                 | Welcome + endpoint list          |
| GET    | `/api/health`                       | Health check                     |
| GET    | `/api/students`                     | All students                     |
| GET    | `/api/students?department=X`        | Filter by department (query)     |
| GET    | `/api/students?semester=6`          | Filter by semester (query)       |
| GET    | `/api/students/:id`                 | Single student (route param)     |
| POST   | `/api/students`                     | Create student (JSON body)       |
| PUT    | `/api/students/:id`                 | Update student                   |
| DELETE | `/api/students/:id`                 | Delete student                   |


