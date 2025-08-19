import IsRealImageError from "./models/errors";
import { ImageExt, IsRealImageParams, IsRealImageReturnType } from "./types";
import path from "path";
import fs from "fs";
import { getImageInfo } from "./helpers/extractors";
import { extensionMatchesMagicNumber, isValidCheckOption, isValidImageExt } from "./helpers/validators";
import { readFileSignature, readFileSignatureSync } from "./helpers/readers";
import { IMAGES_EXTENSIONS } from "./constants";

async function isRealImage(args: IsRealImageParams, allowedTypes?: Set<ImageExt>): Promise<IsRealImageReturnType> {
    if (args instanceof Buffer) {
        return getImageInfo({buffer: args, allowedTypes}) ?? false;
    }

    const { input, check = "header-only" } = args;

    if (typeof input === "string") {
        if (!isValidCheckOption(check)) {
            throw new IsRealImageError(`Invalid check option: "${check}". Please use one of the valid options: "extension-only", "header-only", or "full-check".`);
        }

        const ext = path.extname(input).toLowerCase().slice(1);

        if (check === "extension-only") {
            return isValidImageExt(ext, allowedTypes);
        }

        if (!fs.existsSync(input)) {
            throw new IsRealImageError(`The file at path "${input}" does not exist. Please provide a valid file path.`);
        }

        const stats = fs.statSync(input);
        if (!stats.isFile()) {
            throw new IsRealImageError(`The path "${input}" is not a file. Please provide a valid file path.`);
        }

        if (check === "full-check" && !isValidImageExt(ext, allowedTypes)) {
            return false;
        }

        try {
            const buffer = await readFileSignature(input);
            const imageInfo = getImageInfo({buffer, ext, allowedTypes});
            
            if(check === "full-check") {
                const result = typeof imageInfo === "object" && imageInfo ? extensionMatchesMagicNumber(imageInfo) : imageInfo;

                return (result ?? false);
            }

            return (imageInfo ?? false);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Somthing went wrong";
            throw new IsRealImageError(`Failed to read file signature: ${message}`);
        }
    }

    throw new IsRealImageError(`Invalid argument: expected a Buffer or an object with a valid input string. Received "${typeof args}".`);
}

function isRealImageSync(args: IsRealImageParams, allowedTypes?: Set<ImageExt>): IsRealImageReturnType {
    if (args instanceof Buffer) {
        return getImageInfo({buffer: args, allowedTypes}) ?? false;
    }

    const { input, check = "header-only" } = args;

    if (typeof input === "string") {
        if (!isValidCheckOption(check)) {
            throw new IsRealImageError(`Invalid check option: "${check}". Please use one of the valid options: "extension-only", "header-only", or "full-check".`);
        }

        const ext = path.extname(input).toLowerCase().slice(1);

        if (check === "extension-only") {
            return isValidImageExt(ext, allowedTypes);
        }

        if (!fs.existsSync(input)) {
            throw new IsRealImageError(`The file at path "${input}" does not exist. Please provide a valid file path.`);
        }

        const stats = fs.statSync(input);
        if (!stats.isFile()) {
            throw new IsRealImageError(`The path "${input}" is not a file. Please provide a valid file path.`);
        }

        if (check === "full-check" && !isValidImageExt(ext, allowedTypes)) {
            return false;
        }

        try {
            const buffer = readFileSignatureSync(input);
            const imageInfo = getImageInfo({buffer, ext, allowedTypes});
            
            if(check === "full-check") {
                const result = typeof imageInfo === "object" && imageInfo ? extensionMatchesMagicNumber(imageInfo) : imageInfo;

                return (result ?? false);
            }

            return (imageInfo ?? false);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Somthing went wrong";
            throw new IsRealImageError(`Failed to read file signature: ${message}`);
        }
    }

    throw new IsRealImageError(`Invalid argument: expected a Buffer or an object with a valid input string. Received "${typeof args}".`);
}

const extensions = new Set(IMAGES_EXTENSIONS);

export { extensions, isRealImage, isRealImageSync, IsRealImageError, IsRealImageReturnType };