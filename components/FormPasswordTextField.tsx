"use client";

import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { FormTextField, type FormTextFieldProps } from "./FormTextField";

export function FormPasswordField(props: Omit<FormTextFieldProps, "type">) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormTextField
      {...props}
      type={isVisible ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setIsVisible(prev => !prev)} edge="end">
                {isVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
