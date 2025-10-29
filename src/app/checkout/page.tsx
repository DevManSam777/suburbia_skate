"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaCopy, FaCheck } from "react-icons/fa6";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useUser();
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const createOrder = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: items }),
      });

      const order = await response.json();
      return order.id;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    try {
      setIsLoading(true);
      console.log("Payment approved, capturing order...", data);
      
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const details = await response.json();
      console.log("Capture response:", details);

      if (details.status === "COMPLETED") {
        toast.success("Payment successful!");
        
        // Extract shipping address from PayPal response
        const shippingAddress = details.purchase_units?.[0]?.shipping?.address || null;
        const payerInfo = details.payer || null;
        
        // Generate order number and save order details
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const orderData = {
          orderNumber,
          items: items,
          total: totalPrice,
          paypalOrderId: data.orderID,
          timestamp: new Date().toISOString(),
          shippingAddress,
          payerInfo,
        };
        
        console.log("Saving order data:", orderData);

        // Store order in localStorage for immediate success page access
        localStorage.setItem("lastOrder", JSON.stringify(orderData));

        // Save order to database if user is logged in
        if (user) {
          try {
            const saveResponse = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            });

            if (saveResponse.ok) {
              console.log("Order saved to database successfully");
            } else {
              console.error("Failed to save order to database");
            }
          } catch (error) {
            console.error("Error saving order to database:", error);
            // Don't block the success flow if database save fails
          }
        }

        await clearCart();

        // Use window.location instead of router.push for more reliable navigation
        window.location.href = "/checkout/success";
      } else {
        console.error("Payment not completed:", details);
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error capturing order:", error);
      toast.error("An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
        <Bounded className="text-center">
          <Heading className="mb-6" as="h1">
            Configuration Error
          </Heading>
          <p className="text-xl">
            PayPal is not configured. Please add your PayPal credentials to the .env.local file.
          </p>
        </Bounded>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="min-h-screen bg-texture bg-brand-gray py-12">
        <Bounded>
          <Heading className="mb-8" as="h1">
            Checkout
          </Heading>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="font-bold text-xl mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.deck.texture}
                          alt={item.deck.name}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">Custom Skateboard</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${(totalPrice / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PayPal Payment */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="font-bold text-xl mb-4">Payment</h2>

                {/* Test Credentials Info Box */}
                {process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_EMAIL && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-sm text-blue-900 mb-2">
                      Test Credentials
                    </h3>
                    <div className="text-xs text-blue-800 space-y-2">
                      <p className="font-semibold">Use these sandbox credentials to test checkout:</p>
                      <div className="bg-white rounded p-2 font-mono text-[10px] space-y-2">
                        {/* Email */}
                        <div className="flex items-start justify-between gap-2">
                          <p className="break-all flex-1">
                            <span className="font-semibold">Email:</span> {process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_EMAIL}
                          </p>
                          <button
                            onClick={() => copyToClipboard(process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_EMAIL || "", "email")}
                            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy email"
                          >
                            {copiedField === "email" ? (
                              <FaCheck className="text-green-600" />
                            ) : (
                              <FaCopy className="text-gray-600" />
                            )}
                          </button>
                        </div>

                        {/* Password */}
                        <div className="flex items-start justify-between gap-2">
                          <p className="break-all flex-1">
                            <span className="font-semibold">Password:</span> {process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_PASSWORD}
                          </p>
                          <button
                            onClick={() => copyToClipboard(process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_PASSWORD || "", "password")}
                            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy password"
                          >
                            {copiedField === "password" ? (
                              <FaCheck className="text-green-600" />
                            ) : (
                              <FaCopy className="text-gray-600" />
                            )}
                          </button>
                        </div>

                        {/* Code */}
                        <div className="flex items-start justify-between gap-2">
                          <p className="break-all flex-1">
                            <span className="font-semibold">Code:</span> 111111
                          </p>
                          <button
                            onClick={() => copyToClipboard("111111", "code")}
                            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                            title="Copy code"
                          >
                            {copiedField === "code" ? (
                              <FaCheck className="text-green-600" />
                            ) : (
                              <FaCopy className="text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] italic">
                        If prompted for a confirmation code, enter: 111111
                      </p>
                    </div>
                  </div>
                )}

                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Processing payment...</p>
                  </div>
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("An error occurred with PayPal. Please try again.");
                    }}
                    style={{
                      layout: "vertical",
                      color: "gold",
                      shape: "rect",
                      label: "paypal",
                    }}
                  />
                )}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  This is a demo site using PayPal Sandbox. No real charges will be made.
                </p>
              </div>
            </div>
          </div>
        </Bounded>
      </div>
    </PayPalScriptProvider>
  );
}
