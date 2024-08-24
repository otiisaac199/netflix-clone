import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //it allows us to use req.body

app.use("/api/v1/auth", authRoutes);

// listen to request
app.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
  connectDB();
});
