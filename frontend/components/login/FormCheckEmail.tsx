"use client";

import { InputGroup, Input, Button, Text, InputRightElement, IconButton } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCheckEmailValidation } from "@/utils/definitions/typeValidation";
import { useQuery } from "react-query";
import request from "graphql-request";
import { fetchPath } from "@/utils/FetchPath";
import { getUsers } from "@/utils/definitions/queryDefinition";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const FormCheckEmail = () => {
  const form = useForm<FormCheckMailValues>({
    resolver: zodResolver(formCheckEmailValidation)
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormCheckMailValues) => {
    console.log("Form submitted", data); 
  };

  const CheckEmailExist = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await request(fetchPath, getUsers);
      console.log(users);
    },
  });

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
          <InputRightElement>
            <IconButton
              aria-label="confirm email"
              variant={"ghost"}
              colorScheme="white"
              type="submit"
              icon={<ArrowForwardIcon />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Text color={"red"} fontSize={"small"}>
          {errors.email?.message}
        </Text>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};
