import { axiosInstance } from "@/services/axios";

type UploadFileStatus = "pending" | "uploading" | "success" | "error";
export interface UploadFile {
  id: string;
  file: File;
  error?: string;
  progress: number;
  preview?: string;
  status: UploadFileStatus;
}

export type AcceptFileType =
  | ".jpg"
  | ".jpeg"
  | ".png"
  | ".pdf"
  | ".xlsx"
  | ".xls"
  | ".docx"
  | ".doc";

export const MAX_FILES = 1;
export const ACCEPT_FILE_TYPES: AcceptFileType[] = [
  ".jpg",
  ".jpeg",
  ".png",
  ".pdf",
  ".xlsx",
  ".xls",
  ".doc",
  ".docx",
];

export const EXTENSION_MIME_MAP: Record<AcceptFileType, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xls": "application/vnd.ms-excel",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".doc": "application/msword",
};

const KILOBYTE = 1024;
const FILE_FORMAT_UNITS = ["Bytes", "KB", "MB", "GB"];
export const formatFileSizeInBytesUnit = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));
  const formattedValue = parseFloat((bytes / KILOBYTE ** unitIndex).toFixed(2));
  return `${formattedValue} ${FILE_FORMAT_UNITS[unitIndex]}`;
};

export const generateFilePreview = (file: File) => {
  return file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
};

const TIMEOUT_5MIN = 5 * 60 * 1000;
export const uploadFile = async (file: File, onProgress?: (percent: number) => void) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post<{ url: string }>("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: TIMEOUT_5MIN,
    onUploadProgress: progressEvent => {
      if (progressEvent.total && onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    },
  });

  return response.data.url;
};
