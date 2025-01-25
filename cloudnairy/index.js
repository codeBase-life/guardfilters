const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: "dhft1iafw",
  api_key: "356662981948645",
  api_secret: "1tScelQVwNjogVpzU9LnDwRM6lo",
});
const imgPath = path.resolve(__dirname, "./9.jpg");
cloudinary.uploader.upload(imgPath, function (error, result) {
  if (error) {
    console.error("Error uploading image:", error);
  } else {
    console.log("Upload result:", result);
  }
});
