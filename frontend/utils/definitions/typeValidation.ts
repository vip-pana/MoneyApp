// for convention all methods created in this file will have at the end of the name the phrase "Validation"
// here is the file where all validation will be created, all validation will pass through zod

import { z } from "zod";

export const formCheckEmailValidation = z.object({
  email: z.string().min(1, "Email is empty, please insert email").email("Email format is not valid"),
});

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
    currency: z.string().min(1, "Select a currency"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must be exactly the same.",
    path: ["confirmPassword"],
  });

export const formAddTransactionModalValidation = z.object({
  amount: z.string().refine(
    (value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 0.01;
    },
    {
      message: "Amount must be at least 0.01",
    }
  ),
  operationType: z.string().min(1),
  currency: z.string().min(1, "Please select one currency"),
  selectedCategory: z.string().min(1, "Please select one category"),
  description: z.string().min(1, "Please insert a description"),
  date: z.coerce.date(),
});

export const formTransactionsSearchValidation = z.object({
  dateStart: z.coerce.date(),
  dateEnd: z.coerce.date(),
  category: z.string(),
  currency: z.string(),
});
