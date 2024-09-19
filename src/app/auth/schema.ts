import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const messageSchema = z.object({
  message: z.string().min(0,{ message: "Message cannot be empty" }),
});

export type MessageSchema = z.infer<typeof messageSchema>;
