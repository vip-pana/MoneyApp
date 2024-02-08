"use client";

import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { graphql } from "@/gql/generated";
import { useLoginQuery } from "@/utils/definitions/useQueryDefinition";
import { sessionStorageEmail } from "@/utils/queryUrl";
import { useUserStore } from "@/utils/zustand/userStore";
import {
  Stack,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { LuUnlock, LuEyeOff, LuEye } from "react-icons/lu";
import { LoginValueDefinition } from "../../../utils/definitions/typeDefinition";

const LoginForm = ({ form }: { form: UseFormReturn<LoginValueDefinition, any, undefined> }) => {
  const router = useRouter();
  const toast = useToast();

  const { setEmailExist } = useUserStore();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = form;

  const loginQueryDocument = graphql(`
    mutation login($user: UserInput!) {
      login(user: $user)
    }
  `);

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    } else if (data?.login) {
      sessionStorage.setItem("token", data.login);
      sessionStorage.setItem(sessionStorageEmail, getValues("email"));
      router.push("/dashboard");
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: () =>
      useLoginQuery({
        email: getValues("email").toLowerCase(),
        password: getValues("password"),
      }),
    enabled: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={"20px"}>
        <FormControl>
          <InputGroup>
            <Input placeholder="Email" {...register("email")} onChange={() => setEmailExist(false)} disabled />
            <InputRightElement>
              <IconButton
                aria-label={"unlock password"}
                icon={<LuUnlock />}
                variant={"ghost"}
                onClick={() => setEmailExist(false)}
                isLoading={isLoading}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorHelperText>{errors.email?.message}</FormErrorHelperText>
        </FormControl>
        <FormControl>
          <InputGroup>
            <Input
              placeholder="Password"
              {...register("password")}
              type={passwordVisible ? "text" : "password"}
              disabled={isLoading}
            />
            <InputRightElement>
              <IconButton
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                icon={passwordVisible ? <LuEyeOff /> : <LuEye />}
                variant={"ghost"}
                onClick={() => setPasswordVisible(!passwordVisible)}
                isLoading={isLoading}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" w={"100%"} mb={"-20px"} isLoading={isLoading}>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
