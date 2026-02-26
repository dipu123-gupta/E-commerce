import express from "express";
import productRoutes from "./router/productRoutes.js";
import { errorMiddleware } from "./middleware/error.js";
import user from "./router/userRouters.js";
import order from "./router/orderRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productRoutes);

app.use("/api/v1/auth", user);

app.use("api/v1", order);

app.use(errorMiddleware);
export default app;
