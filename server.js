import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";  
import cors from "cors";      
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroutes.js";
import postRoutes from "./routes/postRoutes.js";  
import commentRoutes from './routes/commentroute.js';
import replyRoutes from "./routes/replyComment.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());  
app.use(cors());   

app.use(express.static(path.join(__dirname,'./frontend/build')));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);  
// Add comment routes
 
app.use('/api/v1/comments', commentRoutes);
// Use the reply routes
app.use('/api/v1/reply', replyRoutes);
app.use('*',function(req ,res){
  res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
});
// REST API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Twitter-like App</h1>");
});
 
 

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Port
const PORT = process.env.PORT || 5500;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
