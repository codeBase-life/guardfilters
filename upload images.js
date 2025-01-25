require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const model = require("./db/model");
const path = require("path");

const uri = process.env.MONGODB;
cloudinary.config({
  cloud_name: "dhft1iafw",
  api_key: "356662981948645",
  api_secret: "1tScelQVwNjogVpzU9LnDwRM6lo",
});

const uploadImages = async () => {
  // try {
  //   await mongoose.connect(uri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log("Database connection successful");
  // } catch (error) {
  //   console.error("Database connection error:", error);
  // }

  const imagesDir = path.join(__dirname, "/views/product_images");
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const imgId = path.basename(file, path.extname(file));

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "product_images",
      });
      console.log(
        `Uploaded ${imgId} to Cloudinary its url : ${result.secure_url}`
      );

      // const updatedResult = await model.updateOne(
      //   { imgId },
      //   { imageUrl: result.secure_url }
      // );
    } catch (error) {
      console.error(`Error uploading ${file}:`, error);
    }
  }
};

uploadImages();

// const deleteImages = async () => {
//   try {
//     const { resources } = await cloudinary.search
//       .expression("folder:product_images")
//       .execute();

//     for (const resource of resources) {
//       await cloudinary.uploader.destroy(resource.public_id);
//       console.log(`Deleted image: ${resource.public_id}`);
//     }
//   } catch (error) {
//     console.error("Error deleting images:", error);
//   }
// };

// deleteImages();
