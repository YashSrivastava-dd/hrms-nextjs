# HRMS Next.js Application

A modern HR Management System built with Next.js 15, React 19, and MongoDB.

## Features

- 🎨 **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- 🔐 **User Authentication**: Secure login system with MongoDB integration
- 🖼️ **Dynamic Content**: Auto-changing illustrations on the login page
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🚀 **Fast Performance**: Built with Next.js 15 and Turbopack

## Prerequisites

- Node.js 18+ 
- MongoDB running locally on port 27017
- Database name: `hrms-dev`

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hrms_nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running locally
   - Create a database named `hrms-dev`
   - The application will automatically connect to `mongodb://localhost:27017/hrms-dev`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## Database Setup

### MongoDB Connection
The application automatically connects to your local MongoDB instance:
- **Host**: localhost
- **Port**: 27017
- **Database**: hrms-dev

### User Model
The system includes a User model with the following fields:
- `employeeCode` (unique identifier)
- `email` (unique)
- `password`
- `firstName`, `lastName`
- `role` (admin, employee, manager)
- `isActive`
- `lastLogin`
- `createdAt`, `updatedAt`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/test-db` - Test database connection

## Project Structure

```
hrms_nextjs/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.js
│   │   └── test-db/
│   │       └── route.js
│   ├── components/
│   │   └── Login/
│   │       └── LoginPage.tsx
│   ├── assets/
│   │   ├── Image/
│   │   │   ├── loginavatar.jpg
│   │   │   ├── loginavatar2.jpg
│   │   │   └── loginavatar3.jpg
│   │   └── Icon/
│   │       └── ddHealthcare.png
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── mongodb.js
│   └── mongoose.js
├── models/
│   └── User.js
├── config/
│   └── database.js
├── public/
│   └── assets/
└── package.json
```

## Development

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **API**: Next.js API Routes
- **Build Tool**: Next.js 15 with Turbopack

## Testing the Database Connection

1. Start the development server
2. Visit `http://localhost:3000/api/test-db`
3. You should see a success message if MongoDB is connected

## Login Testing

Use the pre-filled employee code "495" or create a test user in your MongoDB database:

```javascript
// In MongoDB shell or Compass
use hrms-dev
db.users.insertOne({
  employeeCode: "495",
  email: "test@example.com",
  password: "password123",
  firstName: "John",
  lastName: "Doe",
  role: "employee",
  isActive: true
})
```

## Production Considerations

- Use environment variables for database credentials
- Implement proper password hashing (bcrypt)
- Add JWT or session-based authentication
- Set up proper CORS and security headers
- Use MongoDB Atlas for production database

## Support

For issues or questions, please check the project documentation or create an issue in the repository.
