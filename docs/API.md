# API Documentation

## Overview

This document describes the API endpoints available in the Access Management System.

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Users

#### Get All Users

```
GET /users
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1",
      "username": "johndoe",
      "email": "john@example.com",
      "roles": ["user"],
      "createdAt": "2025-11-08T10:00:00.000Z",
      "updatedAt": "2025-11-08T10:00:00.000Z"
    }
  ]
}
```

#### Get User by ID

```
GET /users/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "username": "johndoe",
    "email": "john@example.com",
    "roles": ["user"],
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:00:00.000Z"
  }
}
```

#### Create User

```
POST /users
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "roles": ["user"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "username": "johndoe",
    "email": "john@example.com",
    "roles": ["user"],
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:00:00.000Z"
  }
}
```

#### Update User

```
PUT /users/:id
```

**Request Body:**
```json
{
  "username": "johndoe_updated",
  "email": "john.new@example.com",
  "roles": ["user", "admin"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "username": "johndoe_updated",
    "email": "john.new@example.com",
    "roles": ["user", "admin"],
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T11:00:00.000Z"
  }
}
```

#### Delete User

```
DELETE /users/:id
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

(To be implemented)

## Pagination

(To be implemented)

## Filtering and Sorting

(To be implemented)
