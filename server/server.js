import { app, server } from "./socket/socket.js";
import express from "express";
import { connectDB } from "./db/connection1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();

app.use(
  cors({
    origin: ["https://chit-chat-app-frontend-ewsa.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
// check server on vercel
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false 
  })
})

// middlwares
import { errorMiddleware } from "./middlewares/error.middlware.js";
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`your server listening at port ${PORT}`);
});