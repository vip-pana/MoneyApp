"use client";

import { Button } from "@/components/shadcnComponents/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/shadcnComponents/command";
import CustomButtonSubmit from "@/components/shadcnComponents/custom-button-submit";
import { DialogFooter } from "@/components/shadcnComponents/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcnComponents/form";
import { Input } from "@/components/shadcnComponents/input";
import { PasswordInput } from "@/components/shadcnComponents/password-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcnComponents/popover";
import { graphql } from "@/gql";
import { Currency } from "@/gql/graphql";
import { cn } from "@/lib/utils/utils";
import { SignUpValueDefinition } from "@/lib/definitions/typeDefinition";
import { formSignupValidation } from "@/lib/definitions/typeValidation";
import { UseSignupQuery } from "@/lib/definitions/useQueryDefinition";
import { currencyOptions, getEnumValue } from "@/lib/utils/enumUtils";
import { manageApiCallErrors } from "@/lib/utils/errorUtils";
import { useAccessTokenStore } from "@/lib/zustand/accessTokenStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sessionStorageEmail } from "@/lib/utils/queryUrlUtils";

const signupQueryDocument = graphql(`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      tokenResponse {
        accessToken
        refreshToken
      }
      errors {
        ...errorFields
      }
    }
  }
`);
const SignupDialogForm = () => {
  const { setHeaders } = useAccessTokenStore();
  const router = useRouter();

  const form = useForm<SignUpValueDefinition>({
    resolver: zodResolver(formSignupValidation),
  });

  const onSubmit = async () => {
    if (form.getValues("selectedCurrency") == undefined) {
      toast.error("Select the currency");
      return;
    }
    form.setValue("email", form.getValues("email").toLowerCase());
    const { data, isError, error } = await refetch();
    if (isError || data?.signup.errors) {
      manageApiCallErrors(error, data?.signup.errors);
    } else if (data?.signup.tokenResponse?.accessToken != null && data?.signup.tokenResponse.refreshToken != null) {
      setHeaders(data.signup.tokenResponse.accessToken);
      sessionStorage.setItem("refreshToken", data.signup.tokenResponse.refreshToken);
      sessionStorage.setItem(sessionStorageEmail, form.getValues("email"));
      router.push("/dashboard");
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["signup"],
    queryFn: () =>
      UseSignupQuery({
        email: form.getValues("email"),
        name: form.getValues("name"),
        surname: form.getValues("surname"),
        password: form.getValues("password"),
        selectedCurrency: form.getValues("selectedCurrency"),
      }),
    enabled: false,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First Name" {...field} value={field.value || ""} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="surname"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last Name" {...field} value={field.value || ""} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} value={field.value || ""} disabled={isLoading} />
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
                  autoComplete="password"
                  placeholder="Password"
                  {...field}
                  value={field.value || ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  autoComplete="confirm-password"
                  placeholder="Confirm password"
                  {...field}
                  value={field.value || ""}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="selectedCurrency"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className="w-full justify-between" disabled={isLoading}>
                      {field.value
                        ? currencyOptions.find((option) => option.value === field.value)?.label
                        : "Select a currency..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder={"Search a currency..."} />
                    <CommandEmpty>{"No currency found."}</CommandEmpty>
                    <CommandGroup>
                      {currencyOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={(currentValue) => {
                            form.setValue(
                              "selectedCurrency",
                              getEnumValue(currentValue.charAt(0).toUpperCase() + currentValue.slice(1), Currency)
                            );
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <CustomButtonSubmit title={"Signup"} isLoading={isLoading} />
        </DialogFooter>
      </form>
    </Form>
  );
};

export default SignupDialogForm;
