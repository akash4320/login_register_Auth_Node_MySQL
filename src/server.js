import "dotenv/config";

import app from "./app.js";
import { testDbConnection } from "./config/db.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await testDbConnection();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed");
    process.exit(1);
  }
}

startServer();