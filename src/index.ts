import "dotenv/config";
import { createApp } from "./app.js";
import { runMigrations } from "./db/migrate.js";

const port = Number(process.env.PORT ?? 3000);

async function main() {
  await runMigrations();
  console.log("Migrations applied");

  const app = createApp();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error("Failed to start:", error);
  process.exit(1);
});
