const fs = require("fs");
const path = require("path");
const https = require("https");

// Define the product image URLs from Unsplash
const productImages = [
  {
    id: "m1",
    name: "Premium Wool Overcoat",
    url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "m2",
    name: "Slim Fit Dress Shirt",
    url: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "m3",
    name: "Tailored Suit Pants",
    url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "m4",
    name: "Cashmere Sweater",
    url: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=669&auto=format&fit=crop",
  },
  {
    id: "m5",
    name: "Leather Derby Shoes",
    url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=735&auto=format&fit=crop",
  },
  {
    id: "m6",
    name: "Structured Blazer",
    url: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: "m7",
    name: "Selvedge Denim Jeans",
    url: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop",
  },
  {
    id: "m8",
    name: "Merino Wool Scarf",
    url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=687&auto=format&fit=crop",
  },
];

// Create directory if it doesn't exist
const targetDir = path.join(__dirname, "../public/images/products");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Download images
productImages.forEach((product) => {
  const fileName = `${product.id}-${product.name
    .toLowerCase()
    .replace(/\s+/g, "-")}.jpg`;
  const filePath = path.join(targetDir, fileName);

  console.log(`Downloading ${product.name} image to ${fileName}...`);

  const file = fs.createWriteStream(filePath);
  https
    .get(product.url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Downloaded ${fileName}`);

        // Update the image-mappings.json file
        updateImageMappings(product.id, `/images/products/${fileName}`);
      });
    })
    .on("error", (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${product.name} image:`, err.message);
    });
});

// Function to update the image mappings JSON file
function updateImageMappings(productId, imagePath) {
  const mappingsPath = path.join(targetDir, "image-mappings.json");

  let mappings = {};
  if (fs.existsSync(mappingsPath)) {
    try {
      const data = fs.readFileSync(mappingsPath, "utf8");
      mappings = JSON.parse(data);
    } catch (error) {
      console.error("Error reading mappings file:", error);
    }
  }

  // Update the mapping
  mappings[productId] = imagePath;

  // Write back to file
  fs.writeFileSync(mappingsPath, JSON.stringify(mappings, null, 2), "utf8");
  console.log(`Updated mapping for ${productId}`);
}

console.log("Image download process initiated. Please wait...");
