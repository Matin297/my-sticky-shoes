import type { Color } from "@mui/material/styles";
import type { MakeOptional } from "@/lib/type-utils";

export type ColorWithOptionalAccents = MakeOptional<Color, "A100" | "A200" | "A400" | "A700">;
