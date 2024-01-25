import { useState } from "react";
import CheckEmailForm from "./checkEmailForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formLoginValidation,
  formCheckEmailValidation,
} from "@/utils/definitions/typeValidation";
import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import { graphql } from "@/gql/generated";
import { useLoginQuery } from "@/utils/definitions/useQueryDefinition";
import { useRouter } from "next/navigation";

export const FormLogin = () => {
  const router = useRouter();

  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const checkMailForm = useForm<CheckMailValueDefinition>({
    resolver: zodResolver(formCheckEmailValidation),
  });
  const loginForm = useForm<LoginValueDefinition>({
    resolver: zodResolver(formLoginValidation),
  });
  const {
    register,
    handleSubmit,
    formState,
    setValue: setEmailLoginFormValue,
    getValues,
  } = loginForm;
  const { errors } = formState;

  const loginQueryDocument = graphql(`
    mutation login($user: UserInput!) {
      login(user: $user)
    }
  `);

  const onSubmit = async () => {
    await refetch();
    if (localStorage.getItem("token") != null) {
      router.replace("/");
    }
  };

  const { refetch } = useQuery({
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
                  isInvalid={errors.email?.message != null}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="confirm email"
                    variant={"ghost"}
                    colorScheme="white"
                    type="submit"
                    icon={<ArrowForwardIcon />}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  placeholder="Password"
                  {...register("password")}
                  type={isPasswordVisible ? "text" : "password"}
                  isInvalid={errors.password?.message != null}
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
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w={"100%"} mb={"-20px"}>
              Login
            </Button>
          </Stack>
        </form>
      ) : (
        <CheckEmailForm
          form={checkMailForm}
          setEmailExist={setEmailExist}
          setEmailLoginFormValue={setEmailLoginFormValue}
        />
      )}
    </>
  );
};
