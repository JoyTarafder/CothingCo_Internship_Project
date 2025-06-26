const https = require("https");
const fs = require("fs");
const path = require("path");

// URL for a royalty-free summer fashion collection image
// Using Unsplash for high-quality, free-to-use images
const imageUrl =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop";
const outputPath = path.join(
  __dirname,
  "../public/images/collections/summer-premium-collection.jpg"
);

console.log(`Downloading image from ${imageUrl}`);
console.log(`Saving to ${outputPath}`);

https
  .get(imageUrl, (response) => {
    if (response.statusCode !== 200) {
      console.error(
        `Failed to download image: ${response.statusCode} ${response.statusMessage}`
      );
      return;
    }

    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);

    fileStream.on("finish", () => {
      fileStream.close();
      console.log("Image download completed");
    });
  })
  .on("error", (err) => {
    console.error(`Error downloading image: ${err.message}`);
  });
