# 🏫 School Management API

Node.js REST API built with **Express.js** and **MySQL** to add schools and list them sorted by proximity.

---

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── app.js                    ← Entry point
│   ├── config/
│   │   └── db.js                 ← MySQL connection pool
│   ├── controllers/
│   │   └── schoolController.js   ← Business logic
│   ├── middleware/
│   │   └── validate.js           ← Input validation
│   └── routes/
│       └── schoolRoutes.js       ← Route definitions
├── database.sql                  ← DB + table setup script
├── .env.example                  ← Environment variable template
├── package.json
└── README.md
```

---

## ⚙️ Setup Steps (VS Code)

### 1. Install MySQL
Download and install MySQL Community Server from https://dev.mysql.com/downloads/

### 2. Create the Database & Table
Open MySQL Workbench (or the MySQL CLI) and run:
```sql
-- Copy and paste the contents of database.sql
```
Or from terminal:
```bash
mysql -u root -p < database.sql
```

### 3. Clone / Open in VS Code
Open the `school-management-api` folder in VS Code.

### 4. Install Dependencies
Open the VS Code terminal (`Ctrl + \``) and run:
```bash
npm install
```

### 5. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env
```
Then open `.env` and fill in your MySQL credentials:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=school_management
DB_PORT=3306
```

### 6. Start the Server
```bash
# Production
npm start

# Development (auto-restarts on file save)
npm run dev
```

You should see:
```
✅  MySQL connected successfully
🚀  Server running at http://localhost:3000
```

---

## 📡 API Endpoints

### POST `/addSchool`
Adds a new school to the database.

**Request Body (JSON):**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Noida, UP",
  "latitude": 28.5706,
  "longitude": 77.3260
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 45, Noida, UP",
    "latitude": 28.5706,
    "longitude": 77.326
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": ["'name' is required and must be a non-empty string."]
}
```

---

### GET `/listSchools`
Returns all schools sorted by distance from the given coordinates.

**Query Parameters:**
| Param     | Type  | Required | Description       |
|-----------|-------|----------|-------------------|
| latitude  | float | ✅       | User's latitude   |
| longitude | float | ✅       | User's longitude  |

**Example Request:**
```
GET http://localhost:3000/listSchools?latitude=28.61&longitude=77.20
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "3 school(s) found.",
  "userLocation": { "latitude": 28.61, "longitude": 77.20 },
  "data": [
    {
      "id": 3,
      "name": "Kendriya Vidyalaya",
      "address": "Lodhi Road, New Delhi",
      "latitude": 28.5932,
      "longitude": 77.2212,
      "distance_km": 2.15
    },
    ...
  ]
}
```

---

## 🧪 Testing with Postman

1. Download Postman from https://www.postman.com/downloads/
2. Create a new Collection named **School Management API**
3. Add two requests:
   - **Add School** → POST → `http://localhost:3000/addSchool`  
     Body → raw → JSON → paste the sample body above
   - **List Schools** → GET → `http://localhost:3000/listSchools?latitude=28.61&longitude=77.20`
4. Click **Send** on each to test

---

## 🔢 Distance Calculation

Uses the **Haversine formula** to calculate the great-circle distance between two GPS coordinates. Results are in **kilometres**, rounded to 2 decimal places.

---

## 🛡️ Validation Rules

| Field     | Rules                                          |
|-----------|------------------------------------------------|
| name      | Required, non-empty string                     |
| address   | Required, non-empty string                     |
| latitude  | Required, number, range: -90 to 90             |
| longitude | Required, number, range: -180 to 180           |
