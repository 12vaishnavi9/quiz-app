# quiz-app
It is a QUIZ APP that fetches questions from Backend and displays on the screen. After answering the questions, user i redirected to a payment page and after doing a successfull payment result is displayed. It gives score based on the 4 categories of leadership ie. Authoritative, Democratic, Facilitative and Situational. The data is fetched from the database and stored in teh database via backend endpoints.

Demo Link: https://drive.google.com/file/d/1ZxLopA0P9wnp502EW9Ub5S_mu0cuFe6h/view?usp=sharing

Frontend- ReactJS
Backend- Node.js, Express.js
Database- MongoDB
Payment- RazorPay
Authentication- JWT & Bcrypt

Get Started with it:-
1. Clone the Repository
2. npm i
3. Make env file and enter your credentials-
   Frontend: REACT_APP_API = http://localhost:'port of your backend server"
   Backend: MONGODB_URL = your db url, JWT_SECRET = enter keys randomly, KEY_ID = your razorpay's account id, KEY_SECRET = your razorpay's account secret id (test mode)
4. package.json(backend)-
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix ./client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
5. npm run dev
