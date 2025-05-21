# 🎬 MovieApi

## Overview
MovieApi is a backend application that allows users to explore and manage movie entries. Users can register, log in, and perform CRUD operations on movies, as well as add and retrieve comments for each movie.

---

## API Endpoints

### User Routes
| Method | Endpoint          | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/users/register` | Register a new user          |
| POST   | `/users/login`    | Log in an existing user      |
| GET    | `/users/details`  | Get user's profile           |

---

### Movie Routes
| Method | Endpoint                       | Description                           |
|--------|--------------------------------|---------------------------------------|
| POST   | `/movies/addMovie`             | Add a new movie (Admin only)          |
| GET    | `/movies/getMovies`            | Retrieve all movies                   |
| GET    | `/movies/getMovie/:movieId`    | Get details of a specific movie       |
| PATCH  | `/movies/updateMovie/:movieId` | Update a specific movie (Admin only)  |
| DELETE | `/movies/deleteMovie/:movieId` | Delete a specific movie (Admin only)  |

---

### Comment Routes
| Method | Endpoint                      | Description                                |
|--------|-------------------------------|--------------------------------------------|
| PATCH  | `/movies/addComment/:movieId` | Add a comment to a movie (Logged-in users) |
| GET    | `/movies/getComments/:movieId`| Retrieve all comments for a movie          |

---

## Dummy Accounts for Testing

Use the following dummy accounts to test the application:

| Account Type | Email                  | Password      |
|--------------|------------------------|---------------|
| Admin User   | rdj@hollywood.com      | IronMan123!   |
| Regular User | scarlettj@hollywood.com| BlackWidow456!|

---

## Example Movies for Testing

Here are a few movie samples you can use:

- **Inception** (Director: Christopher Nolan)
- **The Avengers** (Director: Joss Whedon)
- **Titanic** (Director: James Cameron)
- **The Dark Knight** (Director: Christopher Nolan)
- **La La Land** (Director: Damien Chazelle)

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

