import { formCheckEmailValidation } from "@/utils/definitions/typeValidation";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuChevronRight } from "react-icons/lu";
import { UseFormSetValue, useForm } from "react-hook-form";
import { graphql } from "@/gql/generated";
import { useQuery } from "@tanstack/react-query";
import { useCheckEmailExistQuery } from "@/utils/definitions/useQueryDefinition";
import { useUserStore } from "@/utils/zustand/userStore";
import FormErrorHelperText from "@/app/ui/base/formErrorHelperText";

const CheckEmailForm = ({
  setEmailLoginFormValue,
}: {
  setEmailLoginFormValue: UseFormSetValue<LoginValueDefinition>;
}) => {
  const form = useForm<CheckMailValueDefinition>({
    resolver: zodResolver(formCheckEmailValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  const toast = useToast();
  const { setEmailExist } = useUserStore();

  const checkEmailExistQueryDocument = graphql(`
    query userExistByEmail($email: String!) {
      userExistByEmail(email: $email)
    }
  `);

  const { refetch, isLoading } = useQuery({
    queryKey: ["checkEmailExist"],
    queryFn: () =>
      useCheckEmailExistQuery(
        getValues("email"),
        setEmailExist,
        setEmailLoginFormValue
      ),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data } = await refetch();

    if (
      data?.userExistByEmail == false ||
      data?.userExistByEmail == undefined
    ) {
      toast({
        title: "User not exist.",
        description: "This email is not registered.",
        status: "error",
      });
    } else {
      setEmailLoginFormValue("email", getValues("email"));
      setEmailExist(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <InputGroup>
            <Input
              {...register("email")}
              placeholder="Email"
              isInvalid={errors.email?.message != null}
              disabled={isLoading}
            />
            <InputRightElement>
              <IconButton
                aria-label="confirm email"
                icon={<LuChevronRight />}
                variant={"ghost"}
                type="submit"
                isLoading={isLoading}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorHelperText children={errors.email?.message} />
        </FormControl>
        <Button type="submit" w={"100%"} mb={"-20px"} isLoading={isLoading}>
          Continue with Email
        </Button>
      </form>
    </>
  );
};

export default CheckEmailForm;
