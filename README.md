# is-real-image

**is-real-image** is a lightweight and efficient Node.js package that allows you to verify if a file is a real image based on its extension, signature (magic number), or both. This package ensures that the provided image file is valid by checking the file's extension, inspecting the file's binary signature, or combining both methods for extra security.
#### Features:

- **Extension Validation**: Ensures the file has a valid image extension such as `.png`, `.jpeg`, `.gif`, etc.
- **Signature (Magic Number) Validation**: Checks the file's internal signature (magic number) to confirm the image's authenticity regardless of the file extension.
- **Combined Validation**: Perform both extension and signature checks to maximize security and accuracy.
- **Supported Formats**: PNG, JPEG, GIF, BMP, TIFF, WEBP, AVIF, HEIC, HEIF, PSD, and more.
#### Use Cases:

- **Security Checks**: Validate images uploaded by users to prevent file spoofing (e.g., files with incorrect extensions).
- **File Processing**: Ensure that files passed for processing are actual images before proceeding.
- **Compliance**: Ensure correct image types are used in workflows that require strict format validation.

## Installation

```shell
npm install is-real-image
```

## Usage

### Buffer

```js
import fs from "fs";
import { isRealImage } from "../src/index";

const assets = path.join(__dirname, "assets");
const imagePath = path.join(assets, "image.png");

function main() {
	const buffer = fs.readFileSync(imagePath); 
	const result = await isRealImage(buffer) // { mime: "image/png", fileExt: "png", realExt: "png"};
}
```
### File Path

```js
import path from "path";
import { isRealImage } from "../src/index";

const assets = path.join(__dirname, "assets");

async function main() {
    // Path to the image with incorrect extension (PNG image saved as .webp)
    const imagePath = path.join(assets, "image.webp");

    // Option 1: Validate using the file signature (magic numbers) only.
    // This method ignores the file extension and checks the internal binary data (signature)
    // to determine the actual image format.
    const pngInfo = await isRealImage({
        input: imagePath,
        check: "header-only"
    });
    console.log(pngInfo);
    // Output: { mime: "image/png", fileExt: "webp", realExt: "png" }
    // This indicates that the file has a .webp extension, but is actually a PNG image.

    // Option 2: Validate using the file extension only.
    // This method checks if the file extension (.webp) is a valid image extension.
    const isImage = await isRealImage({
        input: imagePath,
        check: "extension-only"
    });
    console.log(isImage);
    // Output: true
    // The .webp extension is recognized as a valid image extension, 
    // regardless of the file's actual content.

    // Option 3: Perform a full validation, checking both the file signature and extension.
    // This method ensures that both the extension and the actual content match.
    const imageInfo = await isRealImage({
        input: imagePath,
        check: "full-check"
    });
    console.log(imageInfo);
    // Output: { mime: "image/png", fileExt: "webp", realExt: "png" }
    // The result confirms a mismatch between the file extension (webp) and the actual format (png).
};

main();
```
#### Option 1: Buffer Input (Direct File Content)

- **Type**: `Buffer`    
- **Description**: If you have the image file content loaded as a `Buffer`, you can directly pass it to the `isRealImage` function. This skips the need to read the file from disk and checks the signature of the image based on its binary content.
#### Option 2: Object with `{ input, check }`

##### `input` (required)

- **Type**: `string`
- **Description**: The file path (absolute or relative) to the image you want to check. The path points to where the image is stored on disk.
##### `check` (optional)

- **Type**: `"extension-only" | "header-only" | "full-check"`
- **Default**: `"header-only"`
- **Description**: Specifies the type of validation to perform on the image. It can be one of the following:
    - **`"extension-only"`**: Checks if the file has a valid image extension (e.g., `.png`, `.jpeg`). Does not inspect the actual file contents.
    - **`"header-only"`**: Checks the file's binary signature (magic number) to determine the file type, ignoring the file extension.
    - **`"full-check"`**: Performs both extension and header validation, checking that the file extension matches its actual contents.
## Sync/Async

This package offers two methods for verifying image file types:

```js
import { isRealImage, isRealImageSync } from "is-real-image";
```
### Async Method

The **async method** allows you to check if a file is a valid image using either the file extension, the file signature (magic number), or both. This method is non-blocking and processes the file as a stream, making it efficient for larger files and applications that require high concurrency.
#### Features:

- **Non-blocking**: Uses asynchronous file reading to avoid blocking the event loop.
- **Stream-based**: Reads the file signature as a stream, reducing memory usage for large files.
### Sync Method

The **sync method** provides a similar functionality to the async method but in a synchronous, blocking manner. This method reads the file in one go (not as a stream) and processes the image's extension and/or signature. It is suitable for scenarios where performance is less critical, or where you need to process smaller files quickly.
#### Features:

- **Blocking**: Reads the file synchronously, which may block the event loop but simplifies code execution.
- **Reads Entire File**: Loads the necessary portion of the file into memory at once for signature validation.