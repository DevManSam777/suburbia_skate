"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export type CartItem = {
  id: string;
  deck: { id: string; name: string; texture: string };
  wheel: { id: string; name: string; texture: string };
  truck: { id: string; name: string; color: string };
  bolt: { id: string; name: string; color: string };
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [hasSyncedCart, setHasSyncedCart] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Detect user changes and reset cart
  useEffect(() => {
    if (isLoaded) {
      const newUserId = user?.id || null;

      // If user changed (logged out, logged in, or switched users)
      if (currentUserId !== newUserId) {
        // Clear current cart state
        setItems([]);
        setHasSyncedCart(false);

        // Only clear localStorage when:
        // 1. Logging out (had user, now don't)
        // 2. Switching users (had user, now different user)
        // DON'T clear when logging in (going from null to user) - we need to merge!
        const isLoggingOut = currentUserId !== null && newUserId === null;
        const isSwitchingUsers = currentUserId !== null && newUserId !== null && currentUserId !== newUserId;

        if (isLoggingOut || isSwitchingUsers) {
          localStorage.removeItem("suburbia-cart");
        }

        setCurrentUserId(newUserId);
      }
    }
  }, [user?.id, isLoaded, currentUserId]);

  // Load cart from localStorage or database on mount or user change
  useEffect(() => {
    setIsClient(true);

    const loadCart = async () => {
      // If user is logged in, fetch from database
      if (isLoaded && user && !hasSyncedCart) {
        try {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const data = await response.json();
            const dbCart = data.cart.items || [];

            // Check for localStorage cart to merge (only for guest carts)
            const localCart = localStorage.getItem("suburbia-cart");
            if (localCart) {
              try {
                const localItems = JSON.parse(localCart);

                // Merge carts: combine items, summing quantities for duplicates
                const mergedCart = [...dbCart];
                localItems.forEach((localItem: CartItem) => {
                  const existingItem = mergedCart.find(item => item.id === localItem.id);
                  if (existingItem) {
                    existingItem.quantity += localItem.quantity;
                  } else {
                    mergedCart.push(localItem);
                  }
                });

                setItems(mergedCart);

                // Save merged cart to database immediately
                await fetch("/api/cart", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ items: mergedCart }),
                });

                // Clear localStorage after merge
                localStorage.removeItem("suburbia-cart");
              } catch (e) {
                console.error("Failed to merge localStorage cart", e);
                setItems(dbCart);
              }
            } else {
              setItems(dbCart);
            }

            setHasSyncedCart(true);
          }
        } catch (error) {
          console.error("Error fetching cart from database:", error);
          // Fallback to localStorage
          loadFromLocalStorage();
        }
      } else if (isLoaded && !user && !hasSyncedCart) {
        // Not logged in, use localStorage
        loadFromLocalStorage();
        setHasSyncedCart(true);
      }
    };

    const loadFromLocalStorage = () => {
      const savedCart = localStorage.getItem("suburbia-cart");
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    };

    loadCart();
  }, [isLoaded, user, hasSyncedCart]);

  // Save cart to localStorage OR database whenever it changes
  useEffect(() => {
    if (isClient && hasSyncedCart) {
      const actualUserId = user?.id || null;

      // Only save if we're not mid-transition (user state matches tracked state)
      if (actualUserId === currentUserId) {
        if (user) {
          // If logged in: ONLY save to database, NOT localStorage
          const saveToDatabase = async () => {
            try {
              await fetch("/api/cart", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ items }),
              });
            } catch (error) {
              console.error("Error saving cart to database:", error);
            }
          };

          saveToDatabase();
        } else {
          // If logged out: ONLY save to localStorage
          localStorage.setItem("suburbia-cart", JSON.stringify(items));
        }
      }
      // If user states don't match, we're mid-transition - don't save
    }
  }, [items, isClient, hasSyncedCart, user, currentUserId]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    const existingItem = items.find((item) => item.id === newItem.id);
    
    setItems((prevItems) => {
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...newItem, quantity: 1 }];
    });

    // Toast after state update to prevent duplicates
    if (existingItem) {
      toast.success("Updated quantity in cart");
    } else {
      toast.success("Added to cart!");
    }
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    setItems([]);

    if (user) {
      // Clear from database if logged in
      try {
        await fetch("/api/cart", {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error clearing cart from database:", error);
      }
    } else {
      // Clear from localStorage if logged out
      localStorage.removeItem("suburbia-cart");
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
