import { z } from "zod";

 export const formCheckEmailValidation = z.object({
    email : z.string().nonempty("Email is required").email("Email format is not valid")
})