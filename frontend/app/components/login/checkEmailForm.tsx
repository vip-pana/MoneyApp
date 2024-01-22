import { useCheckEmailExistQuery } from "@/utils/definitions/useQueryDefinition";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn, UseFormSetValue } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

const CheckEmailForm = ({
  form,
  setEmailExist,
  setEmailLoginFormValue,
}: {
  form: UseFormReturn<CheckMailValueDefinition>;
  setEmailExist: Dispatch<SetStateAction<boolean>>;
  setEmailLoginFormValue: UseFormSetValue<LoginValueDefinition>;
}) => {
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;

  const onSubmit = () => {
    refetch();
  };

  const { refetch } = useQuery({
    queryKey: ["checkEmailExist"],
    queryFn: () =>
      useCheckEmailExistQuery(
        getValues("email"),
        setEmailExist,
        setEmailLoginFormValue
      ),
    enabled: false,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormErrorMessage> {errors.email?.message}</FormErrorMessage>
      </FormControl>
    </form>
  );
};

export default CheckEmailForm;
