import { IMAGES_EXTENSIONS } from "../constants";
import { CheckOption, ImageExt } from "../types";

export function isValidCheckOption(value: string): value is CheckOption {
    return value === "full-check" || value === "header-only" || value === "extension-only";
}

export function isImageExt(value: string): value is ImageExt {
    return IMAGES_EXTENSIONS.has((value) as ImageExt);
}

export function isAllowedImageExt(value: ImageExt, allowedTypes: Set<ImageExt> | undefined): boolean {
    return !allowedTypes || allowedTypes.has(value);
}

export function isValidImageExt(value: string, allowedTypes?: Set<ImageExt>): value is ImageExt {
    return isImageExt(value) && isAllowedImageExt(value, allowedTypes);
}