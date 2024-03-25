import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormSetValue, useForm } from "react-hook-form";
import { graphql } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import { UseCheckEmailExistQuery } from "@/lib/definitions/useQueryDefinition";
import { useUserStore } from "@/lib/zustand/userStore";
import { toast } from "sonner";
import { Input } from "@/components/shadcnComponents/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcnComponents/form";
import CustomButtonSubmit from "@/components/shadcnComponents/custom-button-submit";
import { z } from "zod";
import { LoginInput } from "@/gql/graphql";

type CheckMailValueDefinition = {
  email: string;
};

export const formCheckEmailValidation = z.object({
  email: z.string().min(1, "Email is empty, please insert email").email("Email format is not valid"),
});

const checkEmailExistQueryDocument = graphql(`
  query userExistByEmail($email: String!) {
    userExistByEmail(email: $email)
  }
`);

const CheckEmailForm = ({ setEmailLoginFormValue }: { setEmailLoginFormValue: UseFormSetValue<LoginInput> }) => {
  const { setEmailExist } = useUserStore();

  const form = useForm<CheckMailValueDefinition>({
    resolver: zodResolver(formCheckEmailValidation),
  });

  const { refetch, isLoading } = useQuery({
    queryKey: ["checkEmailExist"],
    queryFn: () => UseCheckEmailExistQuery(form.getValues("email").toLowerCase()),
    enabled: false,
  });

  const onSubmit = async () => {
    const { data, isError, error } = await refetch();
    if (isError || data?.userExistByEmail === false) {
      toast.error(isError ? error?.message : "User not registered");
      setEmailExist(false);
    } else {
      setEmailLoginFormValue("email", form.getValues("email").toLowerCase());
      setEmailExist(true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-80"
                  {...field}
                  value={field.value || ""}
                  placeholder="Email"
                  type="email"
                  disabled={isLoading}
                />
              </FormControl>
              <div className="text-center">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="w-full mt-4">
          <CustomButtonSubmit isLoading={isLoading} title="Continue with Email" />
        </div>
      </form>
    </Form>
  );
};

export default CheckEmailForm;
