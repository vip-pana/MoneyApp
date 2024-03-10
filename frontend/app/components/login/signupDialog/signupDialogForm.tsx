"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import CustomButtonSubmit from "@/components/ui/custom-button-submit";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { graphql } from "@/gql/generated";
import { Currency } from "@/gql/generated/graphql";
import { cn } from "@/lib/utils";
import { SignUpValueDefinition } from "@/utils/definitions/typeDefinition";
import { formSignupValidation } from "@/utils/definitions/typeValidation";
import { useSignupQuery } from "@/utils/definitions/useQueryDefinition";
import { currencyOptions, getEnumValue } from "@/utils/enumUtils";
import { manageApiCallErrors } from "@/utils/errorUtils";
import { sessionStorageEmail } from "@/utils/queryUrl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export type DropDownValue = {
  label: string;
  value: string;
};
const SignupDialogForm = () => {
  const form = useForm<SignUpValueDefinition>({
    resolver: zodResolver(formSignupValidation),
  });

  const router = useRouter();

  const signupQueryDocument = graphql(`
    mutation signup($input: SignupInput!) {
      signup(input: $input) {
        string
        errors {
          ...errorFields
        }
      }
    }
  `);

  const onSubmit = async () => {
    form.setValue("email", form.getValues("email").toLowerCase());

    const { data, isError, error } = await refetch();
    if (isError || data?.signup?.errors) {
      manageApiCallErrors(error, data?.signup?.errors);
    } else if (data?.signup.string) {
      sessionStorage.setItem("token", data?.signup.string);
      sessionStorage.setItem(sessionStorageEmail, form.getValues("email"));
      router.push("/dashboard");
    }
  };

  const { refetch, isLoading } = useQuery({
    queryKey: ["signup"],
    queryFn: () => useSignupQuery(form.getValues()),
    enabled: false,
  });

  return (
    <>
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
                  <PasswordInput placeholder="Password" {...field} value={field.value || ""} disabled={isLoading} />
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
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className="w-full justify-between">
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
                                "currency",
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
    </>
  );
};

export default SignupDialogForm;
