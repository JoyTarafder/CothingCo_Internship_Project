const fs = require("fs");
const path = require("path");
const https = require("https");

// Define the product image URLs from Unsplash
const productImages = [
  {
    id: "w1",
    name: "Minimalist Wool Coat",
    url: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "w2",
    name: "High-Waisted Tailored Pants",
    url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "w3",
    name: "Silk Button-Up Blouse",
    url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "w4",
    name: "Cashmere Turtleneck Sweater",
    url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=764&auto=format&fit=crop",
  },
  {
    id: "w5",
    name: "Pleated Midi Skirt",
    url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=764&auto=format&fit=crop",
  },
  {
    id: "w6",
    name: "Structured Blazer",
    url: "https://images.unsplash.com/photo-1608234807905-4466023792f5?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "w7",
    name: "Linen Maxi Dress",
    url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "w8",
    name: "Premium Denim Jeans",
    url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=687&auto=format&fit=crop",
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
