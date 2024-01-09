import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { PasswordInput } from "./PasswordInput";

export const FormLogin = () => {
  const [email, setEmail] = useState<string>();
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState<string>();
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);

  const handleOnEnter = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ((e as React.MouseEvent<HTMLButtonElement>).button === 0) {
      setShowPasswordInput(true);
    } else {
      if (e as React.KeyboardEvent<HTMLInputElement>) {
        if ((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
          setShowPasswordInput(true);
        }
      }
    }
  };

  const previousInputValue = useRef<string>();
  useEffect(() => {
    previousInputValue.current = email;
  }, [email]);

  return (
    <>
      <VStack spacing={10}>
        <InputGroup>
          <Input
            placeholder="Mail"
            value={email || ""}
            type="email"
            onChange={handleInputEmail}
            onKeyDown={handleOnEnter}
            isRequired={true}
            focusBorderColor="black"
          />
          <InputRightElement>
            <IconButton
              aria-label="confirm email"
              variant={"ghost"}
              colorScheme="white"
              icon={<ArrowForwardIcon />}
              onClick={handleOnEnter}
            ></IconButton>
          </InputRightElement>
        </InputGroup>

        <Box display={showPasswordInput ? "block" : "none"}>
          <PasswordInput handleInputPassword={handleInputPassword} />
        </Box>

        <Button w={"100%"} variant={"ghost"} mb={-5}>
          Login
        </Button>
      </VStack>
    </>
  );
};
