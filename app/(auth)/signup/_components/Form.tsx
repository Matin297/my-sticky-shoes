"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormPasswordField } from "@/components/FormPasswordTextField";
import { FormTextField } from "@/components/FormTextField";
import { LinkButton } from "@/components/LinkButton";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { getGetCurrentUserQueryKey, useSignup } from "@/services/generated/auth/auth";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address."),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enableNotifications } = usePushNotifications();

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useSignup();

  const handleFormSubmit = handleSubmit(data => {
    mutate(
      { data },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
          router.push("/");
          toast.success("Welcome back to My Sticky Shoes!");
          enableNotifications();
        },
      },
    );
  });

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h3">
        Create Account
      </Typography>

      <FormProvider {...methods}>
        <Stack spacing={4} component="form" onSubmit={handleFormSubmit} noValidate>
          <Stack spacing={2}>
            <FormTextField label="Name" name="name" disabled={isPending} />
            <FormTextField label="E-mail" type="email" name="email" disabled={isPending} />
            <FormPasswordField label="Password" name="password" disabled={isPending} />
            <FormPasswordField
              label="Confirm Password"
              name="confirmPassword"
              disabled={isPending}
            />
          </Stack>

          <Stack spacing={1}>
            <Button disabled={isPending} size="large" variant="contained" type="submit">
              Signup
            </Button>
            <Typography align="center" variant="subtitle2">
              Or
            </Typography>
            <LinkButton href="/login" size="large" variant="outlined">
              Login
            </LinkButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
