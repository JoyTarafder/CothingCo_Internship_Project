"use client";

import Image from "next/image";
import React, { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = "/images/profile-avatar.jpg",
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  style,
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fallbackImages = [
    fallbackSrc,
    "/images/profile-avatar.jpg",
    "/images/placeholder.jpg", // Additional fallback
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==",
  ];

  const handleError = () => {
    setIsLoading(false);

    if (retryCount < fallbackImages.length - 1) {
      const nextFallback = fallbackImages[retryCount + 1];
      setImageSrc(nextFallback);
      setRetryCount(retryCount + 1);
      setImageError(false);
    } else {
      setImageError(true);
    }

    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    setImageError(false);
    onLoad?.();
  };

  // If src is an external URL from problematic domains and we're in development,
  // try to use a local fallback immediately
  const shouldUseLocalFallback = (url: string) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      const problematicDomains = ["images.unsplash.com"];
      return problematicDomains.some((domain) => url.includes(domain));
    }
    return false;
  };

  const finalSrc = shouldUseLocalFallback(imageSrc) ? fallbackSrc : imageSrc;

  const imageProps = {
    src: finalSrc,
    alt,
    className: `${className} transition-opacity duration-300 ${
      isLoading ? "opacity-0" : "opacity-100"
    } ${imageError ? "bg-gray-200 dark:bg-gray-700" : ""}`,
    onError: handleError,
    onLoad: handleLoad,
    quality,
    placeholder,
    blurDataURL,
    style,
    sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority,
    // Add unoptimized flag for problematic external images in development
    ...(shouldUseLocalFallback(src) && { unoptimized: true }),
  };

  if (fill) {
    return <Image {...imageProps} alt={alt} fill />;
  }

  if (width && height) {
    return <Image {...imageProps} alt={alt} width={width} height={height} />;
  }

  // Default fallback
  return <Image {...imageProps} alt={alt} width={400} height={400} />;
};

export default OptimizedImage;
