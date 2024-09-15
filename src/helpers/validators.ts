import { IMAGES_EXTENSIONS } from "../constants";
import { CheckOption, ImageExt } from "../types";

export function isValidCheckOption(value: string): value is CheckOption {
    return value === "full-check" || value === "header-only" || value === "extension-only";
}

export function isImageExt(value: string): value is ImageExt {
    return IMAGES_EXTENSIONS.has(value as ImageExt);
}