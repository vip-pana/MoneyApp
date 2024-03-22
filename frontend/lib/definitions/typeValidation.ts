// for convention all methods created in this file will have at the end of the name the phrase "Validation"
// here is the file where all validation will be created, all validation will pass through zod

import { z } from "zod";

export const formLoginValidation = z.object({
  email: z.string().min(1, "Email is empty, please insert email").email("Email format is not valid"),
  password: z.string().min(1, "Password is empty, please insert password"),
});

export const formSignupValidation = z
  .object({
    name: z.string().min(2).max(30),
    surname: z.string().min(2).max(30),
    email: z.string().email({ message: "Please insert Mail" }),
    password: z
      .string()
      .min(8, { message: "Password must be a minimum of 8 characters" })
      .max(16)
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must be exactly the same.",
    path: ["confirmPassword"],
  });

export const formAddOrUpdateTransactionDialogValidation = z.object({
  amount: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().gte(0.01, "Amount must be at least 0.01")),
  currency: z.string().min(1, "Please select one currency"),
  description: z.string().min(1, "Please insert a description"),
});

export const formTransactionsSearchValidation = z.object({
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date(),
});
