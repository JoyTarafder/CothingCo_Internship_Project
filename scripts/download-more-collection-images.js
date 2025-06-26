const fs = require("fs");
const path = require("path");
const https = require("https");

// Define the collection image URLs from Unsplash
const collectionImages = [
  {
    id: "women-formal-collection",
    name: "Women's Formal Collection",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "women-casual-collection",
    name: "Women's Casual Collection",
    url: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1186&auto=format&fit=crop",
  },
  {
    id: "kids-casual-collection",
    name: "Kids' Casual Collection",
    url: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=1169&auto=format&fit=crop",
  },
  {
    id: "kids-school-collection",
    name: "Kids' School Collection",
    url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1140&auto=format&fit=crop",
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
