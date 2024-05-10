import cors from "cors";
import * as dotenv from "dotenv";
import connectToDatabase from "./config/database";
import app from "./app";

dotenv.config();

// Database connection
connectToDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT} 🚀`);
});
