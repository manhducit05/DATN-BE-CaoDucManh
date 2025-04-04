const express = require("express");
const bodyParser = require("body-parser");
const {connectDB} = require("./config/connectDB");
const routes = require("./api/routes/index.route")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8081;

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
  transports: ['polling'], // Chỉ sử dụng long polling thay vì WebSocket
});
// Kết nối đến cơ sở dữ liệu
// database.connect()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.error("Database connection failed:", error);
//     process.exit(1); // Thoát nếu không kết nối được với DB
//   });

connectDB()

// Middleware
app.use(bodyParser.json());

app.use(cors({
}));
app.use(cookieParser());

routes(app);

// Định nghĩa các routes

// Khởi động server
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});