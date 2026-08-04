import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  getCart,
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
  updateCartQuantity as updateCartQuantityApi,
  clearCart as clearCartApi,
} from "../services/cart.service";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await getCart();

      const items =
        response?.data?.cartItems ||
        response?.data ||
        [];

      setCartItems(
        Array.isArray(items) ? items : []
      );
    } catch (err) {
      console.error(err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

const addToCart = async (
  productId,
  quantity = 1
) => {
  await addToCartApi(productId, quantity);
  await fetchCart();
  return true;
};
  const updateCartQuantity = async (
    productId,
    quantity
  ) => {
    try {
      await updateCartQuantityApi(
        productId,
        quantity
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (
    productId
  ) => {
    try {
      await removeFromCartApi(productId);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();
      setCartItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          (item.product.discountPrice ||
            item.product.price),
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        cartCount,
        cartTotal,
        fetchCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}