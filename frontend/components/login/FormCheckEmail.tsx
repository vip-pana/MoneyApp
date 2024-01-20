"use client";

import {
  InputGroup,
  Input,
  Text,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCheckEmailValidation } from "@/utils/definitions/typeValidation";
import { useCheckEmailExistQuery } from "@/utils/definitions/useQueryDefinition";
import { useQuery } from "react-query";

export const FormCheckEmail = () => {
  const form = useForm<CheckMailValueDefinition>({
    resolver: zodResolver(formCheckEmailValidation),
  });
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  const onSubmit = () => {
    refetch();
  };

  const { data, refetch } = useQuery({
    queryKey: "checkEmailExist",
    queryFn: () => useCheckEmailExistQuery(getValues("email")),
    enabled: false,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputGroup>
          <Input
            placeholder="Email"
            type="email"
            focusBorderColor="black"
            {...register("email")}
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
    </>
  );
};
