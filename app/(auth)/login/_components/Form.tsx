"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LinkButton } from "@/components/LinkButton";
import {
  getGetCurrentUserQueryKey,
  type LoginMutationError,
  useLogin,
} from "@/services/generated/auth/auth";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().trim().min(1, "Password is required!"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useLogin();

  const handleFormSubmit = handleSubmit(data => {
    mutate(
      { data },
      {
        onSuccess() {
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

      <Stack spacing={4} component="form" onSubmit={handleFormSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="E-mail"
            type="email"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            disabled={isPending}
          />
          <TextField
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            disabled={isPending}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsPasswordVisible(prev => !prev)} edge="end">
                      {isPasswordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
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
    </Paper>
  );
}
