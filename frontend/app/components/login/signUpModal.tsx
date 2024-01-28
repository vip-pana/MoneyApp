import { graphql } from "@/gql/generated";
import { formSignupValidation } from "@/utils/definitions/typeValidation";
import { useSignupQuery } from "@/utils/definitions/useQueryDefinition";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useUserStore } from "@/utils/zustand/userStore";
import { useRouter } from "next/navigation";
import { Currency } from "@/gql/generated/graphql";
import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";
import { sessionStorageEmail } from "@/utils/queryUrl";

const SignupModal = ({
  isOpen,
  onClose,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpValueDefinition>({
    resolver: zodResolver(formSignupValidation),
  });

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const { setEmail } = useUserStore();
  const router = useRouter();
  const toast = useToast();

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
      });
    }
    if (data?.signup) {
      sessionStorage.setItem("token", data.signup);
      sessionStorage.setItem(sessionStorageEmail, getValues("email"));
      router.push("/dashboard");
    }
  };

  const signupQueryDocument = graphql(`
    mutation signup($user: UserInput!, $currency: Currency!) {
      signup(user: $user, currency: $currency)
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["signup"],
    queryFn: () =>
      useSignupQuery({
        name: getValues("name"),
        surname: getValues("surname"),
        email: getValues("email"),
        password: getValues("password"),
        currency: getValues("currency"),
      }),
    enabled: false,
  });

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={5}>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    focusBorderColor="black"
                    {...register("name")}
                    disabled={isLoading}
                  />
                  <FormErrorHelperText children={errors.name?.message} />
                </FormControl>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    focusBorderColor="black"
                    {...register("surname")}
                    disabled={isLoading}
                  />
                  <FormErrorHelperText children={errors.surname?.message} />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="Mail"
                    type="mail"
                    focusBorderColor="black"
                    {...register("email")}
                    disabled={isLoading}
                  />
                  <FormErrorHelperText children={errors.email?.message} />
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
                  <FormErrorHelperText children={errors.password?.message} />
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
                  <FormErrorHelperText
                    children={errors.confirmPassword?.message}
                  />
                </FormControl>
                <FormControl>
                  <Select
                    placeholder="Currency"
                    {...register("currency")}
                    disabled={isLoading}
                  >
                    {(
                      Object.keys(Currency) as Array<keyof typeof Currency>
                    ).map((value) => (
                      <option key={value} value={value}>
                        {value.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                  <FormErrorHelperText children={errors.currency?.message} />
                </FormControl>
                <Button colorScheme="gray" type="submit" isLoading={isLoading}>
                  Sign Up
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignupModal;
