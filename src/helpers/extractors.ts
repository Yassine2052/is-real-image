import { IMAGE_SIGNATURE_MAX_LENGTH, IMAGES_HEADERS } from "../constants";

export function getImageSignature(value: Buffer, length = IMAGE_SIGNATURE_MAX_LENGTH) {
    return value.subarray(0, length);
}

export function getImageInfo(buffer: Buffer, ext: string = "") {
    const realSignature = getImageSignature(buffer).toString("hex").toUpperCase();

    for(const [signature, options] of IMAGES_HEADERS) {
        if(signature === realSignature.slice(0, signature.length)) {
            return { ...options, fileExt: ext || options.fileExt };
        }
    }

    return null;
}