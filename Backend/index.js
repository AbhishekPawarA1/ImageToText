import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

const __dirname = path.resolve(); // Fix __dirname

// Enable CORS (for frontend to backend communication)
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const PORT = 8879;
const mongoURI = process.env.MONGO_URI || PORT;

app.use("/auth", userRouter);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "Frontend", "dist")));

// Handle all unknown routes by serving index.html (for React/Vue)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

// Start Server
const startServer = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Database.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error while connecting to DB", error);
    process.exit(1);
  }
};

startServer();
