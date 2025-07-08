#One-on-One Chat Application (Express + Socket.IO + MongoDB)
This is a basic real-time one-on-one chat application using **Express.js** for REST APIs and **Socket.IO** for WebSocket-based communication. Users can register, log in, and exchange private messages instantly.

##Features

- User signup and login
- Real-time messaging using WebSocket (`/ws`)
- Private one-on-one chat
- Modular folder structure for scalability

1. Clone the repo
2. Install dependencies: npm install
3. Create a .env file: PORT=3001, your mongoDB_URI, JWT_SECRET
4. npm rund dev to start the socket and server.
