const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});
// config/imagekit.js

async function uploadImage(file, fileName) {
  const result = await imagekit.upload({
    file,
    fileName: `profile-${Date.now()}-${fileName}`,

    folder: "/TaskFlow/UserProfile",
  });

  return result;
}

module.exports = {
  uploadImage,
};
