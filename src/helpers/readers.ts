import fs from "fs";
import { IMAGE_SIGNATURE_MAX_LENGTH } from "../constants";

export async function readFileSignature(path: string) {
    const chunks = [];
    const fileReader = fs.createReadStream(path, { start: 0, end: IMAGE_SIGNATURE_MAX_LENGTH - 1 });

    for await (const chunk of fileReader) {
        chunks.push(chunk);
    }

    fileReader.close();
    return Buffer.concat(chunks);
}

export function readFileSignatureSync(path: string) {
    return fs.readFileSync(path).subarray(0, IMAGE_SIGNATURE_MAX_LENGTH);
}