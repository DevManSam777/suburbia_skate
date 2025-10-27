"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaPrint, FaArrowLeft } from "react-icons/fa6";

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

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    if (user && params.orderNumber) {
      const userOrdersKey = `orders_${user.id}`;
      const storedOrders = localStorage.getItem(userOrdersKey);
      if (storedOrders) {
        const orders: OrderData[] = JSON.parse(storedOrders);
        const foundOrder = orders.find(o => o.orderNumber === params.orderNumber);
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          router.push('/account');
        }
      }
    }
  }, [user, params.orderNumber, router]);

  if (!order) {
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

  const orderDate = new Date(order.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12 pt-32">
      <Bounded>
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Print & Back Buttons - Hide on print */}
          <div className="flex justify-between items-center mb-6 print:hidden">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-brand-purple hover:underline font-semibold text-lg"
            >
              <FaArrowLeft />
              <span>Back to Account</span>
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-6 py-3 font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
            >
              <FaPrint />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Invoice Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-300">
              <div>
                <h1 className="text-3xl font-bold text-brand-purple mb-2">INVOICE</h1>
                <p className="text-sm text-gray-600">Suburbia Skate Co.</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-bold text-lg font-mono">{order.orderNumber}</p>
                <p className="text-sm text-gray-600 mt-2">{orderDate}</p>
              </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 pb-6 border-b">
              {order.payerInfo && (
                <div>
                  <h3 className="font-bold text-sm text-gray-600 mb-2">BILL TO</h3>
                  <p className="font-semibold">
                    {order.payerInfo.name?.given_name} {order.payerInfo.name?.surname}
                  </p>
                  {order.payerInfo.email_address && (
                    <p className="text-sm text-gray-600">{order.payerInfo.email_address}</p>
                  )}
                </div>
              )}
              {order.shippingAddress && (
                <div>
                  <h3 className="font-bold text-sm text-gray-600 mb-2">SHIP TO</h3>
                  <p className="text-sm">
                    {order.shippingAddress.address_line_1}<br />
                    {order.shippingAddress.address_line_2 && (
                      <>{order.shippingAddress.address_line_2}<br /></>
                    )}
                    {order.shippingAddress.admin_area_2}, {order.shippingAddress.admin_area_1} {order.shippingAddress.postal_code}<br />
                    {order.shippingAddress.country_code}
                  </p>
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm text-gray-600 mb-2">PAYMENT METHOD</h3>
                <p className="font-semibold">PayPal</p>
                <p className="text-xs text-gray-500 mt-1">Transaction ID: {order.paypalOrderId}</p>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-600 mb-2">PAYMENT STATUS</h3>
                <p className="font-semibold text-green-600">✓ PAID</p>
                <p className="text-sm text-gray-600 mt-1">
                  ${(order.total / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Items - Invoice Table */}
            <div>
              <h2 className="font-bold text-lg mb-4 text-gray-700">ITEMS</h2>
              <table className="w-full">
                <thead className="border-b-2 border-gray-300">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3">ITEM</th>
                    <th className="pb-3">DESCRIPTION</th>
                    <th className="pb-3 text-center">QTY</th>
                    <th className="pb-3 text-right">PRICE</th>
                    <th className="pb-3 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.deck.texture}
                              alt={item.deck.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <span className="font-semibold">Custom Skateboard</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-xs text-gray-600">
                          <p>Deck: {item.deck.name}</p>
                          <p>Wheels: {item.wheel.name}</p>
                          <p>Trucks: {item.truck.name}</p>
                          <p>Bolts: {item.bolt.name}</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">{item.quantity}</td>
                      <td className="py-4 text-right">${(item.price / 100).toFixed(2)}</td>
                      <td className="py-4 text-right font-semibold">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="pt-4 text-right font-semibold">SUBTOTAL:</td>
                    <td className="pt-4 text-right">${(order.total / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="pt-2 text-right font-semibold">SHIPPING:</td>
                    <td className="pt-2 text-right text-green-600">FREE</td>
                  </tr>
                  <tr className="text-lg">
                    <td colSpan={4} className="pt-4 text-right font-bold">TOTAL PAID:</td>
                    <td className="pt-4 text-right font-bold text-green-600">
                      ${(order.total / 100).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-600 print:hidden">
            <p>Thank you for your order!</p>
            <p className="mt-2">Questions? Contact us at support@suburbiaSkate.com</p>
          </div>
        </div>
      </Bounded>
    </div>
  );
}
