"use client";

import { graphql } from "@/gql/generated";
import { useLoginQuery as UseLoginQuery } from "@/utils/definitions/useQueryDefinition";
import { sessionStorageEmail } from "@/utils/queryUrl";
import { useUserStore } from "@/utils/zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { LoginValueDefinition } from "../../../utils/definitions/typeDefinition";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import CustomButtonSubmit from "@/components/ui/custom-button-submit";
import { Unlock } from "lucide-react";

const LoginForm = ({ form }: { form: UseFormReturn<LoginValueDefinition, any> }) => {
  const router = useRouter();
  const { setEmailExist } = useUserStore();
  const { getValues } = form;

  const loginQueryDocument = graphql(`
    mutation login($input: LoginInput!) {
      login(input: $input) {
        string
        errors {
          ...errorFields
        }
      }
    }
  `);

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.login.errors) {
      manageApiCallErrors(error, data?.login.errors);
    } else if (data?.login.string) {
      sessionStorage.setItem("token", data.login.string);
      sessionStorage.setItem(sessionStorageEmail, getValues("email"));
      router.push("/dashboard");
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: () =>
      UseLoginQuery({
        email: getValues("email").toLowerCase(),
        password: getValues("password"),
      }),
    enabled: false,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-80">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Email" type="email" autoComplete="current-email" {...field} disabled />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => {
                      setEmailExist(false);
                    }}
                  >
                    <Unlock className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Edit email</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  autoComplete="current-password"
                  {...field}
                  value={field.value || ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButtonSubmit title={"Login"} isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default LoginForm;
