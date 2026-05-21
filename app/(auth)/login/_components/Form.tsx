"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormPasswordField } from "@/components/FormPasswordTextField";
import { FormTextField } from "@/components/FormTextField";
import { LinkButton } from "@/components/LinkButton";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { type LoginMutationError, useLogin } from "@/services/generated/auth/auth";
import { getGetCurrentUserQueryKey } from "@/services/generated/profile/profile";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().trim().min(1, "Password is required!"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enableNotifications } = usePushNotifications();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const { handleSubmit } = methods;

  const { mutate, isPending } = useLogin();

  const handleFormSubmit = handleSubmit(data => {
    mutate(
      { data },
      {
        onSuccess() {
          enableNotifications();
          queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
          router.push("/");
          toast.success("Welcome back to My Sticky Shoes!");
        },
        onError: (error: LoginMutationError) => {
          if (isAxiosError<LoginMutationError>(error)) {
            toast.error(error.response?.data?.error || "Failed to login.");
          } else {
            toast.error("An unexpected error occurred");
          }
        },
      },
    );
  });

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h3">
        Welcome Back
      </Typography>

      <FormProvider {...methods}>
        <Stack spacing={4} component="form" onSubmit={handleFormSubmit} noValidate>
          <Stack spacing={2}>
            <FormTextField name="email" label="E-mail" type="email" disabled={isPending} />
            <FormPasswordField name="password" label="Password" disabled={isPending} />
          </Stack>

          <Stack spacing={1}>
            <Button disabled={isPending} size="large" variant="contained" type="submit">
              Login
            </Button>
            <Typography align="center" variant="subtitle2">
              Or
            </Typography>
            <LinkButton href="/signup" size="large" variant="outlined">
              Signup
            </LinkButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Paper>
  );
}
