import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initDB } from "../db.js";

const PORT = process.env.PORT || 4000;

async function startServer() {
  await initDB(); // <-- schema creation happens here
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
