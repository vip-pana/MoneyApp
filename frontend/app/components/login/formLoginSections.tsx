"use client";

import CheckEmailForm from "./checkEmailForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginValidation } from "@/utils/definitions/typeValidation";
import { useUserStore } from "@/utils/zustand/userStore";
import LoginForm from "./loginForm";
import { LoginValueDefinition } from "../../../utils/definitions/typeDefinition";

const FormLoginSections = () => {
  const { emailExist } = useUserStore();

  const form = useForm<LoginValueDefinition>({
    resolver: zodResolver(formLoginValidation),
  });
  const { setValue } = form;

  return (
    <>
      {emailExist ? (
        <LoginForm form={form} />
      ) : (
        <CheckEmailForm setEmailLoginFormValue={setValue} />
      )}
    </>
  );
};

export default FormLoginSections;
