import * as dotenv from "dotenv";
import connectToDatabase from "./config/database";
import app from "./app";


const PORT = process.env.PORT || 4000;

dotenv.config();

// Database connection

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT} 🚀`);
});

