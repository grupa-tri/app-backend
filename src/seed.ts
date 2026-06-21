import "dotenv/config";
import { db } from "./db/index.js";
import { todos } from "./db/schema.js";

async function seed() {
  const existing = await db.select().from(todos).limit(1);
  if (existing.length > 0) {
    console.log("Seed skipped: todos already exist");
    process.exit(0);
  }

  await db.insert(todos).values([
    { title: "Setup PostgreSQL" },
    { title: "Implement REST API", completed: true },
    { title: "Build React frontend" },
  ]);

  console.log("Seed completed");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
