import { desc, eq } from "drizzle-orm";
import { Router } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { todos } from "../db/schema.js";

export const todosRouter = Router();

const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(500),
});

const updateTodoSchema = z
  .object({
    title: z.string().trim().min(1).max(500).optional(),
    completed: z.boolean().optional(),
  })
  .refine((data) => data.title !== undefined || data.completed !== undefined, {
    message: "At least one field must be provided",
  });

todosRouter.get("/", async (_req, res) => {
  const result = await db.select().from(todos).orderBy(desc(todos.createdAt));
  res.json(result);
});

todosRouter.post("/", async (req, res) => {
  const parsed = createTodoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const [todo] = await db
    .insert(todos)
    .values({ title: parsed.data.title })
    .returning();

  res.status(201).json(todo);
});

todosRouter.patch("/:id", async (req, res) => {
  const parsed = updateTodoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const [todo] = await db
    .update(todos)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(todos.id, req.params.id))
    .returning();

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.json(todo);
});

todosRouter.delete("/:id", async (req, res) => {
  const [todo] = await db
    .delete(todos)
    .where(eq(todos.id, req.params.id))
    .returning();

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  res.status(204).send();
});
