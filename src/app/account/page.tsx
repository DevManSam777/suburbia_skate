"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaUser, FaBox, FaPencil, FaArrowLeft } from "react-icons/fa6";

type CartItem = {
  id: string;
  deck: { name: string; texture: string };
  wheel: { name: string };
  truck: { name: string };
  bolt: { name: string };
  price: number;
  quantity: number;
};

type ShippingAddress = {
  address_line_1: string;
  address_line_2?: string;
  admin_area_1: string;
  admin_area_2: string;
  postal_code: string;
  country_code: string;
};

type PayerInfo = {
  name?: { given_name: string; surname: string };
  email_address?: string;
};

type OrderData = {
  orderNumber: string;
  items: CartItem[];
  total: number;
  paypalOrderId: string;
  timestamp: string;
  shippingAddress?: ShippingAddress;
  payerInfo?: PayerInfo;
};

export default function AccountPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch orders from database
      const fetchOrders = async () => {
        try {
          const response = await fetch("/api/orders");
          if (response.ok) {
            const data = await response.json();
            setOrders(data.orders || []);
          } else {
            console.error("Failed to fetch orders");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
        <Bounded className="text-center">
          <Heading className="mb-6" as="h1">
            Loading...
          </Heading>
        </Bounded>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12">
      <Bounded>
        <div className="max-w-5xl mx-auto">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-purple transition-colors mb-6"
          >
            <FaArrowLeft />
            <span className="font-semibold">Back to Home</span>
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 mb-6">
            <div className="flex items-center gap-4 md:gap-6 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-purple rounded-full flex items-center justify-center text-white text-xl md:text-2xl flex-shrink-0">
                <FaUser />
              </div>
              <div className="min-w-0 flex-1">
                <Heading className="mb-2 text-xl md:text-2xl lg:text-3xl" as="h1">
                  {user.fullName || user.username || "Welcome"}
                </Heading>
                <p className="text-gray-600 text-sm md:text-base break-all">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-gray rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Username</p>
                <p className="font-semibold">{user.username || "Not set"}</p>
                {!user.username && (
                  <p className="text-xs text-gray-500 mt-1">Click &quot;Edit Profile&quot; to set a username</p>
                )}
              </div>
              <div className="p-4 bg-brand-gray rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="font-semibold">
                  {new Date(user.createdAt!).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/account/profile"
                className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-2 md:gap-3 px-1 text-sm md:text-lg py-2 md:~py-2.5/3 from-brand-purple to-brand-lime text-white"
              >
                <div className="flex size-5 md:size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
                  <FaPencil />
                </div>
                <div className="w-px self-stretch bg-white/25" />
                <span className="truncate">Edit Profile & Username</span>
              </Link>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaBox className="text-brand-purple text-xl md:text-2xl" />
              <Heading className="text-xl md:text-2xl" as="h2">
                Order History
              </Heading>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No orders yet</p>
                <Link
                  href="/build"
                  className="button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-lg ~py-2.5/3 from-brand-orange to-brand-lime text-black"
                >
                  Build Your First Board
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <Link
                    key={index}
                    href={`/account/orders/${order.orderNumber}`}
                    className="block border-b last:border-b-0 pb-6 last:pb-0 hover:bg-gray-50 -mx-4 px-4 py-4 rounded transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-base md:text-lg font-mono break-all">{order.orderNumber}</p>
                        <p className="text-xs md:text-sm text-gray-600 break-words">
                          {new Date(order.timestamp).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="sm:text-right flex-shrink-0">
                        <p className="font-bold text-base md:text-lg text-green-600">
                          ${(order.total / 100).toFixed(2)}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">Paid via PayPal</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                          <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <Image
                              src={item.deck.texture}
                              alt={item.deck.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="font-semibold text-xs md:text-sm break-words">Custom Skateboard</p>
                            <p className="text-[10px] sm:text-xs text-gray-600 truncate">
                              {item.deck.name} • {item.wheel.name}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0 min-w-[55px] sm:min-w-[60px]">
                            <p className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap">× {item.quantity}</p>
                            <p className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">
                              ${((item.price * item.quantity) / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs md:text-sm text-brand-purple font-semibold">
                      Click to view invoice →
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Bounded>
    </div>
  );
}
