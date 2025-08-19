import { IMAGE_SIGNATURE_MAX_LENGTH, IMAGES_HEADERS } from "../constants";
import { GetImageInfoParams, ImageExt, ImageMimeType, ImageType } from "../types";
import { isAllowedImageExt } from "./validators";

export function getImageSignature(value: Buffer, length = IMAGE_SIGNATURE_MAX_LENGTH) {
    return value.subarray(0, length);
}

export function getImageInfo({buffer, ext, allowedTypes}: GetImageInfoParams): ImageType | null {
    const realSignature = getImageSignature(buffer).toString("hex").toUpperCase();

    for(const [signature, options] of IMAGES_HEADERS) {
        if(signature === realSignature.slice(0, signature.length)) {
            const realExt = options.realExt;

            const matchedExt = realExt.find(currentExt => isAllowedImageExt(currentExt, allowedTypes));
            if (!matchedExt) {
                return null;
            }

            return {
                realExt: matchedExt,
                mime: options.mime as ImageMimeType,
                fileExt: ext || options.fileExt
            }
        }
    }

    return null;
}