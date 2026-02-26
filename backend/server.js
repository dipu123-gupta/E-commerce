import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 4000;

app.get("/api/v1/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

connectDB();

// Handle uncaught exceptions like if we have a syntax error in our code or if we are trying to access a variable that is not defined, then we will catch that error and log it to the console and then we will shut down the server gracefully
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.red);
  console.log("Shutting down the server due to Uncaught Exception ");
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
