"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CardWrapper from "@/components/shared/card-wrapper";
import { resetFormSchema, resetTypeSchemaType } from "@/schema/form-schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ResetPassword } from "@/app/action/reset";

interface ResetFormProps {}

const ResetForm: FC<ResetFormProps> = ({}) => {
  const [isPending, setIsPending] = useTransition();

  const form = useForm<resetTypeSchemaType>({
    resolver: zodResolver(resetFormSchema),
  });

  const onSubmit = (values: resetTypeSchemaType) => {
    try {
      setIsPending(async () => {
        await ResetPassword(values)?.then((data) => {
          if (data?.success) {
            return toast.success(data?.success);
          }
          return toast.error(data?.error);
        });
      });
    } catch (error) {
      return toast?.error("something went wrong!");
    }
  };

  return (
    <CardWrapper
      Heading="Reset password"
      description="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full" type="submit">
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
