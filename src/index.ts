import IsRealImageError from "./models/errors";
import { IsRealImageParams } from "./types";
import path from "path";
import fs from "fs";
import { getImageInfo } from "./helpers/extractors";
import { isImageExt, isValidCheckOption } from "./helpers/validators";
import { readFileSignature, readFileSignatureSync } from "./helpers/readers";

async function isRealImage(args: IsRealImageParams) {
    if (args instanceof Buffer) {
        return getImageInfo(args);
    }

    const { input, check = "header-only" } = args;

    if (typeof input === "string") {
        if (!isValidCheckOption(check)) {
            throw new IsRealImageError(`Invalid check option: "${check}". Please use one of the valid options: "extension-only", "header-only", or "full-check".`);
        }

        const ext = path.extname(input).toLowerCase().slice(1);

        if (check === "extension-only") {
            return isImageExt(ext);
        }

        if (!fs.existsSync(input)) {
            throw new IsRealImageError(`The file at path "${input}" does not exist. Please provide a valid file path.`);
        }

        const stats = fs.statSync(input);
        if (!stats.isFile()) {
            throw new IsRealImageError(`The path "${input}" is not a file. Please provide a valid file path.`);
        }

        if (check === "full-check" && !isImageExt(ext)) {
            return null;
        }

        try {
            const buffer = await readFileSignature(input);
            return getImageInfo(buffer, ext);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Somthing went wrong";
            throw new IsRealImageError(`Failed to read file signature: ${message}`);
        }
    }

    throw new IsRealImageError(`Invalid argument: expected a Buffer or an object with a valid input string. Received "${typeof args}".`);
}

function isRealImageSync(args: IsRealImageParams) {
    if (args instanceof Buffer) {
        return getImageInfo(args);
    }

    const { input, check = "header-only" } = args;

    if (typeof input === "string") {
        if (!isValidCheckOption(check)) {
            throw new IsRealImageError(`Invalid check option: "${check}". Please use one of the valid options: "extension-only", "header-only", or "full-check".`);
        }

        const ext = path.extname(input).toLowerCase().slice(1);

        if (check === "extension-only") {
            return isImageExt(ext);
        }

        if (!fs.existsSync(input)) {
            throw new IsRealImageError(`The file at path "${input}" does not exist. Please provide a valid file path.`);
        }

        const stats = fs.statSync(input);
        if (!stats.isFile()) {
            throw new IsRealImageError(`The path "${input}" is not a file. Please provide a valid file path.`);
        }

        if (check === "full-check" && !isImageExt(ext)) {
            return null;
        }

        try {
            const buffer = readFileSignatureSync(input);
            return getImageInfo(buffer, ext);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Somthing went wrong";
            throw new IsRealImageError(`Failed to read file signature: ${message}`);
        }
    }

    throw new IsRealImageError(`Invalid argument: expected a Buffer or an object with a valid input string. Received "${typeof args}".`);
}

export { isRealImage, isRealImageSync, IsRealImageError };