"use client";

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
} from "@chakra-ui/react";
import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const SignUpModal = (props: {
  onClose: () => void;
  isOpen: boolean;
  overlay: React.JSX.Element;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
}) => {
  const currency = ["eur", "usd"] as const;
  type Currency = (typeof currency)[number];
  const mappedCurrency: { [key in Currency]: string } = {
    eur: "EUR €",
    usd: "USD $",
  };
  const currencyStatusOption = Object.entries(mappedCurrency).map(
    ([value, label]) => (
      <option value={value} key={value}>
        {label}
      </option>
    )
  );

  const signUpSchema = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email({ message: "Please insert Mail" }),
      password: z
        .string()
        .min(8, { message: "Password must be a minimum of 8 characters" })
        .max(16),
      confirmPassword: z.string().min(8).max(16),
      currency: z.enum(currency, {
        errorMap: () => ({ message: "Please select a Currency" }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  type FormData = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={props.initialRef}
        finalFocusRef={props.finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        isCentered
      >
        {props.overlay}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <Stack spacing={5}>
                <FormControl>
                  <Input
                    // ref={props.initialRef}
                    placeholder="First Name"
                    focusBorderColor="black"
                    {...register("firstName")}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="Last Name"
                    focusBorderColor="black"
                    {...register("lastName")}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="Mail"
                    type="mail"
                    focusBorderColor="black"
                    {...register("email")}
                  />
                  {errors.email && (
                    <FormHelperText fontSize={10}>
                      {`${errors.email.message}`}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password")}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        variant={"ghost"}
                        colorScheme="white"
                        onClick={handleClickPassword}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <FormHelperText fontSize={10}>
                      {`${errors.password.message}`}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        variant={"ghost"}
                        colorScheme="white"
                        onClick={handleClickConfirmPassword}
                      >
                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.confirmPassword && (
                    <FormHelperText fontSize={10}>
                      {`${errors.confirmPassword.message}`}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <Select
                    placeholder="Currency"
                    focusBorderColor="black"
                    id="currency"
                    disabled={isSubmitting}
                    {...register("currency")}
                  >
                    {currencyStatusOption}
                  </Select>
                  {errors.currency && (
                    <FormHelperText fontSize={10}>
                      {`${errors.currency.message}`}
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  colorScheme="gray"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
              </Stack>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
