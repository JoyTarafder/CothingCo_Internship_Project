import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiBox, FiImage, FiPlus, FiX } from "react-icons/fi";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (productData: any) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAdd,
}: AddProductModalProps) {
  // State for form fields
  const [productTitle, setProductTitle] = useState("");
  const [materials, setMaterials] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [vendor, setVendor] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkQuantity, setBulkQuantity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!productTitle.trim()) {
      setError("Product title cannot be empty");
      return;
    }

    // Create product data object
    const productData = {
      title: productTitle,
      materials,
      brand,
      color,
      size,
      buyingPrice,
      vendor,
      retailPrice,
      discountedPrice,
      bulkPrice,
      bulkQuantity,
      quantity,
      description,
    };

    onAdd(productData);
    handleClose();
  };

  const handleClose = () => {
    // Reset all form fields
    setProductTitle("");
    setMaterials("");
    setBrand("");
    setColor("");
    setSize("");
    setBuyingPrice("");
    setVendor("");
    setRetailPrice("");
    setDiscountedPrice("");
    setBulkPrice("");
    setBulkQuantity("");
    setQuantity("");
    setDescription("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden border border-gray-100 dark:border-gray-700 my-8"
          >
            <div className="flex justify-between items-center p-5 border-b dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600">
              <h3 className="text-xl font-medium text-white flex items-center">
                <FiBox className="h-5 w-5 mr-2" />
                Add New Product
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="h-5 w-5" />
              </motion.button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 max-h-[80vh] overflow-y-auto"
            >
              {/* Product Title */}
              <div className="mb-6">
                <label
                  htmlFor="productTitle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Product Title
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  id="productTitle"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Eg: Pure Leather Bag"
                />
              </div>

              {/* Two columns layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Materials */}
                <div>
                  <label
                    htmlFor="materials"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Materials
                  </label>
                  <input
                    type="text"
                    id="materials"
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: Leather"
                  />
                </div>

                {/* Brand */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: Havit"
                  />
                </div>
              </div>

              {/* Color and Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Color */}
                <div>
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Color
                  </label>
                  <select
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Color</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Size
                  </label>
                  <select
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">X-Large</option>
                  </select>
                </div>
              </div>

              {/* Buying Price and Vendor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Buying Price */}
                <div>
                  <label
                    htmlFor="buyingPrice"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Buying Price (Sourcing)
                  </label>
                  <input
                    type="number"
                    id="buyingPrice"
                    value={buyingPrice}
                    onChange={(e) => setBuyingPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: 700"
                  />
                </div>

                {/* Vendor */}
                <div>
                  <label
                    htmlFor="vendor"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Buying From (Vendor)
                  </label>
                  <select
                    id="vendor"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Vendor</option>
                    <option value="vendor1">Vendor 1</option>
                    <option value="vendor2">Vendor 2</option>
                    <option value="vendor3">Vendor 3</option>
                  </select>
                </div>
              </div>

              {/* Retail Price and Discounted Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Retail Price */}
                <div>
                  <label
                    htmlFor="retailPrice"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Retail Price
                  </label>
                  <input
                    type="number"
                    id="retailPrice"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: 999"
                  />
                </div>

                {/* Discounted Price */}
                <div>
                  <label
                    htmlFor="discountedPrice"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Discounted price
                  </label>
                  <input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: 499"
                  />
                </div>
              </div>

              {/* Bulk Price and Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Bulk Price */}
                <div>
                  <label
                    htmlFor="bulkPrice"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Bulk Price
                  </label>
                  <input
                    type="number"
                    id="bulkPrice"
                    value={bulkPrice}
                    onChange={(e) => setBulkPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: 699"
                  />
                </div>

                {/* Bulk Quantity */}
                <div>
                  <label
                    htmlFor="bulkQuantity"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Bulk Quantity (pcs)
                  </label>
                  <input
                    type="number"
                    id="bulkQuantity"
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Eg: 20"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Eg: 15"
                />
              </div>

              {/* Image Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Images
                </label>
                <div className="grid grid-cols-5 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]">
                    <FiImage className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Primary Image
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]">
                    <FiImage className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Image 2
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]">
                    <FiImage className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Image 3
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]">
                    <FiImage className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Image 4
                    </p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-center min-h-[120px]">
                    <FiImage className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      Image 5
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Product Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Description"
                ></textarea>
              </div>

              {/* Error display */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Form actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors flex items-center"
                >
                  <FiPlus className="h-4 w-4 mr-1" />
                  Add Product
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
