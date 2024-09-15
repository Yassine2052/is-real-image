export type ImageMimeType = 
  | "image/png" 
  | "image/jpeg" 
  | "image/gif" 
  | "image/gif87a"
  | "image/gif89a"
  | "image/bmp" 
  | "image/tiff-le" 
  | "image/tiff-be" 
  | "image/webp" 
  | "image/x-icon" 
  | "image/x-cursor" 
  | "image/vnd.adobe.photoshop" 
  | "image/jp2" 
  | "image/jpeg2000"
  | "image/svg+xml"
  | "image/heic"
  | "image/heif"
  | "image/avif"
  | "image/emf"
  | "image/fits"
  | "image/vnd.dwg"
  | "image/vnd.microsoft.icon"
  | "image/vnd.ms-modi"
  | "image/vnd.zbrush.pcx"
  | "image/wmf"
  | "image/x-portable-graymap"
  | "image/x-rgb";

export type ImageExt = 
  | "png" 
  | "jpeg" 
  | "gif" 
  | "bmp" 
  | "tiff" 
  | "webp" 
  | "ico" 
  | "cur" 
  | "psd"
  | "jp2"
  | "svg"
  | "heic"
  | "heif"
  | "avif"
  | "emf"
  | "fits"
  | "dwg"
  | "mdi"
  | "pcx"
  | "wmf"
  | "pgm"
  | "rgb";

export type CheckOption = "extension-only" | "header-only" | "full-check";

export type ImageType = {
    mime: ImageMimeType,
    realExt: ImageExt,
    fileExt: string
}

export type IsRealImageParams = {
    input: string
    check?: CheckOption,
} | Buffer;