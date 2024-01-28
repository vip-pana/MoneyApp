"use client";

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { LuEye, LuEyeOff, LuUnlock } from "react-icons/lu";
import CheckEmailForm from "./checkEmailForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginValidation } from "@/utils/definitions/typeValidation";
import { graphql } from "@/gql/generated";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useLoginQuery } from "@/utils/definitions/useQueryDefinition";
import { useRouter } from "next/navigation";
import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { sessionStorageEmail } from "@/utils/queryUrl";

const FormLogin = () => {
  const { emailExist, setEmailExist, setEmail } = useUserStore();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const router = useRouter();
  const toast = useToast();

  const form = useForm<LoginValueDefinition>({
    resolver: zodResolver(formLoginValidation),
  });
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
        email: getValues("email"),
        password: getValues("password"),
      }),
    enabled: false,
  });

  return (
    <>
      {emailExist ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={"20px"}>
            <FormControl>
              <InputGroup>
                <Input
                  placeholder="Email"
                  {...register("email")}
                  onChange={() => setEmailExist(false)}
                  disabled
                />
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
              <FormErrorHelperText children={errors.email?.message} />
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
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
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
      ) : (
        <CheckEmailForm setEmailLoginFormValue={setValue} />
      )}
    </>
  );
};

export default FormLogin;
