import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1),
});

export const noteIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Note ID must be a valid number"),
});

export const updateNoteSchema = z
  .object({
    title: z.string().optional(),
    content: z.string().optional(),
  })
  .refine((data) => data.title || data.content, {
    message: "At least title or content must be provided",
  });
