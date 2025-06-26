"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WishlistPage() {
  const router = useRouter();
  const { openWishlistModal } = useWishlist();

  useEffect(() => {
    // Open the wishlist modal and redirect to the shop page
    openWishlistModal();
    router.push("/shop");
  }, [openWishlistModal, router]);

  // This page won't actually render anything as it immediately redirects
  return null;
}
