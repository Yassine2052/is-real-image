import { ImageExt } from "../types";

export const IMAGE_SIGNATURE_MAX_LENGTH = 20;
export const IMAGES_EXTENSIONS: ReadonlySet<ImageExt> = new Set<ImageExt>([
    "bmp",
    "jpeg",
    "png",
    "gif",
    "tiff",
    "webp",
    "ico",
    "cur",
    "psd",
    "avif"
]);
export const IMAGES_HEADERS: ReadonlyMap<string, { mime: string, realExt: ImageExt, fileExt: string }> = new Map(
    [
        ["89504E470D0A1A0A", { mime: "image/png", realExt: "png", fileExt: "png" }],
        ["FFD8", { mime: "image/jpeg", realExt: "jpeg", fileExt: "jpeg" }],
        ["474946383961", { mime: "image/gif", realExt: "gif", fileExt: "gif" }],
        ["474946383761", { mime: "image/gif", realExt: "gif", fileExt: "gif" }],
        ["424D", { mime: "image/bmp", realExt: "bmp", fileExt: "bmp" }],
        ["49492A00", { mime: "image/tiff", realExt: "tiff", fileExt: "tiff" }],
        ["4D4D002A", { mime: "image/tiff", realExt: "tiff", fileExt: "tiff" }],
        ["38425053", { mime: "image/vnd.adobe.photoshop", realExt: "psd", fileExt: "psd" }],
        ["41433130", { mime: "image/vnd.dwg", realExt: "dwg", fileExt: "dwg" }],
        ["00000100", { mime: "image/x-icon", realExt: "ico", fileExt: "ico" }],
        ["01000000", { mime: "image/emf", realExt: "emf", fileExt: "emf" }],
        ["53494D504C4520203D", { mime: "image/fits", realExt: "fits", fileExt: "fits" }],
        ["0000000C6A5020200D0A", { mime: "image/jp2", realExt: "jp2", fileExt: "jp2" }],
        ["52494646", { mime: "image/webp", realExt: "webp", fileExt: "webp" }],
        ["3C3F786D6C", { mime: "image/svg+xml", realExt: "svg", fileExt: "svg" }],
        ["50350A", { mime: "image/x-portable-graymap", realExt: "pgm", fileExt: "pgm" }],
        ["01DA01010003", { mime: "image/x-rgb", realExt: "rgb", fileExt: "rgb" }],
        ["4550", { mime: "image/vnd.ms-modi", realExt: "mdi", fileExt: "mdi" }],
        ["0908100000060500", { mime: "image/vnd.zbrush.pcx", realExt: "pcx", fileExt: "pcx" }],
        ["D7CDC69A", { mime: "image/wmf", realExt: "wmf", fileExt: "wmf" }],
        ["66747970", { mime: "image/heic", realExt: "heic", fileExt: "heic" }],
        ["49492A002D", { mime: "image/heif", realExt: "heif", fileExt: "heif" }],
        ["6674797061766966", { mime: "image/avif", realExt: "avif", fileExt: "avif" }],
        ["0000001C6674797061766966", { mime: "image/avif", realExt: "avif", fileExt: "avif" }]
    ]
);