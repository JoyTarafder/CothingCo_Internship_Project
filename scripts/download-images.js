const https = require("https");
const fs = require("fs");
const path = require("path");

// Create the products directory if it doesn't exist
const productImagesDir = path.join(__dirname, "../public/images/products");
if (!fs.existsSync(productImagesDir)) {
  fs.mkdirSync(productImagesDir, { recursive: true });
}

// List of royalty-free image URLs for our products
const productImages = [
  {
    id: "1",
    name: "classic-cotton-tshirt",
    url: "https://burst.shopifycdn.com/photos/blue-t-shirt.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Men",
  },
  {
    id: "2",
    name: "womens-summer-dress",
    url: "https://burst.shopifycdn.com/photos/fashion-model-in-pink.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Women",
  },
  {
    id: "3",
    name: "kids-casual-joggers",
    url: "https://burst.shopifycdn.com/photos/man-on-stool-in-hoodie-and-sweatpants.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Kids",
  },
  {
    id: "4",
    name: "premium-hoodie",
    url: "https://burst.shopifycdn.com/photos/close-up-grey-marl-hoodie.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Men",
  },
  {
    id: "5",
    name: "slim-fit-jeans",
    url: "https://burst.shopifycdn.com/photos/a-pile-of-denim-jeans-in-different-shades-of-blue.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Men",
  },
  {
    id: "6",
    name: "floral-print-blouse",
    url: "https://burst.shopifycdn.com/photos/womens-fashion-on-hangers.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Women",
  },
  {
    id: "7",
    name: "kids-graphic-tshirt",
    url: "https://burst.shopifycdn.com/photos/colorful-t-shirts-on-clothing-rack-size-medium.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Kids",
  },
  {
    id: "8",
    name: "oversized-sweater",
    url: "https://burst.shopifycdn.com/photos/folded-clothes.jpg?width=1000&format=pjpg&exif=0&iptc=0",
    type: "Women",
  },
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(productImagesDir, filename);
    const file = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve(filePath);
        });
      })
      .on("error", (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        reject(err);
      });
  });
}

// Download all images
async function downloadAllImages() {
  console.log("Starting to download product images...");

  try {
    const promises = productImages.map((product) => {
      const filename = `${product.id}-${product.name}.jpg`;
      return downloadImage(product.url, filename);
    });

    await Promise.all(promises);
    console.log("All images downloaded successfully!");

    // Create a JSON file with image mappings
    const imageMappings = productImages.reduce((acc, product) => {
      acc[product.id] = `/images/products/${product.id}-${product.name}.jpg`;
      return acc;
    }, {});

    fs.writeFileSync(
      path.join(productImagesDir, "image-mappings.json"),
      JSON.stringify(imageMappings, null, 2)
    );
    console.log("Created image mappings JSON file");
  } catch (error) {
    console.error("Error downloading images:", error);
  }
}

// Run the download function
downloadAllImages();
