import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";

export const PasswordInput = (props: {
  handleInputPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <InputGroup>
      <Input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        onChange={props.handleInputPassword}
        focusBorderColor="black"
      />
      <InputRightElement>
        <IconButton
          aria-label="confirm email"
          variant={"ghost"}
          colorScheme="white"
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
};
