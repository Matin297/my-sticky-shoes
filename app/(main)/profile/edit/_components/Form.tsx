"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormTextField } from "@/components/FormTextField";
import { LinkButton } from "@/components/LinkButton";
import AvatarUploader from "@/components/Uploader/Avatar";
import {
  getGetCurrentUserQueryKey,
  useGetCurrentUser,
  useUpdateCurrentUser,
} from "@/services/generated/profile/profile";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address."),
  avatar: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfileForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading: isCurrentUserLoading } = useGetCurrentUser();
  const user = data?.data?.user;

  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const { mutate, isPending } = useUpdateCurrentUser();

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
    },
  });

  const { handleSubmit, reset, setValue, setError } = methods;

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const handleAvatarChange = (avatarUrl: string) => {
    setValue("avatar", avatarUrl);
  };

  const handleEditProfile = handleSubmit(data => {
    mutate(
      { data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetCurrentUserQueryKey() });
          toast.success("Profile updated successfully");
          router.push("/profile");
        },
        onError: error => {
          if (isAxiosError(error)) {
            if (error.response?.data.errors) {
              const errors = error.response?.data.errors;
              if (errors.name) {
                setError("name", { message: errors.name });
              }
              if (errors.email) {
                setError("email", { message: errors.email });
              }
            }
          } else {
            toast(error.message || "Something went wrong! Please try again.");
          }
        },
      },
    );
  });

  if (isCurrentUserLoading) {
    return "Loading...";
  }

  return (
    <Stack spacing={4}>
      <AvatarUploader
        disabled={isPending}
        sx={{ alignSelf: "center" }}
        defaultAvatar={user?.avatar}
        uploading={isAvatarUploading}
        setUploading={setIsAvatarUploading}
        onAvatarChange={handleAvatarChange}
      />
      <FormProvider {...methods}>
        <Stack component="form" noValidate onSubmit={handleEditProfile} spacing={2}>
          <FormTextField name="name" label="name" disabled={isPending} />
          <FormTextField type="email" name="email" disabled={isPending} label="E-mail" />

          <Stack spacing={1} direction="row" sx={{ justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" disabled={isAvatarUploading || isPending}>
              Edit
            </Button>
            <LinkButton color="error" href="/profile">
              Cancel
            </LinkButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
