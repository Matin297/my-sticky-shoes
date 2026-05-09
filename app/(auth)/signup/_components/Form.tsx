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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LinkButton } from "@/components/LinkButton";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useSignup();

  const handleFormSubmit = handleSubmit(data => {
    mutate(
      { data },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
          router.push("/");
          toast.success("Welcome back to My Sticky Shoes!");
        },
      },
    );
  });

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography gutterBottom variant="h3">
        Create Account
      </Typography>

      <Stack spacing={4} component="form" onSubmit={handleFormSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            disabled={isPending}
          />

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

          <TextField
            label="Confirm Password"
            type={isPasswordVisible ? "text" : "password"}
            {...register("confirmPassword")}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
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
    </Paper>
  );
}
