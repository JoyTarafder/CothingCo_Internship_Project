const fs = require("fs");
const path = require("path");
const https = require("https");

// Define the collection image URLs from Unsplash
const collectionImages = [
  {
    id: "formal-collection",
    name: "Formal Collection",
    url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "casual-collection",
    name: "Casual Collection",
    url: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1974&auto=format&fit=crop",
  },
];

// Create directory if it doesn't exist
const targetDir = path.join(__dirname, "../public/images/collections");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Download images
collectionImages.forEach((collection) => {
  const fileName = `${collection.id}.jpg`;
  const filePath = path.join(targetDir, fileName);

  console.log(`Downloading ${collection.name} image to ${fileName}...`);

  const file = fs.createWriteStream(filePath);
  https
    .get(collection.url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${fileName}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${collection.name} image:`, err.message);
    });
});

console.log("Collection image download process initiated. Please wait...");
