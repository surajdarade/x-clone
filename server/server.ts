import * as dotenv from "dotenv";
import connectToDatabase from "./config/database";
import app from "./app";
import cors from "cors";

// CORS POLICY
app.use(
    cors({
      origin: "https://x-clone-surajdarade.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });

const PORT = process.env.PORT || 4000;

dotenv.config();

// Database connection

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT} 🚀`);
});
