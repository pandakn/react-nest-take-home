import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const LoginFormSchema = RegisterFormSchema.omit({
  name: true,
});

export type IRegisterForm = z.infer<typeof RegisterFormSchema>;
export type ILoginForm = z.infer<typeof LoginFormSchema>;
