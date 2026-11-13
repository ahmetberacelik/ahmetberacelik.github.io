---
lang: "en"
projectSlug: "smart-campus"
title: "Smart Campus"
tagline: "Smart campus management system"
year: "2025"
meta: "Course project · Team of 4 · Team lead, backend, and database"
summary: "Smart Campus is a web application that brings a university's day-to-day work into one place: course enrollment and grades, attendance, the cafeteria, and campus events. We built it as a team of four for the term project of our Web and Mobile Programming course."
tags:
  - "Java"
  - "Spring Boot"
  - "React"
  - "TypeScript"
  - "Docker"
repos:
  - label: "Source (Backend)"
    url: "https://github.com/ahmetberacelik/smart-campus-backend"
  - label: "Source (Frontend)"
    url: "https://github.com/ahmetberacelik/smart-campus-frontend"
  - label: "Source (Database)"
    url: "https://github.com/ahmetberacelik/smart-campus-database"
facts:
  - label: "Type"
    value: "Course project · Team of 4"
  - label: "Role"
    value: "Team lead, backend, and database"
  - label: "Backend"
    value: "Java 17, Spring Boot 3.2"
  - label: "Database"
    value: "MySQL 8, JPA"
  - label: "Frontend"
    value: "React 18, TypeScript, Vite"
  - label: "Deployment"
    value: "Docker, DigitalOcean"
media: []
technicalDetailsTitle: "Technical details"
technicalDetails:
  - "Architecture: five Spring Boot services behind Spring Cloud Gateway (Java 17, Spring Boot 3.2), brought up together with Docker Compose."
  - "Security: Spring Security, JWT with refresh tokens, role-based access control, email verification, and password reset."
  - "Database: MySQL 8 with JPA; the schema is managed through versioned migration files."
  - "Attendance: distance is calculated with the Haversine formula; the allowed radius defaults to 15 meters and can be set per session. The QR code refreshes every 5 seconds, and the server rejects expired codes. Students whose absence passes 30% get a weekly warning."
  - "Enrollment: prerequisites are checked through the whole chain (including prerequisites of prerequisites)."
  - "Frontend: React 18, TypeScript, and Vite; Leaflet for maps, Recharts for charts."
  - "Files and email: DigitalOcean Spaces and SMTP."
order: 2
featured: true
---

## My contribution

- Led the team of four: broke the work into parts, assigned tasks, and made sure the parts fit together.
- Wrote nearly all of the backend: five separate services for authentication, academics, attendance, meals, and events, plus the API gateway in front of them.
- Designed the database: a versioned schema in 25 migration steps, seed data, and setup scripts.
- Packaged the system with Docker and deployed it on DigitalOcean.

## How it works

- Students, faculty, and administrators sign in with separate permissions; each sees only the screens for their own work.
- When a student enrolls in a course, the system checks capacity, prerequisites, and schedule conflicts on its own. Once grades are entered, it calculates the letter grade and GPA, and the transcript can be downloaded as a PDF.
- An instructor opens attendance with the classroom's location. When a student checks in from their phone, the system measures the distance and accepts only those close enough to the classroom. The second option is a QR code shown on the board that changes every few seconds.
- In the cafeteria, students reserve their meal ahead of time; the cost comes out of their wallet, or their scholarship allowance is used. The reservation's QR code is scanned at the entrance.
- When an event fills up, new sign-ups go to a waitlist; when someone cancels, the next person in line is registered automatically.
