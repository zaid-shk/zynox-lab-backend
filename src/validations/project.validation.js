const { z } = require("zod");

const projectSchema = z.object({
  title: z.string().toLowerCase().min(3).max(100).trim(),
  description: z.string().trim().max(500),
  status: z.string().trim().default("active"),
  color: z.string().trim().default("black"),
  fav: z.boolean().default(false),
});

module.exports = { projectSchema };
