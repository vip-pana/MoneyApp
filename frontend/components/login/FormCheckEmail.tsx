"use client";

import { InputGroup, Input, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCheckEmailValidation } from "@/utils/typeValidation";

export const FormCheckEmail = () => {
  const form = useForm<FormCheckMailValues>({
    resolver: zodResolver(formCheckEmailValidation)
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormCheckMailValues) => {
    console.log("Form submitted", data); 
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputGroup>
          <Input
            placeholder="Email"
            type="email"
            focusBorderColor="black"
            {...register("email", {
              required: {
                value: true,
                message: "email is required.",
              },
            })}
          />
        </InputGroup>
        <Text color={"red"} fontSize={"small"}>
          {errors.email?.message}
        </Text>
        <Button w={"100%"} variant={"ghost"} mb={-5} type="submit">
          Login
        </Button>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};
