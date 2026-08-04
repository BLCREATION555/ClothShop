import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getWishlist,
  addToWishlist as addWishlistApi,
  removeFromWishlist as removeWishlistApi,
} from "../services/wishlist.service";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.wishlist || [];

      setWishlistItems(data);
    } catch (err) {
      console.error(err);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await addWishlistApi(product.id);

      await fetchWishlist();

      toast.success("Added to wishlist");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to add to wishlist."
      );
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await removeWishlistApi(productId);

      setWishlistItems((prev) =>
        prev.filter((item) => {
          const id =
            item.product?.id || item.productId || item.id;

          return id !== productId;
        })
      );

      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to remove wishlist item."
      );
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}