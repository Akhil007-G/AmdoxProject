Job Listing Portal – Backend
📋 Project Overview

This is the backend for the Job Listing Portal project developed using Node.js, Express.js, and MongoDB Atlas.
It handles authentication, job posting, and application management.

This backend is designed to connect with a future frontend (React, Angular, or similar).

🏗️ Technologies Used
Category	Technology
Backend Framework	Node.js (Express.js)
Database	MongoDB Atlas
Authentication	JWT (jsonwebtoken)
Password Encryption	bcryptjs
File Upload (Planned)**	Multer
Development Utility	nodemon
Environment Variables	dotenv
API Testing	Postman
✅ Work Completed So Far

Backend Setup:

Created Express server (index.js)

Configured environment variables using .env

Connected MongoDB successfully

Setup nodemon for auto-reload during development

Models Created:

User → Handles jobseeker & employer registration

Job → Defines job post details

Application → Manages job applications and resume links

Routes Implemented:

POST /api/auth/register → Register new user

POST /api/auth/login → Login existing user (in progress — needs debugging)

Tested using Postman:

Register works successfully ✅

Login API needs verification ⚠️ (password or token issue)

⚙️ How to Run the Project Locally
1️⃣ Clone the repository
git clone https://github.com/Akhil007-G/AmdoxProject.git

2️⃣ Go into the backend folder
cd AmdoxProject/job-portal-backend

3️⃣ Install dependencies
npm install

4️⃣ Create .env file in the root folder and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

5️⃣ Start the server
npm run dev


Server will run on http://localhost:5000

🧪 API Testing (using Postman)
✅ Register (Working)

POST → http://localhost:5000/api/auth/register
Body (JSON):

{
  "name": "Rithik",
  "email": "rithik@gmail.com",
  "password": "123456",
  "role": "employer",
  "company": "TechCorp"
}

⚠️ Login (Needs Debug)

POST → http://localhost:5000/api/auth/login
Body (JSON):

{
  "email": "rithik@gmail.com",
  "password": "123456"
}


Expected: Should return a token
Current: Not responding correctly (needs debugging)

🚧 Pending Work (To Be Done)
Task	Description
🔹 Fix Login Route	Check bcrypt password comparison and JWT generation
🔹 Add Job APIs	Create, Update, Delete, View, Search jobs
🔹 Add Application APIs	Resume upload using Multer and apply logic
🔹 Backend Deployment	Host on Render or Railway
🔹 Integrate with Frontend	Connect backend APIs with frontend app
👨‍💻 Contributor Info

Backend Developer: Rithik (ECE Student)
Work Done: Backend setup, MongoDB connection, Authentication routes, Postman testing.

🧠 Notes for Team

Before running, make sure .env file has the correct MongoDB URI.

Login route may fail due to incorrect password comparison or missing JWT secret — needs review.

Job and Application routes to be implemented next.

🚀 Project Status: Backend Base Completed, Auth in Progress

✅ Once you create this file, add it to Git and push again:

git add README.md
git commit -m "Added README with backend progress and next steps"
git push -u origin main
