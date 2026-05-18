import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ADD
  const addToCart = (item) => {

    setCartItems((prev) => {

      const existing = prev.find(
        (p) =>
          p._id === item._id &&
          p.variant === item.variant
      );

      if (existing) {
        return prev.map((p) =>
          p._id === item._id &&
          p.variant === item.variant
            ? {
                ...p,
                qty: p.qty + item.qty,
              }
            : p
        );
      }

      return [...prev, item];
    });
  };

  // REMOVE
  const removeFromCart = (_id, variant) => {
    setCartItems((prev) =>
      prev.filter(
        (p) =>
          !(
            p._id === _id &&
            p.variant === variant
          )
      )
    );
  };

  // UPDATE
  const updateQty = (_id, variant, qty) => {

    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((p) =>
        p._id === _id &&
        p.variant === variant
          ? { ...p, qty }
          : p
      )
    );
  };

  // TOTAL COUNT
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.qty,
      0
    );
  }, [cartItems]);

  // TOTAL PRICE
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// CUSTOM HOOK
export const useCart = () => {

  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    );
  }

  return context;
};