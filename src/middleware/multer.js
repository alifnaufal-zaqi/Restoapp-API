import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destiantionPath = "public/";
    const fullPath = `${req.baseUrl}${req.path}`;

    if (fullPath.startsWith("/api/menus")) {
      destiantionPath += "menus";
    } else if (fullPath.startsWith("/api/restaurants")) {
      destiantionPath += "restaurants";
    } else {
      destiantionPath += "user-profiles";
    }

    cb(null, destiantionPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fullPath = `${req.baseUrl}${req.path}`;
    let filename;

    if (fullPath.startsWith("/api/menus")) {
      filename = `menu-${Date.now()}${ext}`;
    } else if (fullPath.startsWith("/api/restaurants")) {
      filename = `restaurant-${Date.now()}${ext}`;
    } else {
      filename = `profile-${Date.now()}${ext}`;
    }

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
