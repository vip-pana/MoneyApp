import { z } from "zod";

// for convention all methods created in this file will have at the end of the name the phrase "Validation"
// here is the file where all validation will be created, all validation will pass through zod

export const formCheckEmailValidation = z.object({
  email: z
    .string()
    .min(1, "Email is empty, please insert email")
    .email("Email format is not valid"),
});

export const formLoginValidation = z.object({
  email: z
    .string()
    .min(1, "Email is empty, please insert email")
    .email("Email format is not valid"),
  password: z.string().min(1, "Password is empty, please insert password"),
});
