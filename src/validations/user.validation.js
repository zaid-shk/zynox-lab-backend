const { z } = require("zod");

const userSchema = z.object({
  username: z.string().toLowerCase().min(3).max(20).trim(),
  name: z.string().trim().min(3, "Name must be at least 3 characters long"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters long"),
});

module.exports = { userSchema };
