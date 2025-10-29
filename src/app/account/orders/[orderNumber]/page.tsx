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
      // Fetch order from database
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/${params.orderNumber}`);
          if (response.ok) {
            const data = await response.json();
            setOrder(data.order);
          } else {
            console.error("Failed to fetch order");
            router.push('/account');
          }
        } catch (error) {
          console.error("Error fetching order:", error);
          router.push('/account');
        }
      };

      fetchOrder();
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
              className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-purple transition-colors font-semibold"
            >
              <FaArrowLeft />
              <span>Back to Account</span>
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-2 md:gap-3 px-1 text-sm md:text-lg py-2 md:~py-2.5/3 from-brand-purple to-brand-lime text-white cursor-pointer"
            >
              <div className="flex size-5 md:size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
                <FaPrint />
              </div>
              <div className="w-px self-stretch bg-white/25" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Invoice Card */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 mb-6">
            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8 pb-6 border-b-2 border-gray-300">
              <div>
                <h1 className="text-3xl font-bold text-brand-purple mb-2">INVOICE</h1>
                <p className="text-sm text-gray-600">Suburbia Skate Co.</p>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-bold text-lg font-mono break-all">{order.orderNumber}</p>
                <p className="text-sm text-gray-600 mt-2 break-words">{orderDate}</p>
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
                    <p className="text-sm text-gray-600 break-all">{order.payerInfo.email_address}</p>
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
                <p className="text-xs text-gray-500 mt-1 break-all">Transaction ID: {order.paypalOrderId}</p>
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

              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.deck.texture}
                          alt={item.deck.name}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-2">Custom Skateboard</p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>Deck: {item.deck.name}</p>
                          <p>Wheels: {item.wheel.name}</p>
                          <p>Trucks: {item.truck.name}</p>
                          <p>Bolts: {item.bolt.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                      <span className="text-gray-600">Qty: {item.quantity}</span>
                      <span className="text-gray-600">${(item.price / 100).toFixed(2)} each</span>
                      <span className="font-semibold">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                    </div>
                  </div>
                ))}

                {/* Mobile Totals */}
                <div className="border-t-2 border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">SUBTOTAL:</span>
                    <span>${(order.total / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">SHIPPING:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t border-gray-300">
                    <span className="font-bold">TOTAL PAID:</span>
                    <span className="font-bold text-green-600">${(order.total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Table Layout */}
              <table className="w-full hidden md:table">
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
            <p className="mt-2">Questions? Contact us at support@suburbiaskate.com</p>
          </div>
        </div>
      </Bounded>
    </div>
  );
}
