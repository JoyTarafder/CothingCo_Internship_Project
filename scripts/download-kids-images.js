const fs = require("fs");
const path = require("path");
const https = require("https");

// Define the product image URLs from Unsplash
const productImages = [
  {
    id: "k1",
    name: "Cotton T-Shirt Set",
    url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "k2",
    name: "Denim Overalls",
    url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=772&auto=format&fit=crop",
  },
  {
    id: "k3",
    name: "Hooded Sweatshirt",
    url: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?q=80&w=880&auto=format&fit=crop",
  },
  {
    id: "k4",
    name: "Stretch Pants",
    url: "https://images.unsplash.com/photo-1631233859262-0d7b12ef7632?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "k5",
    name: "Patterned Dress",
    url: "https://images.unsplash.com/photo-1476234251651-f353703a034d?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "k6",
    name: "Lightweight Jacket",
    url: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1170&auto=format&fit=crop",
  },
  {
    id: "k7",
    name: "Pajama Set",
    url: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "k8",
    name: "School Uniform Set",
    url: "https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?q=80&w=687&auto=format&fit=crop",
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
