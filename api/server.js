import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import operationsRoutes from "./routes/operations.js";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import { handleLogout } from "./controllers/logout.js";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";

const app = express();

// Handle options credentials check and fetch cookies credentials requirement
app.use(credentials);

// Cross origin resource sharing
app.use(cors(corsOptions));

// Built-in middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Auth
app.use("/auth", authRoutes);

// Refresh
app.use("/refresh", refreshTokenRoutes);

// Logout
app.use("/logout", handleLogout);

// V Protect Routes V
app.use(verifyJWT);

// Users
app.use("/users", userRoutes);

// Operations
app.use("/operations", operationsRoutes);

app.listen(8800);
console.log("running");
