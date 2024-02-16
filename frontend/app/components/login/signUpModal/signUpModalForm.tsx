import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { graphql } from "@/gql/generated";
import { Currency } from "@/gql/generated/graphql";
import { SignUpValueDefinition } from "@/utils/definitions/typeDefinition";
import { formSignupValidation } from "@/utils/definitions/typeValidation";
import { useSignupQuery } from "@/utils/definitions/useQueryDefinition";
import { getEnumValue } from "@/utils/enumUtils";
import { sessionStorageEmail } from "@/utils/queryUrl";
import { Stack, FormControl, InputGroup, InputRightElement, Button, Input, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { toast } from "sonner";

const SignUpModalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpValueDefinition>({
    resolver: zodResolver(formSignupValidation),
  });

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      toast.error(error.name, {
        description: error.message,
      });
    }
    if (data?.signup) {
      sessionStorage.setItem("token", data.signup);
      sessionStorage.setItem(sessionStorageEmail, getValues("email").toLowerCase());
      router.push("/dashboard");
    }
  };

  const signupQueryDocument = graphql(`
    mutation signup($user: UserSignupInputTypeInput!) {
      signup(user: $user)
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["signup"],
    queryFn: () =>
      useSignupQuery({
        name: getValues("name"),
        surname: getValues("surname"),
        email: getValues("email").toLowerCase(),
        password: getValues("password"),
        currency: getEnumValue(getValues("currency"), Currency),
      }),
    enabled: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FormControl>
          <Input placeholder="First Name" focusBorderColor="black" {...register("name")} disabled={isLoading} />
          <FormErrorHelperText>{errors.name?.message}</FormErrorHelperText>
        </FormControl>
        <FormControl>
          <Input placeholder="Last Name" focusBorderColor="black" {...register("surname")} disabled={isLoading} />
          <FormErrorHelperText>{errors.surname?.message}</FormErrorHelperText>
        </FormControl>

        <FormControl>
          <Input placeholder="Mail" type="mail" focusBorderColor="black" {...register("email")} disabled={isLoading} />
          <FormErrorHelperText>{errors.email?.message}</FormErrorHelperText>
        </FormControl>

        <FormControl>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              disabled={isLoading}
            />
            <InputRightElement width="3rem">
              <Button
                h="1.75rem"
                size="sm"
                variant={"ghost"}
                colorScheme="white"
                onClick={() => setPasswordVisible(!passwordVisible)}
                disabled={isLoading}
              >
                {passwordVisible ? <LuEyeOff /> : <LuEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorHelperText>{errors.password?.message}</FormErrorHelperText>
        </FormControl>

        <FormControl>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              disabled={isLoading}
            />
            <InputRightElement width="3rem">
              <Button
                h="1.75rem"
                size="sm"
                variant={"ghost"}
                colorScheme="white"
                onClick={() => setPasswordVisible(!passwordVisible)}
                disabled={isLoading}
              >
                {passwordVisible ? <LuEyeOff /> : <LuEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorHelperText>{errors.confirmPassword?.message}</FormErrorHelperText>
        </FormControl>
        <FormControl>
          <Select placeholder="Currency" {...register("currency")} disabled={isLoading}>
            {(Object.keys(Currency) as Array<keyof typeof Currency>).map((value) => (
              <option key={value} value={value}>
                {value.toUpperCase()}
              </option>
            ))}
          </Select>
          <FormErrorHelperText>{errors.currency?.message}</FormErrorHelperText>
        </FormControl>
        <Button colorScheme="gray" type="submit" isLoading={isLoading}>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpModalForm;
