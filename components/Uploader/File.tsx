"use client";

import {
  Delete as DeleteIcon,
  Description as DocIcon,
  Error as ErrorIcon,
  TableChart as ExcelIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  CheckCircle as SuccessIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { MAX_FILE_SIZE_5MB } from "@/lib/constants";
import {
  ACCEPT_FILE_TYPES,
  type AcceptFileType,
  EXTENSION_MIME_MAP,
  formatFileSizeInBytesUnit,
  generateFilePreview,
  MAX_FILES,
  type UploadFile,
  uploadFile,
} from "./utils";

export interface FileUploaderProps {
  onFileChange: (fileId: string, fileURL: string) => void;
  acceptedFileTypes: AcceptFileType[];
  maxFiles?: number;
  multiple?: boolean;
  maxSizeBytes?: number;
}

const getFileIcon = (file: File) => {
  if (file.type.startsWith("image/")) return <ImageIcon color="secondary" />;
  if (file.type === "application/pdf") return <PdfIcon color="error" />;
  if (file.name.match(/\.(xlsx|xls)$/i)) {
    return <ExcelIcon color="success" />;
  }
  if (file.name.match(/\.(doc|docx)$/i)) {
    return <DocIcon color="info" />;
  }
  return <FileIcon />;
};

export default function FileUploader({
  multiple = true,
  maxFiles = MAX_FILES,
  onFileChange,
  maxSizeBytes = MAX_FILE_SIZE_5MB,
  acceptedFileTypes = ACCEPT_FILE_TYPES,
}: FileUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const accept = acceptedFileTypes.reduce<Record<string, string[]>>((acc, type) => {
    if (!acc[EXTENSION_MIME_MAP[type]]) {
      acc[EXTENSION_MIME_MAP[type]] = [];
    }
    acc[EXTENSION_MIME_MAP[type]].push(type);
    return acc;
  }, {});

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    onDrop: handleDrop,
    maxSize: maxSizeBytes,
  });

  function handleDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]) {
    const filledSlots = files.filter(({ status }) => status !== "error").length;
    const remainingSlots = Math.max(maxFiles - filledSlots, 0);
    const filesToAccept = acceptedFiles.slice(0, remainingSlots);

    if (acceptedFiles.length > remainingSlots) {
      toast.warning(`Maximum ${maxFiles} files allowed.`);
    }

    const invalidFiles: UploadFile[] = rejectedFiles.map(({ file, errors }) => ({
      file,
      progress: 0,
      status: "error",
      error: errors.map(({ message }) => message).join(", "),
      id: crypto.randomUUID(),
    }));
    const validFiles: UploadFile[] = filesToAccept.map(file => ({
      file,
      progress: 0,
      status: "pending",
      id: crypto.randomUUID(),
      preview: generateFilePreview(file),
    }));

    setFiles(prevFiles => [...prevFiles, ...invalidFiles, ...validFiles]);
  }

  const handleFileUpload = async (fileId: string) => {
    const fileToUpload = files.find(f => f.id === fileId);
    if (!fileToUpload) return;

    setFiles(prev =>
      prev.map(f => (f.id === fileId ? { ...f, status: "uploading", progress: 0 } : f)),
    );

    try {
      const fileURL = await uploadFile(fileToUpload.file, percent => {
        setFiles(prev => prev.map(f => (f.id === fileId ? { ...f, progress: percent } : f)));
      });
      setFiles(prev => prev.map(f => (f.id === fileId ? { ...f, status: "success" } : f)));
      onFileChange?.(fileId, fileURL);
    } catch {
      toast.error(`File Upload Failed: ${fileToUpload.file.name}`);
      setFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: "error",
                error: "Upload failed",
              }
            : f,
        ),
      );
    }
  };

  const handleUploadAll = () => {
    for (const file of files) {
      if (file.status === "pending") {
        handleFileUpload(file.id);
      }
    }
  };

  const handleRemove = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    onFileChange(fileId, "");
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleRemoveAll = () => {
    for (const file of files) {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    }
    setFiles([]);
  };

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          cursor: "pointer",
          border: "2px dashed",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <input {...getInputProps()} />
        <Stack spacing={1} sx={{ alignItems: "center" }}>
          <UploadIcon sx={{ fontSize: 40, color: "secondary.main" }} />
          <Typography variant="h6">Drop files here</Typography>
          <Typography>or click to select files</Typography>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "center", flexWrap: "wrap" }}>
            {acceptedFileTypes.map(type => (
              <Chip key={type} label={type.toUpperCase()} color="secondary" size="small" />
            ))}
          </Stack>
          <Typography variant="caption">
            Max size: {formatFileSizeInBytesUnit(maxSizeBytes)} • Max files: {maxFiles}
          </Typography>
        </Stack>
      </Paper>

      {files.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
          >
            <Typography variant="h6">
              Files ({files.filter(f => f.status === "pending").length} pending)
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={handleUploadAll}
                disabled={!files.some(f => f.status === "pending")}
              >
                Upload All
              </Button>
              <Button color="error" size="small" onClick={handleRemoveAll}>
                Clear All
              </Button>
            </Stack>
          </Stack>

          <List>
            {files.map(file => (
              <ListItem
                key={file.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 1,
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Stack direction="row" spacing={2} sx={{ alignItems: "center", py: 1 }}>
                  <ListItemIcon>
                    {file.status === "success" ? (
                      <SuccessIcon color="success" />
                    ) : (
                      getFileIcon(file.file)
                    )}
                  </ListItemIcon>

                  {file.preview && (
                    <Card sx={{ width: 60, height: 60 }}>
                      <CardMedia
                        component="img"
                        image={file.preview}
                        alt={file.file.name}
                        sx={{ height: 60, objectFit: "cover" }}
                      />
                    </Card>
                  )}

                  <Box sx={{ flex: 1 }}>
                    <Typography gutterBottom variant="body2">
                      {file.file.name}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSizeInBytesUnit(file.file.size)}
                      </Typography>
                      {file.status === "uploading" && (
                        <Typography variant="caption" color="info.main">
                          Uploading... {file.progress}%
                        </Typography>
                      )}
                      {file.status === "success" && (
                        <Typography variant="caption" color="success.main">
                          Upload complete!
                        </Typography>
                      )}
                      {file.status === "error" && (
                        <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                          <ErrorIcon color="error" sx={{ fontSize: 15 }} />
                          <Typography variant="caption" color="error.main">
                            {file.error}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Box>

                  <IconButton onClick={() => handleRemove(file.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Stack>

                {file.status === "uploading" && (
                  <LinearProgress
                    variant="determinate"
                    value={file.progress}
                    sx={{ mt: 1, height: 4, borderRadius: 2 }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

// const validateFile = (file: File) => {
//   const extension = `.${file.name.split(".").pop()?.toLowerCase()}` as AcceptFileType;
//   if (!acceptedFileTypes.includes(extension)) {
//     throw new Error(`File type not allowed. Allowed: ${acceptedFileTypes.join(", ")}`);
//   }
//   if (file.size > maxSizeBytes) {
//     throw new Error(`File is too large. Max size: ${formatFileSizeInBytesUnit(maxSizeBytes)}`);
//   }
// };
