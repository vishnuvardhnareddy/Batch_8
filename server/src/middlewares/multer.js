import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the temp directory exists
const tempDir = "./public/temp";
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Use pre-defined temp directory
    },
    filename: function (req, file, cb) {
        // Add a timestamp to prevent overwriting files with the same name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// Optional: Add a file filter to limit file types (e.g., images only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|docx/; // Specify allowed file types
    const mimeType = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    }
    cb(new Error("Unsupported file type."), false);
};

// Configure Multer with additional options
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Set file size limit to 5MB
    fileFilter
});

export { upload };
