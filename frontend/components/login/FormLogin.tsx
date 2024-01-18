"use client";

import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { graphql } from "@/graphql";
import request from "graphql-request";
import { useQuery } from "@tanstack/react-query";

const usersQuery = graphql(/* GraphQL */ `
  query Query {
    users {
      name
      surname
    }
  }
`);

export const FormLogin = () => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => console.log(data));

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await request("http://localhost:5116/graphql", usersQuery);
      console.log(users);
    },
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <VStack spacing={10}>
          <InputGroup>
            <Input
              placeholder="Email"
              type="email"
              isRequired={true}
              focusBorderColor="black"
              {...register("email")}
            />
            <InputRightElement>
              <IconButton
                aria-label="Confirm email"
                variant={"ghost"}
                colorScheme="white"
                icon={<ArrowForwardIcon />}
                onClick={() => setIsInputVisible(true)}
              ></IconButton>
            </InputRightElement>
          </InputGroup>

          <InputGroup display={isInputVisible ? "block" : "none"}>
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

          <Button type="submit" w={"100%"} variant={"ghost"} mb={-5}>
            Login
          </Button>
        </VStack>
      </form>
