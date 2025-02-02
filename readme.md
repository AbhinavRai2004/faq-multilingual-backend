# FAQ API with Multi-language Support

---

This project provides an API to manage Frequently Asked Questions (FAQs) with multi-language support. The API allows users to create, retrieve, update, and delete FAQs. It also includes translations in different languages and uses caching for performance optimization. The admin panel enables easy management of FAQs.

---

## Features

- **Multi-language Translations**: Support for translations (e.g., Hindi, Bengali) using `googletrans`.
- **Caching**: Redis-based caching for fast responses.
- **REST API**: Endpoints to manage FAQs and support language selection.
- **Admin Panel**: User-friendly admin interface for FAQ management.

---

## API Endpoints

### 1. **Get All FAQs**

Fetch all FAQs, optionally filtered by language.

**Endpoint:** `GET /api/faqs/`

**Query Parameter:**

- `lang`: Specify the language for the FAQ content (e.g., `en`, `hi`, `bn`).

**Example Request:**

```bash
curl http://localhost:8000/api/faqs/?lang=hi
```

**Response:**

```
[
  {
    "question": "परिक्षण प्रश्न?",
    "answer": "परिक्षण उत्तर"
  },
  {
    "question": "Test FAQ",
    "answer": "Test Answer"
  }
]
```

### 2. **Create a New FAQ**

Create a new FAQ with optional translations for different languages.

**Endpoint:** `POST /api/faqs/`

**Example Request:**

```bash
curl http://localhost:8000/api/faqs/
```

**Request Body:**

```bash
{
  "question": "Test?",
  "answer": "Test!",
  "answer": ["hi","bn"]
}
```

### 3. **Update an Existing FAQ**

Update an existing FAQ.

**Endpoint:** `PUT /api/faqs/:id/`

**Example Request:**

```bash
curl http://localhost:8000/api/faqs/<id>/
```

**Request Body:**

```bash
{
  "question": "Updated Test?",
  "answer": "Test!",
  "answer": ["en"]
}
```

### 4. **Delete an Existing FAQ**

Delete an existing FAQ.

**Endpoint:** `DELETE /api/faqs/:id/`

**Example Request:**

```bash
curl http://localhost:8000/api/faqs/<id>/
```

**Example Request:**

```
curl -X DELETE http://localhost:5000/api/faqs/:id/
```

**Response**

```
{
  "message": "FAQ deleted"
}

```

---

## Installation

### Clone the Repository:

```bash
git clone <repository_url>
cd <repository_directory>
```

### Install Dependencies:

```bash
npm install
```

### Configure Environment Variables:

Create a `.env` file in the root directory and add the following variables:

```env
   PORT = 5000
   MONGO_URI = your_mongodb_connection_string
```

### Start the Development Server:

```bash
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Express.js**: Web framework for building REST APIs.
- **Mongoose**: MongoDB ODM for interacting with the database.
- **Google Translate API**: For multi-language translations.
- **Redis**: Caching translations to optimize API performance.
- **dotenv**: To manage environment variables.
- **axios**: For making HTTP requests to external APIs.
- **Jest**: For unit testing.

---

## Testing

To run unit tests for the project, use the following command:

```bash
npm test
```

Ensure that all tests are passing before submitting the project.

---
