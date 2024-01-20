"use client";

import {
  InputGroup,
  Input,
  Text,
  InputRightElement,
  IconButton,
  useToast,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formCheckEmailValidation } from "@/utils/definitions/typeValidation";
import { useCheckEmailExistQuery } from "@/utils/definitions/useQueryDefinition";
import { useQuery } from "react-query";
import { useState } from "react";

export const FormLogin = () => {
  const toast = useToast();
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const form = useForm<CheckMailValueDefinition>({
    resolver: zodResolver(formCheckEmailValidation),
  });
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  const onSubmit = () => {};

  const handleCheckEmail = async () => {
    await refetch();
    if (data?.userExistByEmail == true) {
      setEmailExist(true);
    } else {
      addWarningToast("User not exist");
    }
  };

  const { data, refetch } = useQuery({
    queryKey: "checkEmailExist",
    queryFn: () => useCheckEmailExistQuery(getValues("email")),
    enabled: false,
  });

  const addWarningToast = (description: string) => {
    toast({ description: description, status: "error" });
  };

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
              type="button"
              onClick={handleCheckEmail}
              icon={<ArrowForwardIcon />}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Text color={"red"} fontSize={"small"}>
          {errors.email?.message}
        </Text>
        {emailExist ? (
          <>
            <InputGroup>
              <Input
                placeholder="Password"
                type={isPasswordVisible ? "text" : "password"}
                isRequired={true}
                focusBorderColor="black"
                {...register("password")}
              />
              <InputRightElement>
                <IconButton
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                  variant={"ghost"}
                  colorScheme="white"
                  icon={isPasswordVisible ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" w={"100%"} mb={-5}>
              Login
            </Button>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
};
