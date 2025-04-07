import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dpjafttlw",
  api_key: "668357681725991",
  api_secret: "_InkiCPa69cWx5v8hFlT4ClWNRM",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

const upload = multer({ storage });

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos", // Change folder name for video uploads
    resource_type: "video", // Specify resource type as video
    allowed_formats: ["mp4", "mov", "avi", "mkv"], // Allowed video formats
  },
});

const videoUpload = multer({ storage: videoStorage });

const uploadImageMiddleware = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to upload image.");
    }

    if (req.file) {
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).send("Uploaded file is not an image.");
      }
      req.imageUrl = req.file.path; // Store the Cloudinary URL in req.imageUrl
    }
    next();
  });
};

const uploadVideoMiddleware = (req, res, next) => {
  console.log("hello");

  videoUpload.single("video")(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to upload video.");
    }

    if (req.file) {
      const allowedMimeTypes = [
        "video/mp4",
        "video/mov",
        "video/x-msvideo", // For AVI
        "video/x-matroska", // For MKV
      ];

      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).send("Uploaded file is not a video.");
      }
      console.log("req.file.path", req.file.path);

      req.videoUrl = req.file.path; // Store the Cloudinary URL in req.videoUrl
    }

    next();
  });
};

// Define the route that uses the middleware
export { uploadImageMiddleware, uploadVideoMiddleware };
