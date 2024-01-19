import { z } from "zod";

 export const formCheckEmailValidation = z.object({
    email : z.string().min(1).email("Email format is not valid")
})