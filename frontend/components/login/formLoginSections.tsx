"use client";

import CheckEmailForm from "./checkEmailForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginValidation } from "@/lib/definitions/typeValidation";
import { useUserStore } from "@/lib/zustand/userStore";
import LoginForm from "./loginForm";
import { LoginInput } from "@/gql/graphql";

const FormLoginSections = () => {
  const { emailExist } = useUserStore();

  const form = useForm<LoginInput>({
    resolver: zodResolver(formLoginValidation),
  });

  return <>{emailExist ? <LoginForm form={form} /> : <CheckEmailForm setEmailLoginFormValue={form.setValue} />}</>;
};

export default FormLoginSections;
