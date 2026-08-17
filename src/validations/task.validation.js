const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(3).max(1000),
  status: z.string().trim().default("todo"),
  priority: z.string().trim().default("medium"),
  dueDate: z.coerce.date().optional(),
});

module.exports = {
  taskSchema: taskSchema,
};
