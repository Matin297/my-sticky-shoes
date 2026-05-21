"use client";

import {
  PhotoCamera as CameraIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  type SxProps,
  type Theme,
} from "@mui/material";
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ErrorCode, type FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { MAX_FILE_SIZE_5MB } from "@/lib/constants";
import { formatFileSizeInBytesUnit, uploadFile } from "./utils";

interface AvatarUploaderProps {
  disabled?: boolean;
  size?: number;
  maxSizeBytes?: number;
  avatar?: string;
  defaultAvatar?: string;
  onAvatarChange: (fileURL: string) => void;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
  sx?: SxProps<Theme>;
}

const ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export default function AvatarUploader({
  sx,
  size = 120,
  disabled,
  avatar,
  onAvatarChange,
  defaultAvatar = "",
  maxSizeBytes = MAX_FILE_SIZE_5MB,
  uploading,
  setUploading,
}: AvatarUploaderProps) {
  const [_preview, _setPreview] = useState<string>("");

  const isPreviewControlled = typeof avatar !== "undefined";
  const preview = isPreviewControlled ? avatar : _preview;

  const onAvatarChangeRef = useRef(onAvatarChange);

  useEffect(() => {
    onAvatarChangeRef.current = onAvatarChange;
  }, [onAvatarChange]);

  const setPreview = useCallback(
    (value: string) => {
      onAvatarChangeRef.current(value ?? "");
      if (!isPreviewControlled) {
        _setPreview(value);
      }
    },
    [isPreviewControlled],
  );

  useEffect(() => {
    setPreview(defaultAvatar);
  }, [defaultAvatar, setPreview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    multiple: false,
    onDrop: handleDrop,
    maxSize: maxSizeBytes,
    disabled: uploading || disabled,
  });

  function handleDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]) {
    const isValid = validateAvatarFile(rejectedFiles[0]);
    if (!isValid) {
      return;
    }
    handleFileUpload(acceptedFiles[0]);
  }

  function validateAvatarFile(rejectedFile: FileRejection) {
    if (!rejectedFile) {
      return true;
    }

    const error = rejectedFile.errors[0];
    if (error.code === ErrorCode.FileTooLarge) {
      toast.error(`File too large. Max size: ${formatFileSizeInBytesUnit(maxSizeBytes)}`);
    }
    if (error.code === ErrorCode.FileInvalidType) {
      toast.error("Only image files are allowed (JPG, PNG, WEBP)");
    }

    return false;
  }

  async function handleFileUpload(file?: File) {
    if (!file) return;

    setUploading(true);
    try {
      const fileURL = await uploadFile(file);
      setPreview(fileURL);
      toast.success("Avatar uploaded successfully!");
    } catch {
      toast.error("Failed to upload avatar!");
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveAvatar() {
    setPreview("");
  }

  function handleCancelUpload() {
    setPreview(defaultAvatar);
  }

  return (
    <Box sx={{ position: "relative", display: "inline-block", width: "fit-content", ...sx }}>
      <input {...getInputProps()} />
      <Avatar
        src={preview}
        sx={{
          width: size,
          height: size,
          transition: "opacity 0.2s",
          cursor: uploading ? "default" : "pointer",
          opacity: uploading ? 0.7 : 1,
          ...(isDragActive && {
            outline: "2px solid",
            outlineColor: "secondary.main",
            outlineOffset: 2,
          }),
        }}
        {...getRootProps()}
      />
      {uploading && (
        <CircularProgress
          size={size * 0.3}
          color="secondary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
        />
      )}
      <Stack direction="row" sx={{ justifyContent: "center" }}>
        {preview !== defaultAvatar && (
          <IconButton
            color="info"
            title="cancel"
            onClick={handleCancelUpload}
            disabled={uploading || disabled}
            aria-label="Cancel Upload"
          >
            <CancelIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
        <IconButton
          color="error"
          title="remove"
          onClick={handleRemoveAvatar}
          disabled={uploading || disabled}
          aria-label="Remove avatar"
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          title="upload"
          color="secondary"
          {...getRootProps()}
          disabled={uploading || disabled}
          aria-label="Upload avatar"
        >
          <CameraIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
