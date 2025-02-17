import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();
app.use(express.json());



app.use(cors({
    origin: "http://localhost:5173"
}))
const  PORT = 8879;
const mongoURI = process.env.MONGO_URI || PORT

app.use("/auth" ,userRouter)

const startServer = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Database.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error while connecting to DB", error);
        process.exit(1); // Exit the process on a database connection failure
    }
};

startServer();
