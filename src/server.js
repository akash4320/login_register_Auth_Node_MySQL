import "dotenv/config";

import app from "./app.js";
import { testDbConnection } from "./config/db.js";

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await testDbConnection();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error?.message || error);
    process.exit(1);
  }
}

startServer();
