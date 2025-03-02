import express from "express";
import { config } from "dotenv";
import { limiter } from "./middlewares/rateLimit";
import { router } from "./routes/routes";

config(); // dotenv

const app = express();
const PORT = process.env.PORT ?? 3001;

// Middleware to set cache headers
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=43200");
  next();
});

// Rate limiter
app.use(limiter);

// Router
app.use("/", router);

app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
