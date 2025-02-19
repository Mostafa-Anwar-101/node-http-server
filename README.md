# Node.js HTTP Server 🚀

This project is a simple HTTP server built with Node.js. It serves static files, handles employee data, and allows downloading images.

## Features 🌟
- ✅ Serve static HTML, CSS, and images.
- ✅ List employees from a JSON file.
- ✅ Add new employees via POST request.
- ✅ Stream files for efficient reading and writing.
- ✅ Serve a 404 page for unknown routes.
- ✅ Provide an image download functionality.

## Endpoints 🌍
### Home Page 🏠
- **`GET /`** → Lists employees in a table.

### Static Files 📂
- **`GET /style.css`** → Serves the CSS file.
- **`GET /astronomy`** → Displays astronomy content.
- **`GET /serbal`** → Displays serbal content.

### Employee Management 👨‍💼👩‍💼
- **`POST /employee`** → Adds an employee.
  - Request Body (JSON):
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com",
      "salary": 60000,
      "level": "Senior",
      "years": 5
    }
    ```
- **`GET /employee`** → Not implemented (view employees in `/`).

### Image Download 📸
- **`GET /astronomy/download`** → Downloads the astronomy image.

### Error Handling ❌
- **404 Page Not Found** for unknown routes.

## Technologies Used 🖥️
- **Node.js**
- **HTTP Module**
- **fs (File System) Module**
- **Streams for File Handling**
