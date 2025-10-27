"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaUser, FaBox } from "react-icons/fa6";

type OrderData = {
  orderNumber: string;
  items: any[];
  total: number;
  paypalOrderId: string;
  timestamp: string;
  shippingAddress?: any;
  payerInfo?: any;
};

export default function AccountPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    if (user) {
      // Load orders for this user from localStorage
      const userOrdersKey = `orders_${user.id}`;
      const storedOrders = localStorage.getItem(userOrdersKey);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
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
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center text-white text-2xl">
                <FaUser />
              </div>
              <div>
                <Heading className="mb-2" as="h1">
                  {user.fullName || user.username || "Welcome"}
                </Heading>
                <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-brand-gray rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Username</p>
                <p className="font-semibold">{user.username || "Not set"}</p>
                {!user.username && (
                  <p className="text-xs text-gray-500 mt-1">Click "Edit Profile" to set a username</p>
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
                className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
              >
                Edit Profile & Username
              </Link>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaBox className="text-brand-purple text-2xl" />
              <Heading className="" as="h2">
                Order History
              </Heading>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No orders yet</p>
                <Link
                  href="/build"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
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
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-lg font-mono">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.timestamp).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">
                          ${(order.total / 100).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">Paid via PayPal</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-4 items-center">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.deck.texture}
                              alt={item.deck.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold text-sm">Custom Skateboard</p>
                            <p className="text-xs text-gray-600">
                              {item.deck.name} • {item.wheel.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">
                              ${((item.price * item.quantity) / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-brand-purple font-semibold">
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
